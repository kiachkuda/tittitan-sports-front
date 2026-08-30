import { Bell, Package, Settings } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./PersonalInformation";

export function PreferencesSection() {
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

export function Preference({
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