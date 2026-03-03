// app/sessions/[id]/loading.tsx
import Link from 'next/link';

export default function SessionLoading() {
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

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-4 bg-gray-700 rounded w-24 mb-8 animate-pulse"></div>

        <div className="bg-[#111827] rounded-xl border border-gray-800 p-8 animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="flex gap-6 pb-6 mb-6 border-b border-gray-800">
            <div className="h-4 bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/5"></div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-700 rounded-full"></div>
              <div>
                <div className="h-5 bg-gray-700 rounded w-40 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}