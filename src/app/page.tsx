'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date('2025-06-15T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-gray-200">
      {/* Subtle background texture */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />

      {/* Navbar */}
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

      <main className="relative mx-auto max-w-7xl px-4 py-12 md:py-20">
        {/* Hero */}
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
              Where the future
              <br />
              <span className="font-bold text-[#3B82F6]">unfolds.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400">
              Three days of deep technical talks, hands-on workshops, and
              connection with the brightest minds in web development.
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm md:justify-start">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#3B82F6]" />
                June 15–17, 2025
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#3B82F6]" />
                Austin, TX
              </span>
            </div>

            {/* Countdown */}
            <div className="mt-8 flex justify-center gap-3 md:justify-start">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="w-16 border-t border-[#3B82F6]/30 pt-2 text-center">
                  <div className="text-2xl font-light text-white">{value}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500">{unit}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                href="/sessions"
                className="rounded-md bg-[#3B82F6] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#2563EB] transition"
              >
                View Sessions
              </Link>
              <Link
                href="/speakers"
                className="rounded-md border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 hover:border-[#3B82F6] hover:text-white transition"
              >
                Meet Speakers
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1">
            <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-md md:h-80 md:max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Conference audience"
                className="h-full w-full object-cover brightness-90"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-md" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 flex justify-center gap-8 border-y border-gray-800 py-8 md:mt-24">
          {[
            { value: '20+', label: 'Sessions' },
            { value: '15', label: 'Speakers' },
            { value: '3', label: 'Days' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-light text-white">{stat.value}</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Speakers – subtle preview */}
        <div className="mt-20">
          <h2 className="text-center text-sm uppercase tracking-[0.2em] text-gray-500">Featured Speakers</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-gray-800">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i}`}
                    alt={`Speaker ${i}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-white">Alex Morgan</p>
                <p className="text-xs text-gray-500">Principal Engineer</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/speakers" className="text-sm text-[#3B82F6] hover:underline">
              View all speakers →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}