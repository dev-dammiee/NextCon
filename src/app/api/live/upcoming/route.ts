// app/api/live/upcoming/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Get today's date in a readable format to pair with each session time
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const sessions = [
    {
      id: '3',
      title: 'State Management in 2025',
      speaker: 'Alice Johnson',
      date: today,
      time: '1:00 PM – 2:00 PM',
      room: 'Room A',
    },
    {
      id: '4',
      title: 'Performance Optimization Strategies',
      speaker: 'Bob Brown',
      date: today,
      time: '2:15 PM – 3:15 PM',
      room: 'Room C',
    },
    {
      id: '5',
      title: 'Accessibility First',
      speaker: 'Carol White',
      date: today,
      time: '3:30 PM – 4:30 PM',
      room: 'Room B',
    },
  ];

  return NextResponse.json(sessions);
}