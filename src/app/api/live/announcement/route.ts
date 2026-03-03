// app/api/live/announcements/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const announcements = [
    {
      id: '1',
      message: 'Lunch will be served in the main hall at 12:30 PM.',
      time: '10:30 AM',
    },
    {
      id: '2',
      message: 'Workshop materials are now available for download.',
      time: '9:15 AM',
    },
    {
      id: '3',
      message: 'Evening networking event starts at 6 PM in the rooftop lounge.',
      time: '8:00 AM',
    },
  ];
  return NextResponse.json(announcements);
}