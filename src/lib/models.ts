import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface Student {
  _id?: ObjectId;
  name: string;
  grade: string;
  subject: 'ELA' | 'Math' | 'Both';
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  date: string;
  email?: string;
  phone?: string;
  parentName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Schedule {
  _id?: ObjectId;
  grade: string;
  subject: 'ELA' | 'Math';
  weeks: number;
  status: string;
  startDate?: string;
  endDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Pricing {
  _id?: ObjectId;
  name: string;
  subject: 'ELA' | 'Math' | 'Both';
  price: number;
  features: string[];
  isPopular?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function getStudents(): Promise<Student[]> {
  const db = await getDatabase();
  const students = await db.collection<Student>('students').find({}).sort({ date: -1 }).toArray();
  return students;
}

export async function getStudentById(id: string): Promise<Student | null> {
  const db = await getDatabase();
  return await db.collection<Student>('students').findOne({ _id: new ObjectId(id) });
}

export async function createStudent(student: Omit<Student, '_id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
  const db = await getDatabase();
  const result = await db.collection<Student>('students').insertOne({
    ...student,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { ...student, _id: result.insertedId };
}

export async function updateStudent(id: string, student: Partial<Student>): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.collection<Student>('students').updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...student, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
}

export async function deleteStudent(id: string): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.collection<Student>('students').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function getSchedule(): Promise<Schedule[]> {
  const db = await getDatabase();
  return await db.collection<Schedule>('schedule').find({}).toArray();
}

export async function updateSchedule(id: string, schedule: Partial<Schedule>): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.collection<Schedule>('schedule').updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...schedule, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
}

export async function getPricing(): Promise<Pricing[]> {
  const db = await getDatabase();
  return await db.collection<Pricing>('pricing').find({}).toArray();
}

export async function updatePricing(id: string, pricing: Partial<Pricing>): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.collection<Pricing>('pricing').updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...pricing, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
}

export async function seedDatabase() {
  const db = await getDatabase();
  
  const existingStudents = await db.collection('students').countDocuments();
  if (existingStudents === 0) {
    const students: Student[] = [
      { name: 'Emma Johnson', grade: '5', subject: 'Both', amount: 700, status: 'confirmed', date: '2026-03-15' },
      { name: 'Liam Smith', grade: '4', subject: 'Math', amount: 429, status: 'confirmed', date: '2026-03-14' },
      { name: 'Olivia Brown', grade: '7', subject: 'ELA', amount: 329, status: 'pending', date: '2026-03-14' },
      { name: 'Noah Davis', grade: '6', subject: 'Both', amount: 700, status: 'confirmed', date: '2026-03-13' },
      { name: 'Ava Wilson', grade: '3', subject: 'Math', amount: 429, status: 'confirmed', date: '2026-03-12' },
      { name: 'Ethan Martinez', grade: '8', subject: 'Both', amount: 700, status: 'cancelled', date: '2026-03-11' },
    ];
    await db.collection('students').insertMany(students);
  }

  const existingSchedule = await db.collection('schedule').countDocuments();
  if (existingSchedule === 0) {
    const schedule: Schedule[] = [
      { grade: '3-4', subject: 'ELA', weeks: 6, status: 'TBD 2027' },
      { grade: '3-4', subject: 'Math', weeks: 8, status: 'TBD 2027' },
      { grade: '5-6', subject: 'ELA', weeks: 6, status: 'TBD 2027' },
      { grade: '5-6', subject: 'Math', weeks: 8, status: 'TBD 2027' },
      { grade: '7-8', subject: 'ELA', weeks: 6, status: 'TBD 2027' },
      { grade: '7-8', subject: 'Math', weeks: 8, status: 'TBD 2027' },
    ];
    await db.collection('schedule').insertMany(schedule);
  }

  const existingPricing = await db.collection('pricing').countDocuments();
  if (existingPricing === 0) {
    const pricing: Pricing[] = [
      { name: 'ELA Only', subject: 'ELA', price: 329, features: ['Weekly ELA sessions', 'Practice materials', 'Progress tracking'] },
      { name: 'Math Only', subject: 'Math', price: 429, features: ['Weekly Math sessions', 'Practice problems', 'Progress tracking'] },
      { name: 'Both Subjects', subject: 'Both', price: 700, features: ['All ELA & Math sessions', 'Complete materials', 'Priority support'], isPopular: true },
    ];
    await db.collection('pricing').insertMany(pricing);
  }
}
