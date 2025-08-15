import { pool } from '@/db/pg_pool';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await pool.query<Task>(
    'SELECT * FROM tasks WHERE completed = true ORDER BY created_at DESC',
  );
  const tasks = result.rows;

  return NextResponse.json(tasks);
}
