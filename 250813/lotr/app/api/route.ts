import { NextResponse } from 'next/server';
import { volumes } from '@/app/lib/data';

export async function GET() {
  return NextResponse.json(volumes);
}
