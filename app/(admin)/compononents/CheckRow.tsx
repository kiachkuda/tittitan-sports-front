import { CheckCircle2 } from "lucide-react";

export default function CheckRow({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`grid h-4 w-4 place-items-center rounded-full ${
          ok ? "bg-success text-white" : "border border-border bg-background"
        }`}
      >
        {ok && <CheckCircle2 className="h-3 w-3" />}
      </span>
      <span className={ok ? "text-foreground" : "text-muted-foreground"}>{children}</span>
    </li>
  );
}