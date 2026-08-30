import { CheckCircle2, Edit3, Heart, Mail, MapPin, Package, Phone } from "lucide-react";
import { InfoField } from "./InfoField";
import { User } from "@/app/types/interface";
import { useAuth } from "@/contexts/AuthProvider";

export function SectionHeader({
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

export function PersonalInformation() {

  const auth =useAuth();

    const user = auth.user;

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
            value={`${user?.first_name}`}
          />

          <InfoField
            label="Last Name"
            value={`${user?.last_name}`}
          />

          <InfoField
            label="Email Address"
            value={`${user?.email}`}
            icon={<Mail size={16} />}
            verified
          />

          <InfoField
            label="Phone Number"
            value={`${user?.mobile}`}
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

export function StatCard({
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