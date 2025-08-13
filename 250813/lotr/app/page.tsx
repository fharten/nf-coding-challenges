import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col justify-center max-w-4xl mx-auto p-4 mt-20 text-center'>
      <main className='flex flex-col gap-y-10'>
        <h1>Welcome to the LORT App</h1>
        <Link href={`/volumes`} className='text-blue-500 hover:underline'>
          Show all volumes
        </Link>
      </main>
    </div>
  );
}
