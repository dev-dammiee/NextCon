// app/api/sessions/route.ts
import { NextResponse } from 'next/server';
import { sessions } from '@/app/lib/mock-data';

export async function GET() {
  try {
    // Simulate a slight delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 100));
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}