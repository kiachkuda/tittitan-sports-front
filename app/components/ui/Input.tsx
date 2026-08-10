import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, id, className = "", ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[13px] font-medium text-ink/70">
        {label}
      </label>
      <input
        id={inputId}
        className={[
          "h-11 rounded-md border bg-paper px-3.5 text-[15px] text-ink placeholder:text-ink/35",
          "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/40",
          error ? "border-danger focus:border-danger" : "border-line focus:border-ink",
          className,
        ].join(" ")}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-error`} className="text-[13px] text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
