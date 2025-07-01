'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>();
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  interface NewPost {
    userId: number;
    title: string;
    body: string;
  }

  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  interface NewUser {
    name: string;
    username: string;
    email: string;
  }

  interface APIError {
    message: string;
  }

  const url = 'https://jsonplaceholder.typicode.com/posts';
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';

  const getPosts = async (): Promise<void> => {
    const res = await fetch(url);

    if (!res.ok) throw new Error('failed to get posts.');

    const data: Post[] = await res.json();
    setPosts(data);
  };

  const getUsers = async (): Promise<void> => {
    const res = await axios.get(urlUsers);

    const data: User[] = await res.data;
    setUsers(data);
  };

  const newPost = async (): Promise<number | APIError> => {
    const post: NewPost = {
      userId: 1,
      title,
      body,
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!res.ok) {
        return { message: 'Network error' };
      }
      const data: Post = await res.json();
      setPost(data);
      return data.id;
    } catch (error) {
      setError((error as Error).message);
      return { message: (error as Error).message };
    }
  };

  const newUser = async (): Promise<User | APIError> => {
    const user: NewUser = {
      name,
      username,
      email,
    };

    try {
      const res = await axios.post<User>(urlUsers, user);
      setUser(res.data);
      return res.data;
    } catch (error) {
      setError((error as Error).message);
      return { message: (error as Error).message };
    }
  };

  useEffect(() => {
    getUsers();
    getPosts();
    // getPostsWrong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  return (
    <div className='flex flex-col w-3xl mt-24 mx-auto'>
      {error && <p id='errorMsg'>{error}</p>}

      <div>
        <h1 className='text-center font-bold text-2xl'>Add new post</h1>
        <form className='flex gap-x-2'>
          <input
            className='border rounded-sm px-2'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title...'
          />
          <input
            className='border rounded-sm px-2'
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='body...'
          />
          <button
            className={`px-4 border rounded-sm bg-gray-100 text-gray-900 hover:cursor-pointer hover:invert`}
            type='button'
            onClick={newPost}
          >
            add post
          </button>
        </form>
      </div>

      <div className='my-18'>
        <h1 className='text-center font-bold text-2xl'>Add new user</h1>
        <form className='flex gap-x-2'>
          <input
            className='border rounded-sm px-2'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username...'
          />
          <input
            className='border rounded-sm px-2'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name...'
          />
          <input
            className='border rounded-sm px-2'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email...'
          />
          <button
            className={`px-4 border rounded-sm bg-gray-100 text-gray-900 hover:cursor-pointer hover:invert`}
            type='button'
            onClick={newUser}
          >
            add user
          </button>
        </form>
      </div>
      <div className='flex'>
        <div className='flex-1'>
          {post && (
            <div className='mb-12'>
              <h2 className='font-bold text-xl'>New post</h2>
              <p>{post.id}</p>
            </div>
          )}
        </div>
        <div>
          {user && (
            <div className='mb-12'>
              <h2 className='font-bold text-xl min-w-48'>New User</h2>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          )}
        </div>
      </div>
      <div className='flex'>
        <div className='flex-1'>
          <h2 className='font-bold text-xl'>Post titles</h2>
          {posts.map((post, i) => (
            <div key={i}>
              <ul id='postList'>{post.title}</ul>
            </div>
          ))}
        </div>
        <div>
          <h2 className='font-bold text-xl min-w-48'>Usernames</h2>
          {users.map((user, i) => (
            <div key={i}>
              <ul id='userList'>{user.name}</ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
