import { NextResponse } from 'next/server';
import { volumes } from '@/app/lib/data';
import { Volume } from '@/app/types/Volume';

export async function GET(
  request: Request,
  context: { params: { slug: string } },
) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter missing' },
      { status: 400 },
    );
  }

  const volume = volumes.find((volume) => volume.slug === slug);

  if (!volume) {
    return NextResponse.json({ error: 'Volume not found' }, { status: 404 });
  }

  return NextResponse.json(volume);
}

export async function DELETE(
  request: Request,
  context: { params: { slug: string } },
) {
  const { slug } = await context.params;
  const indexToDelete = volumes.findIndex((volume) => volume.slug === slug);
  if (indexToDelete === -1) {
    return NextResponse.json({ error: 'Volume not found' }, { status: 404 });
  }
  volumes.splice(indexToDelete, 1);
  return NextResponse.json({ success: true });
}

export async function PUT(
  req: { json: () => PromiseLike<Volume> },
  context: { params: { slug: string } },
) {
  const { title, description, cover, books, color } = await req.json();
  const { slug } = await context.params;
  const indexToUpdate = volumes.findIndex((volume) => volume.slug === slug);
  if (indexToUpdate === -1) {
    return NextResponse.json({ error: 'Volume not found' }, { status: 404 });
  }
  volumes[indexToUpdate].title = title || volumes[indexToUpdate].title;
  volumes[indexToUpdate].description =
    description || volumes[indexToUpdate].description;
  volumes[indexToUpdate].cover = cover || volumes[indexToUpdate].cover;
  volumes[indexToUpdate].books = books || volumes[indexToUpdate].books;
  volumes[indexToUpdate].color = color || volumes[indexToUpdate].color;
  return NextResponse.json({ success: true });
}
