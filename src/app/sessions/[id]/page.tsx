import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sessions as allSessions } from '@/app/lib/mock-data'; // only for generateStaticParams

export async function generateStaticParams() {
  return allSessions.map((session) => ({ id: session.id }));
}

async function getSession(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/sessions/${id}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
}

async function getSpeaker(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/speakers/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getSession(id);
  const speaker = session.speakerId ? await getSpeaker(session.speakerId) : null;

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
            <Link href="/live" className="text-gray-300 hover:text-white transition">Live</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/sessions" className="inline-flex items-center text-sm text-[#3B82F6] hover:underline mb-8">
          ← Back to Sessions
        </Link>

        <article className="bg-[#111827] rounded-xl border border-gray-800 p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{session.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 border-b border-gray-800 pb-6 mb-6">
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

          <div className="prose prose-invert max-w-none text-gray-300">
            <p className="text-lg leading-relaxed">{session.description}</p>
          </div>

          {speaker && (
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Speaker</h2>
              <Link href={`/speakers/${speaker.id}`} className="group block">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {speaker.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white group-hover:text-[#3B82F6] transition-colors">
                      {speaker.name}
                    </p>
                    <p className="text-[#3B82F6]">{speaker.role}</p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Room Location</h2>
            <div className="bg-gray-800/50 rounded-lg p-8 text-center text-gray-400 border border-gray-700">
              <p>🗺️ Interactive map for {session.room} would appear here.</p>
              <p className="text-sm mt-2">(Integration with a mapping service like Google Maps)</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}