import { notFound } from 'next/navigation';
import Link from 'next/link';
import { speakers as allSpeakers, getInitials } from '@/app/lib/mock-data'; 
import { Twitter, Github, Linkedin } from 'lucide-react';

export async function generateStaticParams() {
  return allSpeakers.map((speaker) => ({ id: speaker.id }));
}

async function getSpeaker(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // If API_URL is missing, empty, or a relative path -> use mock data
  if (!apiUrl || apiUrl.startsWith('/')) {
    const speaker = allSpeakers.find((sp) => sp.id === id);
    if (!speaker) notFound();
    return speaker;
  }

  const res = await fetch(`${apiUrl}/api/speakers/${id}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error('Failed to fetch speaker');
  return res.json();
}

async function getSessionsBySpeaker(speakerId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // If API_URL is missing, empty, or a relative path -> use mock data
  if (!apiUrl || apiUrl.startsWith('/')) {
    const { sessions } = await import('@/app/lib/mock-data');
    return sessions.filter((s) => s.speakerId === speakerId);
  }

  const res = await fetch(`${apiUrl}/api/sessions`, {
    next: { revalidate: 60 },
  });
  const allSessions = await res.json();
  return allSessions.filter((s: any) => s.speakerId === speakerId);
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SpeakerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const speaker = await getSpeaker(id);
  const sessions = await getSessionsBySpeaker(speaker.id);

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
        <Link href="/speakers" className="inline-flex items-center text-sm text-[#3B82F6] hover:underline mb-8">
          ← Back to Speakers
        </Link>

        <div className="bg-[#111827] rounded-xl border border-gray-800 p-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {getInitials(speaker.name)}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{speaker.name}</h1>
              <p className="text-[#3B82F6] text-lg mt-1">{speaker.role}</p>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            {speaker.social?.twitter && (
              <a href={`https://twitter.com/${speaker.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3B82F6] transition">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {speaker.social?.github && (
              <a href={`https://github.com/${speaker.social.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3B82F6] transition">
                <Github className="w-5 h-5" />
              </a>
            )}
            {speaker.social?.linkedin && (
              <a href={`https://linkedin.com/in/${speaker.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3B82F6] transition">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 border-t border-gray-800 pt-6">
            <p className="text-lg leading-relaxed">{speaker.bio}</p>
          </div>

          {sessions.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Sessions</h2>
              <div className="space-y-4">
                {sessions.map((session: any) => (
                  <Link key={session.id} href={`/sessions/${session.id}`} className="block group">
                    <div className="border-l-4 border-[#3B82F6] pl-4 py-2 hover:bg-gray-800/50 transition-colors">
                      <p className="font-medium text-white group-hover:text-[#3B82F6] transition-colors">
                        {session.title}
                      </p>
                      <p className="text-sm text-gray-400">{session.time} • {session.room}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}