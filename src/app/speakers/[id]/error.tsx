// app/speakers/[id]/error.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function SpeakerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8">
            We couldn't load this speaker's profile. Please try again.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={reset}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-md hover:bg-[#2563EB] transition"
            >
              Try again
            </button>
            <Link
              href="/speakers"
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:border-[#3B82F6] hover:text-white transition"
            >
              Back to Speakers
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}