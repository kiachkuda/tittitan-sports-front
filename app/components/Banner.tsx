
        import Image from "next/image";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function Banner() {
  return (
    <section className="mx-auto mt-16 max-w-8xl px-4 lg:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-red-600 text-white">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_45%)]" />

        <div className="relative grid items-center gap-12 px-8 py-12 lg:grid-cols-2 lg:px-14 lg:py-16">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <Sparkles size={14} />
              Limited Drop • Friday 6PM
            </span>

            <h1 className="mt-6 text-5xl font-black uppercase leading-none lg:text-7xl">
              Build Your
              <br />
              Own Kit
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/90">
              Design your dream jersey in minutes. Choose your team,
              personalize the name and number, and receive a premium-quality
              kit delivered to your doorstep.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black">
                Start Designing
                <ArrowRight size={18} />
              </button>

              <button className="flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:bg-white hover:text-black">
                <Play size={18} />
                Watch Video
              </button>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
              <span>12,483 jerseys customized this month</span>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative flex h-[420px] items-center justify-center">
            {/* Left Card */}
            <div className="absolute left-6 top-4 rotate-[-8deg] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/chelsea-away-kit.avif"
                alt="Football Jersey"
                width={260}
                height={340}
                className="h-[320px] w-[230px] object-cover"
              />
            </div>

            {/* Right Card */}
            <div className="absolute right-4 top-12 rotate-[8deg] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/arsenal-kit.jpg"
                alt="Custom Kit"
                width={260}
                height={340}
                className="h-[340px] w-[240px] object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-4 rounded-2xl bg-black/90 px-6 py-4 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold">
                🔥 <span className="text-red-500">12,483</span> Kits Built This
                Month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
  