import { pool } from '@/db/pg_pool';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

  return NextResponse.json({ message: 'Success!' });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { title } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const taskResult = await pool.query<Task>(
    'SELECT * FROM tasks WHERE id = $1',
    [id],
  );
  const task = taskResult.rows[0];

  if (!task) {
    return NextResponse.json({ status: 'Task not found' }, { status: 404 });
  }

  await pool.query('UPDATE tasks SET title = $1 WHERE id = $2', [title, id]);

  return NextResponse.json({
    status: `Task ${id} was successfully edited!`,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const taskResult = await pool.query<Task>(
    'SELECT * FROM tasks WHERE id = $1',
    [id],
  );
  const task = taskResult.rows[0];

  if (!task) {
    return NextResponse.json({ status: 'Task not found' }, { status: 404 });
  }

  await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2', [
    !task.completed,
    id,
  ]);

  const updatedTaskResult = await pool.query<Task>(
    'SELECT * FROM tasks WHERE id = $1',
    [id],
  );
  const updatedTask = updatedTaskResult.rows[0];

  return NextResponse.json(updatedTask);
}
