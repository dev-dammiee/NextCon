// app/api/live/current/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  const now = new Date();
  const hour = now.getHours();

 
  let session = null;
  if (hour >= 10 && hour < 11) {
    session = {
      id: '1',
      title: 'Building Modern Web Apps with Next.js',
      speaker: 'Jane Doe',
      time: '10:00 AM - 11:00 AM',
      room: 'Room A',
      isLive: true,
    };
  } else if (hour >= 11 && hour < 12) {
    session = {
      id: '2',
      title: 'Tailwind CSS Tips & Tricks',
      speaker: 'John Smith',
      time: '11:00 AM - 12:00 PM',
      room: 'Room B',
      isLive: true,
    };
  }

  return NextResponse.json(session);
}