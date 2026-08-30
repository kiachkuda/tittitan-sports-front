
"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Trophy,
  Zap,
} from "lucide-react";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Decorative lines */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.03]" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.03]" />
      </div>

      {/* Sports pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute left-[10%] top-[20%] text-[180px] font-black">
          T
        </div>

        <div className="absolute bottom-[10%] right-[8%] text-[220px] font-black">
          S
        </div>
      </div>

      {/* Main content */}
      <section className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">

        {/* Animated emblem */}
        <div className="relative mb-8">

          {/* Outer ring */}
          <div className="absolute inset-[-14px] rounded-full border border-orange-500/20" />

          <div className="absolute inset-[-7px] animate-ping rounded-full border border-orange-500/20" />

          {/* Logo */}
          <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl shadow-orange-500/20">

            <Trophy
              className="h-11 w-11 text-white"
              strokeWidth={2}
            />

          </div>
        </div>

        {/* Brand */}
        <div className="mb-3">
          <h1 className="text-4xl font-black tracking-tight">
            TITAN
            <span className="text-orange-500">
              SPORT
            </span>
          </h1>
        </div>

        <p className="mb-10 text-sm font-medium tracking-[0.25em] text-white/40">
          PLAY • COMPETE • CONQUER
        </p>

        {/* Loading animation */}
        <div className="w-full max-w-xs">

          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-white/50">
              <Activity className="h-3.5 w-3.5 text-orange-500" />
              Loading
            </span>

            <span className="font-semibold text-orange-500">
              {progress}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 transition-all duration-75"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Bottom message */}
        <div className="mt-8 flex items-center gap-2 text-xs text-white/30">
          <Zap className="h-3.5 w-3.5 text-orange-500" />

          <span>
            Getting everything ready for you...
          </span>
        </div>

      </section>

      {/* Bottom branding */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/20">
          TitanSport Kenya
        </p>
      </div>

    </main>
  );
}

