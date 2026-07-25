export function Section({
  icon: Icon, title, description, children, error, action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <header className="flex items-start justify-between gap-3 border-b border-border p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight md:text-base">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {action}
      </header>
      <div className="space-y-5 p-5">
        {children}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
