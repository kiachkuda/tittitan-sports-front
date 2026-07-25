"use client"

export function Field({
  label, hint, required, error, children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-sm font-semibold">
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </label>
        {hint && !error && (
          <span className="text-[11px] text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <div className="mt-1.5 text-xs font-medium text-destructive">{error}</div>
      )}
    </div>
  );
}