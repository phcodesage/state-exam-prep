import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateStudent, deleteStudent, getStudentById } from '@/lib/models';
import { verifySessionToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('session')?.value;
    if (!token || !verifySessionToken(token).valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const student = await request.json();
    const success = await updateStudent(params.id, student);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('session')?.value;
    if (!token || !verifySessionToken(token).valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const success = await deleteStudent(params.id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}
