// app/speakers/[id]/not-found.tsx
import Link from 'next/link';

export default function SpeakerNotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-gray-200">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0A0F1E]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-light tracking-widest text-white">
            NEXT<span className="font-bold text-[#3B82F6]">CON</span>
          </Link>
          <div className="space-x-8 text-sm font-medium">
            <Link href="/sessions" className="text-gray-300 hover:text-white transition">
              Sessions
            </Link>
            <Link href="/speakers" className="text-gray-300 hover:text-white transition">
              Speakers
            </Link>
            <Link href="/live" className="text-gray-300 hover:text-white transition">
              Live
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-12 text-center">
        <div className="bg-[#111827] rounded-xl border border-gray-800 p-12">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-white mb-4">Speaker Not Found</h1>
          <p className="text-gray-400 mb-8">
            The speaker you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            href="/speakers"
            className="inline-block px-4 py-2 bg-[#3B82F6] text-white rounded-md hover:bg-[#2563EB] transition"
          >
            View all speakers
          </Link>
        </div>
      </main>
    </div>
  );
}