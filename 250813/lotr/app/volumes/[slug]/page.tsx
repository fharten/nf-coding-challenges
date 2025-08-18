import Image from 'next/image';
import { Book, Volume } from '@/app/types/Volume';
import Link from 'next/link';

export default async function VolumePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch('http://localhost:3000/api/volumes');
  const volumes = await res.json();

  const volume = volumes.find((v: Volume) => v.slug === slug);
  const volumeIndex = volumes.findIndex((v: Volume) => v.slug === slug);
  const prevVolume = volumes[volumeIndex - 1];
  const nextVolume = volumes[volumeIndex + 1];

  return (
    <div className='max-w-4xl mx-auto p-4 mt-20'>
      <Link
        href='/volumes'
        className='px-4 py-2 bg-white text-black rounded hover:bg-gray-200'
      >
        back
      </Link>
      {volume ? (
        <div className='text-center mt-20'>
          <h1 className='text-xl font-bold'>{volume.title}</h1>
          <div className='flex justify-center mb-10'>
            <Image
              src={volume.cover}
              alt={volume.title}
              width={300}
              height={300}
            />
          </div>
          <Link
            href={`/volumes/${volume.slug}/edit`}
            className='px-4 py-2 bg-white text-black rounded hover:bg-gray-200'
          >
            Edit
          </Link>
          <p className='text-left mt-5'>{volume.description}</p>
          <h2 className='font-bold text-xl'>Books:</h2>
          {volume.books.map((book: Book) => (
            <div key={book.ordinal}>
              <p>{book.ordinal}</p>
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Volume not found</p>
      )}
      <div className='flex'>
        <div className='flex justify-start w-full items-center'>
          {prevVolume && (
            <Link
              href={`/volumes/${prevVolume.slug}`}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Previous Volume
            </Link>
          )}
        </div>
        <div className='flex justify-end w-full items-center'>
          {nextVolume && (
            <Link
              href={`/volumes/${nextVolume.slug}`}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Next Volume
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
