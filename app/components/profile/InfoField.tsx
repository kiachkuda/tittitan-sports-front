import { CheckCircle2 } from "lucide-react";

export function InfoField({
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
