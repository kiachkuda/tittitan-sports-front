"use client";

import Link from "next/link";
import {
  Flag,
  Shirt,
  CircleDot,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "National Teams",
    description: "Represent your nation",
    href: "/shop?category=national-teams",
    icon: Flag,
  },
  {
    name: "Jerseys",
    description: "Official football jerseys",
    href: "/shop?category=jerseys",
    icon: Shirt,
  },
  {
    name: "Football Accessories",
    description: "Gear up for the game",
    href: "/shop?category=accessories",
    icon: CircleDot,
  },
  {
    name: "Tracksuits",
    description: "Train in style",
    href: "/shop?category=tracksuits",
    icon: Shirt,
  },
];

export default function CategoryCards() {
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-500">
              Shop by category
            </p>

            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Find Your Gear
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Everything you need to represent your game.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden items-center gap-1 text-sm font-bold text-slate-900 transition hover:text-orange-500 sm:flex"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:bg-orange-50 hover:shadow-lg sm:p-6"
              >
                {/* Background decoration */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/5 transition-transform duration-500 group-hover:scale-150" />

                {/* Icon */}
                <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={24} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="relative">
                  <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {category.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="relative mt-5 flex items-center gap-1 text-xs font-bold text-orange-500">
                  Shop now
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <Link
          href="/shop"
          className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-bold text-slate-900 transition hover:border-orange-500 hover:text-orange-500 sm:hidden"
        >
          View all products
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}