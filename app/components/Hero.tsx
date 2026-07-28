"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shirt, Star, Clock3 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background Glow */}
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-orange-600/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.06),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">
        {/* Left Side */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-orange-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            Drop 04 • Season 26/27
          </span>

          <h1 className="mt-8 text-5xl font-black uppercase leading-none md:text-7xl">
            Wear The
            <br />
            <span className="text-orange-600">Game.</span>
            <br />
            Not Just
            <br />A Shirt.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Discover authentic football jerseys, boots and training gear from
            the world's biggest clubs and national teams.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-full bg-orange-600 px-7 py-4 font-semibold transition hover:bg-orange-700"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t hidden md:block border-white/10 pt-8">
            <div>
              <Shirt className="mb-3 text-orange-500" />
              <h3 className="text-2xl font-bold">120+</h3>
              <p className="text-sm text-gray-400">
                Clubs & National Teams
              </p>
            </div>

            <div>
              <Clock3 className="mb-3 text-orange-500" />
              <h3 className="text-2xl font-bold">48 hrs</h3>
              <p className="text-sm text-gray-400">
                Custom Printing
              </p>
            </div>

            <div>
              <Star className="mb-3 fill-orange-500 text-orange-500" />
              <h3 className="text-2xl font-bold">4.9</h3>
              <p className="text-sm text-gray-400">
                Customer Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Badge */}
          <div className="absolute left-4 top-4 z-10 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg">
            New • Arsenal Home 26/27
          </div>

          {/* Product Card */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 to-orange-800 p-6 shadow-2xl">
            <Image
              src="/images/hero-image.webp"
              alt="Canada Home Jersey"
              width={600}
              height={700}
              priority
              className="h-[500px] w-full rounded-2xl object-cover"
            />

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-5 text-black">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Saka • #7
                </p>

                <h3 className="text-xl font-bold">
                  Arsenal Home 26/27 Kit
                </h3>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400 line-through">
                  KSh 12,500
                </p>

                <p className="text-2xl font-bold text-orange-600">
                  KSh 10,500
                </p>
              </div>
            </div>
          </div>

          {/* Floating Sticker */}
          <div className="absolute -bottom-6 -right-4 flex h-24 w-24 rotate-12 items-center justify-center rounded-full bg-white text-center text-xs font-black uppercase text-black shadow-xl">
            FREE
            <br />
            PRINT
            <br />
            THIS WEEK
          </div>
        </div>
      </div>
    </section>
  );
}