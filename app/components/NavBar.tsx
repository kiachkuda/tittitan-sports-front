"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Package,
  Heart,
  LogOut,
} from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  cartCount?: number;
  user?: any;
};

export default function Navbar({
  cartCount = 0,
  user = null,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "products",
      href: "/products",
    },
    {
      name: "Orders",
      href: "/orders",
      icon: Package,
    },
  ];

  const categories = [
    {
      name: "Football Jerseys",
      href: "/products?category=jerseys",
    },
    {
      name: "National Teams",
      href: "/products?category=national-teams",
    },
    {
      name: "Tracksuits",
      href: "/products?category=tracksuits",
    },
    {
      name: "Football Accessories",
      href: "/products?category=accessories",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="text-lg font-black italic">T</span>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              TITAN<span className="text-orange-500">SPORT</span>
            </h1>
            <p className="-mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Gear Up. Play Hard.
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden items-center gap-1 lg:flex">

          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Categories */}
          <div className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                categoriesOpen
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
              }`}
            >
              Categories
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoriesOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 -z-10"
                  onClick={() => setCategoriesOpen(false)}
                />

                <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      onClick={() => setCategoriesOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                    >
                      {category.name}
                    </Link>
                  ))}

                  <div className="my-1 border-t border-gray-100" />

                  <Link
                    href="/shop"
                    onClick={() => setCategoriesOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-bold text-orange-500 hover:bg-orange-50"
                  >
                    View All Products →
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link
            href="/orders"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isActive("/orders")
                ? "bg-orange-50 text-orange-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
            }`}
          >
            Orders
          </Link>
        </div>

        {/* ================= RIGHT ACTIONS ================= */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Search */}
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-orange-500 sm:flex"
          >
            <Search size={20} />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-orange-500 md:flex"
          >
            <Heart size={20} />
          </Link>

          {/* Profile */}
          <Link
            href={user != null ? "/profile" : "/login"}
            aria-label="Profile"
            className={`hidden h-10 w-10 items-center justify-center rounded-full transition sm:flex ${
              isActive("/profile")
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`}
          >
            <User size={20} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Desktop Login/Profile */}
          {!user || user == null ? (
            <Link
              href="/login"
              className="ml-1 hidden rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 sm:block"
            >
              Login
            </Link>
          ) : (
            <Link
              href="/profile"
              className="ml-1 hidden rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 sm:block"
            >
              My Account
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 lg:hidden"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

            {/* Mobile Search */}
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500"
            >
              <Search size={19} />
              Search products...
            </Link>

            {/* Main Links */}
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold ${
                  isActive("/")
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold ${
                  isActive("/shop")
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Shop
              </Link>

              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                  isActive("/orders")
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package size={18} />
                Orders
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Heart size={18} />
                Wishlist
              </Link>

              <Link
                href={user || user != null ? "/profile" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <User size={18} />
                {user || user != null ? "My Profile" : "Login / Sign Up"}
              </Link>
            </div>

            {/* Categories */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                Categories
              </p>

              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Account Button */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <Link
                href={isLoggedIn ? "/profile" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                <User size={18} />
                {isLoggedIn ? "My Account" : "Login / Create Account"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}