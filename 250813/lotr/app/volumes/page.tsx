import Link from 'next/link';
import { volumes, introduction } from '@/data/data';

export default function VolumesPage() {
  const randomIndex = Math.floor(Math.random() * volumes.length);

  return (
    <div className='flex flex-col max-w-4xl mx-auto gap-y-10 items-center justify-center mt-40'>
      <h1 className='font-bold text-2xl'>Lord of the Rings</h1>
      <p>{introduction}</p>
      <h2 className='text-xl'>All Volumes</h2>
      <ul className='flex flex-col gap-5'>
        {volumes.map((volume) => (
          <li key={volume.slug} className='text-blue-500 hover:underline'>
            <Link href={`/volumes/${volume.slug}`}>{volume.title}</Link>
          </li>
        ))}
      </ul>
      <div className='text-center mt-20'>
        <Link
          href={`/volumes/${volumes[randomIndex].slug}`}
          className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
        >
          Visit Random Volume
        </Link>
      </div>
    </div>
  );
}
