
"use client";

import { useState } from "react";
import {
  User,
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
} from "lucide-react";

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
    icon: User,
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

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <OrdersSection />;

      case "addresses":
        return <AddressesSection />;

      case "payments":
        return <PaymentsSection />;

      case "wishlist":
        return <WishlistSection />;

      case "preferences":
        return <PreferencesSection />;

      case "security":
        return <SecuritySection />;

      default:
        return <PersonalInformation />;
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
                Welcome back, Samuel 👋
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

/* =========================================================
   PERSONAL INFORMATION
========================================================= */

function PersonalInformation() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Personal Information"
        description="Update your personal details and contact information."
      />

      {/* Profile card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Profile Details
            </h3>
            <p className="text-sm text-slate-500">
              Information associated with your account
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <Edit3 size={15} />
            Edit
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InfoField
            label="First Name"
            value="Samuel"
          />

          <InfoField
            label="Last Name"
            value="Kiarie"
          />

          <InfoField
            label="Email Address"
            value="samuel@example.com"
            icon={<Mail size={16} />}
            verified
          />

          <InfoField
            label="Phone Number"
            value="+254 7XX XXX XXX"
            icon={<Phone size={16} />}
          />

          <InfoField
            label="Date of Birth"
            value="Not provided"
          />

          <InfoField
            label="Gender"
            value="Not provided"
          />
        </div>
      </div>

      {/* Account statistics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={<Package />}
          value="12"
          label="Orders"
        />

        <StatCard
          icon={<Heart />}
          value="8"
          label="Wishlist"
        />

        <StatCard
          icon={<MapPin />}
          value="2"
          label="Addresses"
        />

        <StatCard
          icon={<CheckCircle2 />}
          value="Gold"
          label="Member"
        />
      </div>

      {/* Account information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="font-semibold text-slate-900">
          Account Information
        </h3>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <InfoField
            label="Account Status"
            value="Active"
            verified
          />

          <InfoField
            label="Member Since"
            value="August 2026"
          />

          <InfoField
            label="Last Login"
            value="Today"
          />

          <InfoField
            label="Email Verification"
            value="Verified"
            verified
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ORDERS
========================================================= */

function OrdersSection() {
  const orders = [
    {
      id: "#TS-10045",
      date: "28 Aug 2026",
      items: "Arsenal Home Jersey",
      amount: "KSh 6,500",
      status: "Delivered",
    },
    {
      id: "#TS-10032",
      date: "20 Aug 2026",
      items: "Football Training Kit",
      amount: "KSh 4,800",
      status: "Processing",
    },
    {
      id: "#TS-10021",
      date: "14 Aug 2026",
      items: "Nike Football",
      amount: "KSh 3,500",
      status: "Delivered",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Orders"
        description="Track and manage your Titan Sports orders."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OrderStat label="All Orders" value="12" />
        <OrderStat label="Processing" value="2" />
        <OrderStat label="Shipped" value="1" />
        <OrderStat label="Delivered" value="9" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900">
            Recent Orders
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">
                      {order.id}
                    </span>

                    <StatusBadge status={order.status} />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.date} · {order.items}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <span className="font-semibold text-slate-900">
                    {order.amount}
                  </span>

                  <button className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700">
                    View
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4 text-center">
          <button className="text-sm font-semibold text-orange-600">
            View all orders
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADDRESSES
========================================================= */

function AddressesSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Addresses"
        description="Manage your delivery addresses."
        action={
          <button className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
            + Add Address
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <AddressCard
          title="Home"
          name="Samuel Kiarie"
          phone="+254 7XX XXX XXX"
          address="Nairobi, Kenya"
          details="Apartment / House details"
          defaultAddress
        />

        <AddressCard
          title="Work"
          name="Samuel Kiarie"
          phone="+254 7XX XXX XXX"
          address="Westlands, Nairobi"
          details="Office address"
        />
      </div>
    </div>
  );
}

/* =========================================================
   PAYMENTS
========================================================= */

function PaymentsSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Payments"
        description="View your payment history and transactions."
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-semibold">Payment History</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            ["#TS-10045", "M-Pesa", "KSh 6,500", "Successful"],
            ["#TS-10032", "M-Pesa", "KSh 4,800", "Successful"],
            ["#TS-10021", "M-Pesa", "KSh 3,500", "Successful"],
          ].map(([order, method, amount, status]) => (
            <div
              key={order}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {order}
                </p>
                <p className="text-sm text-slate-500">
                  {method}
                </p>
              </div>

              <div className="flex items-center justify-between gap-5">
                <span className="font-semibold">{amount}</span>

                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 size={15} />
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WISHLIST
========================================================= */

function WishlistSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Wishlist"
        description="Products you've saved for later."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
          <Heart size={28} />
        </div>

        <h3 className="mt-4 font-semibold text-slate-900">
          Your wishlist
        </h3>

        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
          Save your favourite jerseys, football accessories and
          sportswear so you can find them easily later.
        </p>

        <button className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
          Browse Products
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   PREFERENCES
========================================================= */

function PreferencesSection() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Preferences"
        description="Choose how Titan Sports communicates with you."
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Preference
          icon={<Bell size={18} />}
          title="Email Notifications"
          description="Receive important account notifications by email."
          enabled={emailNotifications}
          onChange={setEmailNotifications}
        />

        <Preference
          icon={<Package size={18} />}
          title="Order Updates"
          description="Get updates about your orders and deliveries."
          enabled={orderUpdates}
          onChange={setOrderUpdates}
        />

        <Preference
          icon={<Settings size={18} />}
          title="Promotions & Offers"
          description="Receive special offers, discounts and new product alerts."
          enabled={promotions}
          onChange={setPromotions}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SECURITY
========================================================= */

function SecuritySection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Security"
        description="Protect your Titan Sports account."
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SecurityItem
          icon={<Lock />}
          title="Password"
          description="Last changed recently"
          action="Change Password"
        />

        <SecurityItem
          icon={<Mail />}
          title="Email Address"
          description="samuel@example.com"
          action="Change Email"
        />

        <SecurityItem
          icon={<ShieldCheck />}
          title="Two-Factor Authentication"
          description="Add an extra layer of protection to your account."
          action="Enable"
        />
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
        <h3 className="font-semibold text-red-700">
          Danger Zone
        </h3>

        <p className="mt-1 text-sm text-red-600">
          Deleting your account is permanent and cannot be undone.
        </p>

        <button className="mt-4 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100">
          Delete Account
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

function InfoField({
  label,
  value,
  icon,
  verified,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  verified?: boolean;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
        {icon && (
          <span className="text-slate-400">
            {icon}
          </span>
        )}

        {value}

        {verified && (
          <CheckCircle2
            size={15}
            className="text-green-500"
          />
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
        {icon}
      </div>

      <p className="text-xl font-bold text-slate-900">
        {value}
      </p>

      <p className="text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

function OrderStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xl font-bold text-slate-900">
        {value}
      </p>
      <p className="text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-green-50 text-green-600",
    Processing: "bg-yellow-50 text-yellow-600",
    Shipped: "bg-blue-50 text-blue-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function AddressCard({
  title,
  name,
  phone,
  address,
  details,
  defaultAddress,
}: {
  title: string;
  name: string;
  phone: string;
  address: string;
  details: string;
  defaultAddress?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-orange-500" />
          <h3 className="font-semibold">{title}</h3>
        </div>

        {defaultAddress && (
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
            Default
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p className="font-medium text-slate-900">{name}</p>
        <p>{phone}</p>
        <p>{address}</p>
        <p>{details}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50">
          Edit
        </button>

        <button className="rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50">
          Remove
        </button>
      </div>
    </div>
  );
}

function Preference({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 p-5 last:border-0">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-orange-500" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SecurityItem({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button className="self-start rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:self-auto">
        {action}
      </button>
    </div>
  );
}

