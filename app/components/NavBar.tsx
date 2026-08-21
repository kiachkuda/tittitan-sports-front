"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {useCart} from "@/contexts/CartProvider";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Logo from "./logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "products",href: "/products" },
  
  { name: "blog",href: "/products" },
  { name: "contact us", href: "/products" },
  { name: "Login", href: "/login" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                link.name === "contact us"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="hidden items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-500 transition hover:border-black md:flex">
            <Search size={18} />
            Search...
          </button>

          {/* Wishlist */}
          <button className="rounded-full p-2 transition hover:bg-gray-100">
            <Heart size={20} />
          </button>

          {/* Cart */}
          <Link href={`/cart`} >
          <button className="relative flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-800">
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Bag</span>

            <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs">
              {cartItems.length}
            </span>
          </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-96 border-t" : "max-h-0"
        }`}
      >
        <nav className="bg-white px-4 py-4">
          <div className="mb-4 flex items-center gap-2 rounded-lg border px-4 py-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-3 transition ${
                  link.name === "contact us"
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}