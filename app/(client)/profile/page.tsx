
"use client";

import { useState } from "react";

import {
  
  Package,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  ShieldCheck,
  Bell,
  LogOut,
  ChevronRight,
  Camera,
  Mail,
  Phone,
  Edit3,
  CheckCircle2,
  Lock,
  User2,
} from "lucide-react";
import { User } from "@/app/types/interface";
import { AddressesSection } from "@/app/components/profile/AddressSection";
import { OrdersSection } from "@/app/components/profile/OrderSection";
import { PaymentsSection } from "@/app/components/profile/PaymentSection";
import { PreferencesSection } from "@/app/components/profile/PreferenceSection";
import { SecuritySection } from "@/app/components/profile/SecuritySection";
import { WishlistSection } from "@/app/components/profile/WishlistSection";
import { useAuth } from "@/contexts/AuthProvider";
import { PersonalInformation } from "@/app/components/profile/PersonalInformation";

type ProfileSection =
  | "profile"
  | "orders"
  | "addresses"
  | "payments"
  | "wishlist"
  | "preferences"
  | "security";

const menuItems = [
  {
    id: "profile" as ProfileSection,
    label: "Personal Information",
    description: "Manage your personal details",
    icon: User2,
  },
  {
    id: "orders" as ProfileSection,
    label: "My Orders",
    description: "View your orders and deliveries",
    icon: Package,
  },
  {
    id: "addresses" as ProfileSection,
    label: "Addresses",
    description: "Manage your delivery addresses",
    icon: MapPin,
  },
  {
    id: "payments" as ProfileSection,
    label: "Payments",
    description: "View your payment history",
    icon: CreditCard,
  },
  {
    id: "wishlist" as ProfileSection,
    label: "Wishlist",
    description: "Products you've saved",
    icon: Heart,
  },
  {
    id: "preferences" as ProfileSection,
    label: "Preferences",
    description: "Manage notifications and preferences",
    icon: Settings,
  },
  {
    id: "security" as ProfileSection,
    label: "Security",
    description: "Password and account security",
    icon: ShieldCheck,
  },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] =
    useState<ProfileSection>("profile");
    const auth =useAuth();

    const user = auth.user;

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <OrdersSection orders={[]} />;

      case "addresses":
        return <AddressesSection addressess={[]} />;

      case "payments":
        return <PaymentsSection />;

      case "wishlist":
        return <WishlistSection wishlist={[]} />;

      case "preferences":
        return <PreferencesSection />;

      case "security":
        return <SecuritySection />;

      default:
        return user ? (
          <PersonalInformation user={user} />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Loading profile information...
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-[#071A33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-orange-400">
                MY ACCOUNT
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Welcome back, {`${user?.first_name}`} 👋
              </h1>

              <p className="mt-1 text-sm text-slate-300">
                Manage your Titan Sports account
              </p>
            </div>

            <button className="flex items-center gap-2 self-start rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium transition hover:bg-white/10 sm:self-auto">
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* User mini profile */}
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                  SK
                </div>

                <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white shadow">
                  <Camera size={13} />
                </button>
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-semibold text-slate-900">
                  Samuel Kiarie
                </h2>

                <p className="truncate text-xs text-slate-500">
                  samuel@example.com
                </p>

                <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 size={12} />
                  Verified account
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="hidden truncate text-xs text-slate-400 xl:block">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className={active ? "text-orange-500" : "text-slate-300"}
                  />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <section>{renderContent()}</section>
      </div>
    </main>
  );
}










