'use client'
import { Bell, MessageSquare, Search, Sun, Moon, Globe, Plus, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TopNav({ onToggleSidebar, user }: { onToggleSidebar: () => void, user:any }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search products, orders, customers…"
          className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-16 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <div className="flex-1 md:hidden" />

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <Link href={'/dashboard/products/new'}><button className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_-6px] shadow-primary/60 transition hover:brightness-110 md:inline-flex">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
</Link>
        <IconBtn label="Language"><Globe className="h-5 w-5" /></IconBtn>
        <IconBtn label="Toggle theme" onClick={() => setDark((d) => !d)}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </IconBtn>
        <IconBtn label="Messages" badge>
          <MessageSquare className="h-5 w-5" />
        </IconBtn>
        <IconBtn label="Notifications" badge>
          <Bell className="h-5 w-5" />
        </IconBtn>

        <button className="ml-1 flex items-center gap-2 rounded-xl border border-border bg-card p-1 pr-2 transition hover:bg-muted">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-xs font-bold text-primary-foreground">
           {/* {`${(user?.fname)} ${(user?.lname)}`} */} TS
          </div>
          <div className="hidden text-left leading-tight md:block">
            <div className="text-xs font-semibold"> {`${user?.fname} ${(user?.lname)}`}.</div>
            <div className="text-[10px] text-muted-foreground">Admin</div>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </button>
      </div>
    </header>
  );
}

function IconBtn({
  children,
  label,
  badge,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  badge?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="relative grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      {children}
      {badge && (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
      )}
    </button>
  );
}
