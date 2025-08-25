import express from 'express';
import cors from 'cors';
import db from './db';
import OpenAI from 'openai';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('Hello Worldi!');
});

app.post('/chat', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content required' });

    // STORE MSG
    const insertUser = db.prepare(
      'INSERT INTO user_messages (content) VALUES (?)',
    );
    const userInfo = insertUser.run(content);

    // OPENAI API CALL
    const response = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages: [{ role: 'user', content }],
    });

    const aiMessage = response.choices[0].message.content;

    // STORE RESPONSE
    const insertAI = db.prepare(
      'INSERT INTO ai_messages (user_message_id, content) VALUES (?, ?)',
    );
    const aiInfo = insertAI.run(userInfo.lastInsertRowid, aiMessage);

    // RETURN RESPONSE
    res.json({
      user: { id: userInfo.lastInsertRowid, content },
      ai: { id: aiInfo.lastInsertRowid, content: aiMessage },
    });
  } catch (error) {
    console.error('Error handling chat:', error);
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
  console.log(`Example app listening on port ${port}`);
});
