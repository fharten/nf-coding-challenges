import { useEffect, useState, type CSSProperties } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { SyncLoader } from 'react-spinners';
import type {
  Conversation,
  DisplayMessage,
  StreamingMessage,
} from './types/Conversation';

function App() {
  const [chatHistory, setChatHistory] = useState<Conversation[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] =
    useState<StreamingMessage | null>(null);

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  const getChatHistory = async () => {
    const res = await fetch('http://localhost:4444/conversation');
    const data = await res.json();
    setChatHistory(data);
    setLoading(false);
    scroll.scrollToBottom();
  };

  const handleSubmit = async () => {
    if (!content.trim() || isStreaming) return;

    setLoading(true);
    setIsStreaming(true);

    const currentTime = new Date().toLocaleTimeString();
    const tempId = `temp_${Date.now()}`;

    // Initialize streaming message
    const initialStreamingMessage: StreamingMessage = {
      id: tempId,
      user_message: content,
      ai_message: '',
      user_time: currentTime,
      ai_time: currentTime,
      isStreaming: true,
    };

    setStreamingMessage(initialStreamingMessage);
    setContent('');
    setLoading(false);
    scroll.scrollToBottom();

    try {
      const response = await fetch('http://localhost:4444/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedText = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          // Update streaming message with new content
          setStreamingMessage((prev) =>
            prev
              ? {
                  ...prev,
                  ai_message: accumulatedText,
                  ai_time: new Date().toLocaleTimeString(),
                }
              : null,
          );
          window.scrollTo(0, document.body.scrollHeight);
        }

        // Mark streaming as complete
        setStreamingMessage((prev) =>
          prev
            ? {
                ...prev,
                isStreaming: false,
              }
            : null,
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.name : 'Unknown error';

      if (errorMessage === 'AbortError') {
        console.log('Streaming request was aborted');
      } else {
        console.error('Streaming error:', error);
        // Handle error by showing error message
        setStreamingMessage((prev) =>
          prev
            ? {
                ...prev,
                ai_message:
                  'Sorry, there was an error processing your request.',
                isStreaming: false,
              }
            : null,
        );
      }
    } finally {
      setIsStreaming(false);
      // Don't refresh chat history - the streaming message will be persisted on the backend
      // Just clear the streaming state after a delay
      setTimeout(() => {
        setStreamingMessage(null);
        getChatHistory();
        window.scrollTo(0, document.body.scrollHeight);
      }, 1000);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  // Combine chat history with streaming message for display
  const displayMessages: DisplayMessage[] = [...chatHistory];

  // Only show streaming message if it's not already in chat history
  if (
    streamingMessage &&
    !chatHistory.some(
      (msg) =>
        msg.user_message === streamingMessage.user_message &&
        msg.ai_message === streamingMessage.ai_message,
    )
  ) {
    displayMessages.push({
      user_id: parseInt(streamingMessage.id.replace('temp_', '')),
      ai_id: 0, // Temporary ID
      user_message: streamingMessage.user_message,
      ai_message: streamingMessage.ai_message,
      user_time: streamingMessage.user_time,
      ai_time: streamingMessage.ai_time,
      isStreaming: streamingMessage.isStreaming,
    });
  }

  return (
    <>
      <h1 className='font-bold text-2xl mt-10 text-center'>
        CHAT WITH CHATGPT - STREAMING
      </h1>

      <div className='my-10 max-w-4xl mx-auto'>
        {displayMessages.map((msg, index) => (
          <div
            key={msg.user_id || index}
            className='max-w-4xl mx-auto flex flex-col'
          >
            <div className='flex flex-col bg-teal-300 rounded-md border max-w-1/2 py-1 px-2 my-3'>
              <p>{msg.user_message}</p>
              <p className='font-light text-sm text-gray-500 self-end'>
                {msg.user_time}
              </p>
            </div>

            {msg.ai_message && (
              <div className='flex flex-col bg-indigo-300 rounded-md border max-w-1/2 py-1 px-2 self-end relative'>
                <div className='whitespace-pre-wrap'>
                  {msg.ai_message}
                  {/* Show cursor for streaming messages */}
                  {msg.isStreaming && (
                    <span className='inline-block w-2 h-5 bg-gray-600 ml-1 animate-pulse'></span>
                  )}
                </div>
                <p className='font-light text-sm text-gray-500 self-end'>
                  {msg.ai_time}
                  {msg.isStreaming && ' (streaming...)'}
                </p>
              </div>
            )}
          </div>
        ))}

        {loading && !isStreaming && (
          <div className='flex flex-col bg-teal-300 rounded-md border max-w-1/2 py-1 px-2 my-3'>
            <p>{content}</p>
            <p className='font-light text-sm text-gray-500 self-end'>now</p>
          </div>
        )}
      </div>

      <div className='my-20 flex flex-col max-w-2xl mx-auto'>
        {loading || isStreaming ? (
          <SyncLoader
            color={'#ec003f'}
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        ) : (
          <div className='flex flex-col'>
            <textarea
              name='chatinput'
              id='chatinput'
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={isStreaming}
              className='border rounded-md ring-0 focus:border-green-300 resize-none px-3'
              placeholder='Type your message...'
            />

            <div className='flex gap-2 mt-5 mb-20'>
              <button
                onClick={handleSubmit}
                className='bg-green-300 rounded-md py-1 px-3'
                type='button'
                disabled={!content.trim()}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
