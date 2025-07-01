'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>();
  const [error, setError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

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

  interface APIError {
    message: string;
  }

  const url = 'https://jsonplaceholder.typicode.com/posts';
  // const wrongUrl = 'http://jsonplaceholderWRONG.typicode.com/posts';

  // const getPosts = async (): Promise<void> => {
  //   const res = await fetch(url);

  //   if (!res.ok) throw new Error('failed to get posts.');

  //   const data: Post[] = await res.json();
  //   setPosts(data);
  // };

  // const getPostsWrong = async (): Promise<Post[] | APIError> => {
  //   try {
  //     const res = await fetch(wrongUrl);
  //     if (!res.ok) {
  //       return { message: 'Network error' };
  //     }
  //     const data: Post[] = await res.json();
  //     return data;
  //   } catch (error) {
  //     setError((error as Error).message);
  //     return { message: (error as Error).message };
  //   }
  // };

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

  useEffect(() => {
    //getPosts()
    // getPostsWrong();
  }, []);

  //
  return (
    <div>
      {error && <p id='errorMsg'>{error}</p>}

      <div>
        <form>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title...'
          />
          <input
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='body...'
          />
          <button type='button' onClick={newPost}>
            add post
          </button>
        </form>
      </div>

      {post && (
        <div>
          <p>{post.id}</p>
        </div>
      )}

      {posts.map((post, i) => (
        <div key={i}>
          <ul id='postList'>{post.title}</ul>
        </div>
      ))}
    </div>
  );
}
