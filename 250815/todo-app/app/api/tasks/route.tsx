import { pool } from '@/db/pg_pool';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const result = await pool.query<Task>(
    'SELECT * FROM tasks ORDER BY created_at DESC',
  );
  const tasks = result.rows;

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, ''],
    );

    const record = result.rows[0];

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
