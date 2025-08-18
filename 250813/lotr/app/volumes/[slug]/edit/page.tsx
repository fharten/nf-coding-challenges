'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Volume } from '@/app/types/Volume';

export default function UpdateVolumePage({
  params,
}: {
  params: { slug: string };
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [bookOrdinal, setBookOrdinal] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [color, setColor] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/volumes/${params.slug}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            cover,
            books: [
              {
                ordinal: bookOrdinal,
                title: bookTitle,
              },
            ],
            color,
          }),
        },
      );

      if (response.ok) {
        router.push('/volumes');
      } else {
        console.error('Failed to update volume');
      }
    } catch (error) {
      console.error('Error updating volume:', error);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/volumes/${params.slug}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        router.push('/volumes');
      } else {
        console.error('Failed to delete volume');
      }
    } catch (error) {
      console.error('Error deleting volume:', error);
    }
  };

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/volumes');
        const volumes = await res.json();

        const volume = volumes.find((v: Volume) => v.slug === params.slug);

        if (volume) {
          setTitle(volume.title);
          setDescription(volume.description);
          setCover(volume.cover);
          setColor(volume.color);

          // Set book data if available
          if (volume.books && volume.books.length > 0) {
            setBookOrdinal(volume.books[0].ordinal);
            setBookTitle(volume.books[0].title);
          }
        }
      } catch (error) {
        console.error('Error fetching volume data:', error);
      }
    };

    fetchVolumeData();
  }, [params.slug]);

  return (
    <section className='max-w-2xl mx-auto p-4'>
      <div className='flex'>
        <h1 className='text-2xl font-bold mb-6 flex-1'>Edit Volume</h1>
        <button
          onClick={handleDelete}
          className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Delete Volume
        </button>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4 flex flex-col'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='cover'
            className='block text-sm font-medium text-gray-700'
          >
            Cover Image URL
          </label>
          <input
            type='text'
            id='cover'
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='color'
            className='block text-sm font-medium text-gray-700'
          >
            Color
          </label>
          <input
            type='text'
            id='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='book-ordinal'
            className='block text-sm font-medium text-gray-700'
          >
            Book Ordinal
          </label>
          <input
            type='text'
            id='book-ordinal'
            value={bookOrdinal}
            onChange={(e) => setBookOrdinal(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='book-title'
            className='block text-sm font-medium text-gray-700'
          >
            Book Title
          </label>
          <input
            type='text'
            id='book-title'
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          >
            Update Volume
          </button>
        </div>
      </form>
    </section>
  );
}
