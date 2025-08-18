'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateVolumePage() {
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
      const response = await fetch('http://localhost:3000/api/volumes', {
        method: 'POST',
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
      });

      if (response.ok) {
        // Redirect or show success message
        router.push('/volumes');
      } else {
        console.error('Failed to create volume');
      }
    } catch (error) {
      console.error('Error creating volume:', error);
    }
  };

  return (
    <section className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Create New Volume</h1>

      <form onSubmit={handleSubmit} className='space-y-4 flex flex-col'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='border border-white'
        />

        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className='border border-white'
        />

        <label htmlFor='cover'>Cover Image URL</label>
        <input
          type='text'
          id='cover'
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          className='border border-white'
        />

        <label htmlFor='color'>Color</label>
        <input
          type='text'
          id='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className='border border-white'
        />

        <label htmlFor='book-ordinal'>Book Ordinal</label>
        <input
          type='text'
          id='book-ordinal'
          value={bookOrdinal}
          onChange={(e) => setBookOrdinal(e.target.value)}
          className='border border-white'
        />
        <label htmlFor='book-title'>Book Title</label>
        <input
          type='text'
          id='book-title'
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          className='border border-white'
        />

        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          >
            Create Volume
          </button>
        </div>
      </form>
    </section>
  );
}
