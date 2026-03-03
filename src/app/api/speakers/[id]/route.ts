// app/api/speakers/[id]/route.ts
import { NextResponse } from 'next/server';
import { speakers } from '@/app/lib/mock-data';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const speaker = speakers.find((s) => s.id === id);

    if (!speaker) {
      return NextResponse.json(
        { error: 'Speaker not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(speaker);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch speaker' },
      { status: 500 }
    );
  }
}