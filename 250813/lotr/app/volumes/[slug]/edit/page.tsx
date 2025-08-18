import { notFound } from 'next/navigation';
import { getVolumeBySlug, updateVolume } from '@/app/volumes-actions';

export default async function UpdateVolumePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const volume = await getVolumeBySlug(slug);

  if (!volume) {
    notFound();
  }

  return (
    <section className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Edit Volume</h1>

      <form
        action={updateVolume.bind(null, slug)}
        className='space-y-4 flex flex-col'
      >
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
            name='title'
            defaultValue={volume.title}
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
            name='description'
            defaultValue={volume.description}
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
            name='cover'
            defaultValue={volume.cover}
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
            name='color'
            defaultValue={volume.color}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='bookOrdinal'
            className='block text-sm font-medium text-gray-700'
          >
            Book Ordinal
          </label>
          <input
            type='text'
            id='bookOrdinal'
            name='bookOrdinal'
            defaultValue={
              volume.books && volume.books.length > 0
                ? volume.books[0].ordinal
                : ''
            }
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='bookTitle'
            className='block text-sm font-medium text-gray-700'
          >
            Book Title
          </label>
          <input
            type='text'
            id='bookTitle'
            name='bookTitle'
            defaultValue={
              volume.books && volume.books.length > 0
                ? volume.books[0].title
                : ''
            }
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
