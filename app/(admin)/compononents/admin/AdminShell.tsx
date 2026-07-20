import { type ReactNode, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";

export default function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-dvh w-full bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <div className="sticky top-0 h-dvh">
          <AppSidebar open={open} />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 animate-slide-in-right">
            <AppSidebar open={true} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav
          onToggleSidebar={() => {
            if (window.matchMedia("(min-width: 768px)").matches) setOpen((o) => !o);
            else setMobileOpen(true);
          }}
        />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
