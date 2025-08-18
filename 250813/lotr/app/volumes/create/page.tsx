import { createVolume } from '@/app/volumes-actions';

export default function CreateVolumePage() {
  return (
    <section className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Create New Volume</h1>

      <form action={createVolume} className='space-y-4 flex flex-col'>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          placeholder='title'
          className='border border-white'
        />

        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          placeholder='description'
          className='border border-white'
        />

        <label htmlFor='cover'>Cover Image URL</label>
        <input
          name='cover'
          placeholder='cover'
          className='border border-white'
        />

        <label htmlFor='color'>Color</label>
        <input
          name='color'
          placeholder='color'
          className='border border-white'
        />

        <label htmlFor='book-ordinal'>Book Ordinal</label>
        <input
          name='bookOrdinal'
          placeholder='Book Ordinal'
          className='border border-white'
        />
        <label htmlFor='book-title'>Book Title</label>
        <input
          name='bookTitle'
          placeholder='Book Title'
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
