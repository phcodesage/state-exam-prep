import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPricing, updatePricing, seedDatabase } from '@/lib/models';
import { verifySessionToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const token = cookies().get('session')?.value;
    if (!token || !verifySessionToken(token).valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await seedDatabase();
    const pricing = await getPricing();
    return NextResponse.json(pricing);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const token = cookies().get('session')?.value;
    if (!token || !verifySessionToken(token).valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id, ...data } = await request.json();
    const success = await updatePricing(id, data);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Pricing not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing' }, { status: 500 });
  }
}
