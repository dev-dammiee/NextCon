// app/live/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Fetch functions
async function getCurrentSession() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/live/current`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

async function getUpcomingSessions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/live/upcoming`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

async function getAnnouncements() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/live/announcements`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

// Components
async function CurrentSession() {
  const session = await getCurrentSession();

  if (!session) {
    return (
      <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
        <p className="text-gray-400">No live session at the moment. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] rounded-xl border-2 border-[#F59E0B] p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#F59E0B] opacity-5 blur-xl"></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{session.title}</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#F59E0B] text-white animate-pulse">
            LIVE NOW
          </span>
        </div>
        <div className="mt-4 space-y-2 text-gray-400">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-[#3B82F6]">{session.speaker}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{session.time}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{session.room}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

async function UpcomingSessions() {
  const sessions = await getUpcomingSessions();

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Upcoming Sessions</h3>
      <div className="space-y-4">
        {sessions.map((session: any) => (
          <Link
            key={session.id}
            href={`/sessions/${session.id}`}
            className="block group"
          >
            <div className="border-l-4 border-[#3B82F6] pl-4 py-2 hover:bg-gray-800/50 transition-colors">
              <p className="font-medium text-white group-hover:text-[#3B82F6] transition-colors">
                {session.title}
              </p>
              <p className="text-sm text-gray-400">{session.speaker} • {session.time} • {session.room}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

async function Announcements() {
  const announcements = await getAnnouncements();

  if (!announcements || announcements.length === 0) {
    return (
      <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Announcements</h3>
        <p className="text-gray-400">No announcements at this time.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Announcements</h3>
      <div className="space-y-4">
        {announcements.map((announcement: any) => (
          <div key={announcement.id} className="flex items-start">
            <div className="shrink-0 w-2 h-2 mt-2 rounded-full bg-[#F59E0B]"></div>
            <div className="ml-3">
              <p className="text-white">{announcement.message}</p>
              <p className="text-sm text-gray-400">{announcement.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeletons
function CurrentSessionSkeleton() {
  return (
    <div className="bg-[#111827] rounded-xl border-2 border-[#F59E0B]/30 p-6 animate-pulse h-64" />
  );
}

function UpcomingSessionsSkeleton() {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-3/4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded" />
      </div>
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
        <h1 className="text-4xl font-light tracking-tight text-white md:text-5xl mb-8">Live Dashboard</h1>

        <div className="grid grid-cols-1 gap-6">
          {/* Current session - full width at the top */}
          <div>
            <Suspense fallback={<CurrentSessionSkeleton />}>
              <CurrentSession />
            </Suspense>
          </div>

          {/* Two columns below: Upcoming and Announcements */}
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