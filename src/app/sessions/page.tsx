import Link from 'next/link';
import { sessions as allSessions } from '@/app/lib/mock-data';

async function getSessions() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // If API_URL is missing, empty, or a relative path -> use mock data
  if (!apiUrl || apiUrl.startsWith('/')) {
    return allSessions;
  }

  const res = await fetch(`${apiUrl}/api/sessions`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
}

export default async function SessionsPage() {
  const sessions = await getSessions();

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-gray-200">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0A0F1E]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-light tracking-widest text-white">
            NEXT<span className="font-bold text-[#3B82F6]">CON</span>
          </Link>
          <div className="space-x-8 text-sm font-medium">
            <Link href="/sessions" className="text-white transition">Sessions</Link>
            <Link href="/speakers" className="text-gray-300 hover:text-white transition">Speakers</Link>
            <Link href="/live" className="text-gray-300 hover:text-white transition">Live</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-light tracking-tight text-white md:text-5xl mb-8">Sessions</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session: any) => (
            <Link key={session.id} href={`/sessions/${session.id}`} className="group block">
              <div className="bg-[#111827] rounded-xl border border-gray-800 p-6 shadow-sm hover:shadow-lg hover:border-[#3B82F6]/50 transition-all">
                <h2 className="text-xl font-semibold text-white group-hover:text-[#3B82F6] transition-colors">
                  {session.title}
                </h2>
                <div className="mt-3 space-y-2 text-gray-400">
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
                  <div className="flex items-center text-[#3B82F6] font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{session.speaker}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}