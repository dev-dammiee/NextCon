// app/api/live/upcoming/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const sessions = [
    {
      id: '3',
      title: 'State Management in 2025',
      speaker: 'Alice Johnson',
      time: '1:00 PM - 2:00 PM',
      room: 'Room A',
    },
    {
      id: '4',
      title: 'Performance Optimization Strategies',
      speaker: 'Bob Brown',
      time: '2:15 PM - 3:15 PM',
      room: 'Room C',
    },
    {
      id: '5',
      title: 'Accessibility First',
      speaker: 'Carol White',
      time: '3:30 PM - 4:30 PM',
      room: 'Room B',
    },
  ];
  return NextResponse.json(sessions);
}