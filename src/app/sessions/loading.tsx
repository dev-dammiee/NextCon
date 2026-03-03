// app/sessions/loading.tsx
import Link from 'next/link';

export default function SessionsLoading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-gray-200">
      {/* Subtle background texture */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />

      {/* Navbar – matches homepage */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0A0F1E]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-light tracking-widest text-white">
            NEXT<span className="font-bold text-[#3B82F6]">CON</span>
          </Link>
          <div className="space-x-8 text-sm font-medium">
            <Link href="/sessions" className="text-white transition">
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

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-light tracking-tight text-white md:text-5xl mb-8">
          Sessions
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#111827] rounded-xl border border-gray-800 p-6 animate-pulse">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}