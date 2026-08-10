import { ReactNode } from "react";

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  icon?: ReactNode;
}

export default function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  subtitle,
  meta,
  icon,
}: RadioCardProps) {
  return (
    <label
      className={[
        "flex cursor-pointer items-start gap-3 rounded-lg border border-orange-300 p-4 transition-colors duration-150",
        checked ? "border-ink bg-ink/[0.03]" : "border-line hover:border-ink/40",
      ].join(" ")}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 h-4 w-4 accent-accent"
      />
      {icon && <span className="mt-0.5 text-ink/60">{icon}</span>}
      <span className="flex-1">
        <span className="block text-[15px] font-medium text-ink">{title}</span>
        {subtitle && (
          <span className="mt-0.5 block text-[13px] text-ink/55">{subtitle}</span>
        )}
      </span>
      {meta && (
        <span className="font-mono text-[13px] font-medium text-ink/80">{meta}</span>
      )}
    </label>
  );
}
