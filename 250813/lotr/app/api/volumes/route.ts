import { NextResponse } from 'next/server';
import slug from 'slug';
import { volumes } from '@/app/lib/data';
import { Volume } from '../../types/Volume';

export async function GET() {
  return NextResponse.json(volumes);
}

export async function POST(req: Request) {
  const { title, description, cover, books, color } = await req.json();
  const newVolume: Volume = {
    slug: slug(title),
    title,
    description,
    cover,
    books,
    color,
  };
  volumes.push(newVolume);
  return NextResponse.json(volumes);
}
