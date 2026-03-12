// app/live/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// --- Data functions (inline — avoids self-fetching issues in server components) ---

function getCurrentSession() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 10 && hour < 11) {
    return { id: '1', title: 'Building Modern Web Apps with Next.js', speaker: 'Jane Doe', time: '10:00 AM – 11:00 AM', room: 'Room A', isLive: true };
  } else if (hour >= 11 && hour < 12) {
    return { id: '2', title: 'Tailwind CSS Tips & Tricks', speaker: 'John Smith', time: '11:00 AM – 12:00 PM', room: 'Room B', isLive: true };
  }
  return null;
}

function getUpcomingSessions() {
  return [
    { id: '3', title: 'State Management in 2025',          speaker: 'Alice Johnson', time: '1:00 PM – 2:00 PM',  room: 'Room A' },
    { id: '4', title: 'Performance Optimization Strategies', speaker: 'Bob Brown',     time: '2:15 PM – 3:15 PM',  room: 'Room C' },
    { id: '5', title: 'Accessibility First',                speaker: 'Carol White',   time: '3:30 PM – 4:30 PM',  room: 'Room B' },
  ];
}

function getAnnouncements() {
  return [
    { id: '1', message: 'Lunch will be served in the main hall at 12:30 PM.', time: '10:30 AM' },
    { id: '2', message: 'Workshop materials are now available for download.',  time: '9:15 AM'  },
    { id: '3', message: 'Evening networking event starts at 6 PM in the rooftop lounge.', time: '8:00 AM' },
  ];
}

// Helpers
function formatEventDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

// Components
function CurrentSession() {
  const session = getCurrentSession();
  const today = formatEventDate(new Date());

  if (!session) {
    return (
      <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <CalendarIcon />
          <span>{today}</span>
        </div>
        <p className="text-gray-400">No live session at the moment. Check the upcoming schedule below.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] rounded-xl border-2 border-[#F59E0B] p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F59E0B] opacity-5 blur-xl pointer-events-none" />
      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-white leading-tight">{session.title}</h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B] text-black shrink-0 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
            LIVE NOW
          </span>
        </div>

        {/* Date + time + location row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <CalendarIcon />
            <span>{today}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon />
            <span className="font-semibold text-white">{session.time}</span>
          </div>
          <div className="flex items-center">
            <UserIcon />
            <span className="font-medium text-[#3B82F6]">{session.speaker}</span>
          </div>
          <div className="flex items-center">
            <PinIcon />
            <span>{session.room}</span>
          </div>
        </div>

        {/* Progress bar — decorative */}
        <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-2/5 bg-[#F59E0B] rounded-full animate-pulse" />
        </div>
        <p className="text-xs text-gray-500 mt-1">Session in progress</p>
      </div>
    </div>
  );
}

function UpcomingSessions() {
  const sessions = getUpcomingSessions();
  const today = formatEventDate(new Date());

  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-2">Upcoming Sessions</h3>
        <p className="text-gray-400 text-sm">No upcoming sessions scheduled.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Upcoming Sessions</h3>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <CalendarIcon />
          {today}
        </span>
      </div>

      <div className="space-y-3">
        {sessions.map((session: any, index: number) => (
          <Link key={session.id} href={`/sessions/${session.id}`} className="block group">
            <div className="flex gap-3 items-stretch border border-gray-700 rounded-lg p-3 hover:border-[#3B82F6]/60 hover:bg-gray-800/40 transition-all">
              {/* Index bubble */}
              <div className="shrink-0 w-7 h-7 rounded-full bg-[#1E3A5F] text-[#3B82F6] text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-white group-hover:text-[#3B82F6] transition-colors truncate">
                  {session.title}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <ClockIcon />
                    {session.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserIcon />
                    {session.speaker}
                  </span>
                  <span className="flex items-center gap-1">
                    <PinIcon />
                    {session.room}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="shrink-0 self-center text-gray-600 group-hover:text-[#3B82F6] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-800">
        <Link href="/sessions" className="text-sm text-[#3B82F6] hover:text-[#3B82F6]/80 transition-colors flex items-center gap-1">
          View full schedule →
        </Link>
      </div>
    </div>
  );
}

function Announcements() {
  const announcements = getAnnouncements();

  if (!announcements || announcements.length === 0) {
    return (
      <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Announcements</h3>
        <p className="text-gray-400 text-sm">No announcements at this time.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Announcements</h3>
      <div className="space-y-4">
        {announcements.map((announcement: any) => (
          <div key={announcement.id} className="flex items-start gap-3">
            <div className="shrink-0 w-2 h-2 mt-2 rounded-full bg-[#F59E0B]" />
            <div>
              <p className="text-white text-sm">{announcement.message}</p>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                <ClockIcon />
                {announcement.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeletons
function CurrentSessionSkeleton() {
  return <div className="bg-[#111827] rounded-xl border-2 border-[#F59E0B]/30 p-6 animate-pulse h-48" />;
}

function UpcomingSessionsSkeleton() {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-3/4" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-700/50 rounded-lg" />
      ))}
    </div>
  );
}

function AnnouncementsSkeleton() {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-2/4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default function LivePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-gray-200">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />

      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0A0F1E]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-light tracking-widest text-white">
            NEXT<span className="font-bold text-[#3B82F6]">CON</span>
          </Link>
          <div className="space-x-8 text-sm font-medium">
            <Link href="/sessions" className="text-gray-300 hover:text-white transition">Sessions</Link>
            <Link href="/speakers" className="text-gray-300 hover:text-white transition">Speakers</Link>
            <Link href="/live" className="text-white transition">Live</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-light tracking-tight text-white md:text-5xl mb-2">Live Dashboard</h1>
        <p className="text-gray-500 text-sm mb-8">{formatEventDate(new Date())}</p>

        <div className="grid grid-cols-1 gap-6">
          {/* Current session — full width */}
          <Suspense fallback={<CurrentSessionSkeleton />}>
            <CurrentSession />
          </Suspense>

          {/* Two-col: Upcoming + Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<UpcomingSessionsSkeleton />}>
              <UpcomingSessions />
            </Suspense>
            <Suspense fallback={<AnnouncementsSkeleton />}>
              <Announcements />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}