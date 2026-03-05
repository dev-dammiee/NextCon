import Link from 'next/link';
import { getInitials } from '@/app/lib/mock-data'; // helper only

async function getSpeakers() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // If API_URL is missing, empty, or a relative path -> use mock data
  if (!apiUrl || apiUrl.startsWith('/')) {
    const { speakers } = await import('@/app/lib/mock-data');
    return speakers;
  }

  const res = await fetch(`${apiUrl}/api/speakers`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch speakers');
  return res.json();
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

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
            <Link href="/speakers" className="text-white transition">Speakers</Link>
            <Link href="/live" className="text-gray-300 hover:text-white transition">Live</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-light tracking-tight text-white md:text-5xl mb-8">Speakers</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker: any) => (
            <Link key={speaker.id} href={`/speakers/${speaker.id}`} className="group block">
              <div className="bg-[#111827] rounded-xl border  border-gray-800 p-6 shadow-sm hover:shadow-lg hover:border-[#3B82F6]/50 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="flex-0 w-12 h-12 bg-[#3B82F6] rounded-full p-6 flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(speaker.name)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-[#3B82F6] transition-colors">
                      {speaker.name}
                    </h2>
                    <p className="text-[#3B82F6] text-sm font-medium">{speaker.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-400 line-clamp-2">{speaker.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3B82F6]/10 text-[#3B82F6]">
                    {speaker.sessions.length} session{ speaker.sessions.length !== 1 ? 's' : '' }
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}