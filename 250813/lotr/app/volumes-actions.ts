'use server';

import slug from 'slug';
import { volumes } from './lib/data';
import { redirect } from 'next/navigation';

export async function getVolumes() {
  return volumes;
}

export async function getVolumeBySlug(slug: string) {
  return volumes.find((volume) => volume.slug === slug);
}

export async function createVolume(formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const cover = formData.get('cover');
  const bookOrdinal = formData.get('bookOrdinal');
  const bookTitle = formData.get('bookTitle');
  const color = formData.get('color');

  if (
    !title ||
    !description ||
    !cover ||
    !bookOrdinal ||
    !bookTitle ||
    !color ||
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof cover !== 'string' ||
    typeof bookOrdinal !== 'string' ||
    typeof bookTitle !== 'string' ||
    typeof color !== 'string'
  ) {
    throw new Error('All fields are required');
  }

  const books = [
    {
      ordinal: bookOrdinal,
      title: bookTitle,
    },
  ];

  volumes.push({
    slug: slug(title),
    title,
    description,
    cover,
    books,
    color,
  });
  redirect(`/volumes/${slug(title)}`);
}

export async function updateVolume(slug: string, formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const cover = formData.get('cover');
  const bookOrdinal = formData.get('bookOrdinal');
  const bookTitle = formData.get('bookTitle');
  const color = formData.get('color');

  if (
    !title ||
    !description ||
    !cover ||
    !bookOrdinal ||
    !bookTitle ||
    !color ||
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof cover !== 'string' ||
    typeof bookOrdinal !== 'string' ||
    typeof bookTitle !== 'string' ||
    typeof color !== 'string'
  ) {
    throw new Error('All fields are required');
  }

  const books = [
    {
      ordinal: bookOrdinal,
      title: bookTitle,
    },
  ];

  const volume = volumes.find((volume) => volume.slug === slug);
  if (volume) {
    volume.title = title;
    volume.description = description;
    volume.cover = cover;
    volume.books = books;
    volume.color = color;
  }
  redirect(`/volumes/${slug}`);
}

export async function deleteVolume(slug: string) {
  const index = volumes.findIndex((volume) => volume.slug === slug);

  if (index > -1) volumes.splice(index, 1);
  redirect('/volumes');
}
