// app/api/speakers/route.ts
import { NextResponse } from 'next/server';
import { speakers } from '@/app/lib/mock-data';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return NextResponse.json(speakers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch speakers' },
      { status: 500 }
    );
  }
}