import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getStudents, createStudent, seedDatabase } from '@/lib/models';
import { verifySessionToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const token = cookies().get('session')?.value;
    if (!token || !verifySessionToken(token).valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await seedDatabase();
    const students = await getStudents();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = cookies().get('session')?.value;
    if (!token || !verifySessionToken(token).valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const student = await request.json();
    const newStudent = await createStudent(student);
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}
