// app/speakers/error.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function SpeakersError({
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
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      <nav className="bg-[#1E3A8A] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            NextCon
          </Link>
          <div className="space-x-6">
            <Link href="/sessions" className="transition-colors hover:text-[#14B8A6]">
              Sessions
            </Link>
            <Link href="/speakers" className="text-[#14B8A6] font-semibold">
              Speakers
            </Link>
            <Link href="/live" className="transition-colors hover:text-[#14B8A6]">
              Live
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load speakers</h2>
          <p className="text-[#6B7280] mb-6">We couldn't load the speakers list. Please try again.</p>
          <button
            onClick={reset}
            className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E3A8A]/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </main>
    </div>
  );
}