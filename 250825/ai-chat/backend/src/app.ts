import express from 'express';
import cors from 'cors';
import db from './db';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnablePassthrough } from '@langchain/core/runnables';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize LangChain components
const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-5-nano',
  temperature: 1,
});

// Create a simple chat prompt template
const chatPrompt = ChatPromptTemplate.fromTemplate(
  "You are a helpful AI assistant. Respond to the user's message: {input}",
);

// Basic chat chain
const chatChain = RunnableSequence.from([
  chatPrompt,
  llm,
  new StringOutputParser(),
]);

app.get('/', (req, res) => {
  res.send('LangChain Chat API is running!');
});

// Basic chat endpoint using LangChain
app.post('/chat', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content required' });

    // Store user message
    const insertUser = db.prepare(
      'INSERT INTO user_messages (content) VALUES (?)',
    );
    const userInfo = insertUser.run(content);

    let aiMessage: string;

    // Use basic chain
    aiMessage = await chatChain.invoke({
      input: content,
    });

    // Store AI response
    const insertAI = db.prepare(
      'INSERT INTO ai_messages (user_message_id, content) VALUES (?, ?)',
    );
    const aiInfo = insertAI.run(userInfo.lastInsertRowid, aiMessage);

    // Return response
    res.json({
      user: { id: userInfo.lastInsertRowid, content },
      ai: { id: aiInfo.lastInsertRowid, content: aiMessage },
    });
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Streaming chat endpoint
app.post('/chat/stream', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content required' });

    // Set up SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    // Store user message
    const insertUser = db.prepare(
      'INSERT INTO user_messages (content) VALUES (?)',
    );
    const userInfo = insertUser.run(content);

    let fullResponse = '';

    // Stream the response
    const stream = await chatChain.stream({
      input: content,
    });

    for await (const chunk of stream) {
      fullResponse += chunk;
      res.write(chunk);
    }

    // Store complete AI response
    const insertAI = db.prepare(
      'INSERT INTO ai_messages (user_message_id, content) VALUES (?, ?)',
    );
    insertAI.run(userInfo.lastInsertRowid, fullResponse);

    res.end();
  } catch (error) {
    console.error('Error handling streaming chat:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/conversation', (req, res) => {
  const stmt = db.prepare(`
    SELECT u.id as user_id, u.content as user_message, u.created_at as user_time,
           a.id as ai_id, a.content as ai_message, a.created_at as ai_time
    FROM user_messages u
    LEFT JOIN ai_messages a ON u.id = a.user_message_id
    ORDER BY u.created_at ASC
  `);

  const messages = stmt.all();
  res.json(messages);
});

app.listen(port, () => {
  console.log(`LangChain Chat API listening on port ${port}`);
});
