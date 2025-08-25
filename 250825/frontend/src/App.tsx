import { useEffect, useState, type CSSProperties } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { SyncLoader } from 'react-spinners';
import type { Conversation } from './types/Message';

function App() {
  const [chatHistory, setChatHistory] = useState<Conversation[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    scroll.scrollToBottom();

    await fetch('http://localhost:4444/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    getChatHistory();
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <>
      <h1 className='font-bold text-2xl mt-10 text-center'>
        CHAT WITH CHATGPT
      </h1>
      <div className='my-10 max-w-4xl mx-auto '>
        {chatHistory.map((msg) => (
          <div key={msg.user_id} className='max-w-4xl mx-auto flex flex-col'>
            <div className='flex flex-col bg-teal-300 rounded-md border max-w-1/2 py-1 px-2 my-3'>
              <p>{msg.user_message}</p>
              <p className='font-light text-sm text-gray-500 self-end'>
                {msg.user_time}
              </p>
            </div>
            <div className='flex flex-col bg-indigo-300 rounded-md border max-w-1/2 py-1 px-2 self-end'>
              <p>{msg.ai_message}</p>
              <p className='font-light text-sm text-gray-500 self-end'>
                {msg.ai_time}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className='flex flex-col bg-teal-300 rounded-md border max-w-1/2 py-1 px-2 my-3'>
            <p>{content}</p>
            <p className='font-light text-sm text-gray-500 self-end'>now</p>
          </div>
        )}
      </div>
      <div className='my-20 flex flex-col max-w-2xl mx-auto'>
        {!loading ? (
          <form action={handleSubmit} className='flex flex-col'>
            <textarea
              name='chatinput'
              id='chatinput'
              rows={4}
              content={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className='border rounded-md ring-0 focus:border-green-300 resize-none px-3'
            />
            <button
              className='self-end bg-green-300 rounded-md py-1 px-3 mt-5 mb-20'
              type='submit'
            >
              send
            </button>
          </form>
        ) : (
          <SyncLoader
            color={'#ec003f'}
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        )}
      </div>
    </>
  );
}

export default App;
