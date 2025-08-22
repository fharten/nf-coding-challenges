'use client';
import { useState, useEffect, useRef } from 'react';

interface ChatData {
  username?: string;
  room?: string;
  date?: string;
  message: string;
  system?: boolean;
}

const rooms = ['awd', 'handball', 'politics'];

const WebSocketDemo: React.FC = () => {
  const [username, setUsername] = useState('');
  const [confirmedUsername, setConfirmedUsername] = useState('');
  const [currentRoom, setCurrentRoom] = useState(rooms[0]);
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!confirmedUsername) return;

    const socket = new WebSocket('ws://localhost:3002/ws');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Connected');
      socket.send(
        JSON.stringify({
          type: 'join',
          room: currentRoom,
          username: confirmedUsername,
        }),
      );
    };

    socket.onmessage = (event) => {
      try {
        const data: ChatData = JSON.parse(event.data);
        setChatData((prev) => [...prev, data]);
      } catch {}
    };

    return () => {
      socket.close();
    };
  }, [confirmedUsername, currentRoom]);

  const sendMessage = () => {
    if (socketRef.current && inputValue.trim() !== '') {
      socketRef.current.send(
        JSON.stringify({
          type: 'message',
          message: inputValue,
        }),
      );
      setInputValue('');
    }
  };

  const setFinalUsername = () => {
    if (username.trim() === '') return;
    setConfirmedUsername(username.trim());
  };

  if (!confirmedUsername) {
    return (
      <div className='flex flex-col max-w-md mx-auto justify-center gap-y-5 mt-20'>
        <h2 className='text-center font-bold text-2xl'>Enter your username</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setFinalUsername();
            }
          }}
          className='border px-2 py-1 rounded-sm'
          placeholder='Your username'
        />
        <button
          onClick={setFinalUsername}
          className='border rounded-sm px-2 bg-black text-white dark:bg-white dark:text-black'
        >
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col max-w-xl mx-auto justify-center gap-y-5 mt-20'>
      <h1 className='text-center font-bold text-2xl'>3-Room Chat</h1>

      <div>
        <label>Room: </label>
        <select
          value={currentRoom}
          onChange={(e) => {
            setCurrentRoom(e.target.value);
            setChatData([]);
          }}
        >
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type='text'
          placeholder='Type a message'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
          autoFocus
          className='border mr-3 px-2 rounded-sm'
        />
        <button
          onClick={sendMessage}
          className='border rounded-sm px-2 bg-black text-white dark:bg-white dark:text-black'
        >
          Send
        </button>
      </div>

      <ul>
        {chatData.map((data, i) => (
          <li
            key={i}
            className={
              data.system
                ? 'text-gray-500'
                : data.username === 'system'
                ? 'text-fuchsia-700 dark:text-fuchsia-400'
                : data.username === confirmedUsername
                ? 'text-lime-700 dark:text-lime-400'
                : ''
            }
          >
            {data.username ? (
              <div className='flex gap-x-2'>
                <p>{data.date}</p>
                <span className='font-bold mr-2'>[{data.username}]</span>
              </div>
            ) : (
              ''
            )}
            {data.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketDemo;
