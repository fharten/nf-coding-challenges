import { Post, Posts } from './types/Post';
import Link from 'next/link';
import fetchAllPosts from './fetchAllPosts';

export default async function Home() {
  const posts: Posts = await fetchAllPosts();

  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1>Posts</h1>
        <ul>
          {posts.map((p: Post) => (
            <div key={p.id}>
              <Link href={`/posts/${p.id}`} className='flex flex-col'>
                {p.title}
              </Link>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
