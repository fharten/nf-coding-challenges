'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { volumes, introduction } from '../../data/data';

export default function VolumesPage() {
  const router = useRouter();

  const handleRandomVolume = () => {
    if (volumes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * volumes.length);
    const randomVolume = volumes[randomIndex];

    router?.push(`/volumes/${randomVolume.slug}`);
  };

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
        <button
          onClick={handleRandomVolume}
          className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
        >
          Visit Random Volume
        </button>
      </div>
    </div>
  );
}
