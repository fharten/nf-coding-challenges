import { notFound } from 'next/navigation';
import { deleteVolume, getVolumeBySlug } from '@/app/volumes-actions';

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
      <h1 className='text-2xl font-bold mb-6'>Delete {volume.title}?</h1>

      <form action={deleteVolume.bind(null, slug)}>
        <button
          type='submit'
          className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
        >
          Delete
        </button>
      </form>
    </section>
  );
}
