export function Counter({ now, max }: { now: number; max: number }) {
  return (
    <div className="mt-1 text-right text-[11px] text-muted-foreground">
      {now} / {max}
    </div>
  );
}