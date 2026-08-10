import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink/90 disabled:bg-ink/30 disabled:cursor-not-allowed",
  secondary:
    "bg-transparent text-ink border border-line hover:border-ink disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "bg-transparent text-ink hover:bg-line/50",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5",
        "font-sans text-[15px] font-semibold tracking-tight transition-colors duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        VARIANT_CLASSES[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
