import { Lock, Mail, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./PersonalInformation";

export function SecuritySection() {
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
