import { usePathname } from "next/navigation";
import Link from "next/link"
import {
  LayoutDashboard, Package, Tags, Award, Warehouse, ShoppingCart,
  Users, CreditCard, Ticket, Star, BarChart3, FileText,
  UserCog, Settings, LogOut, Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";

const nav = [
  { section: "Overview", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
  ]},
  { section: "Catalog", items: [
    { to: "/dashboard/products", label: "Products", icon: Package },
    { to: "/dashboard/categories", label: "Categories", icon: Tags },
    { to: "/dashboard/home", label: "Inventory", icon: Warehouse },
  ]},
  { section: "Sales", items: [
    { to: "/dashboard/orders", label: "Orders", icon: ShoppingCart, badge: "18" },
    { to: "/dashboard/customers", label: "Customers", icon: Users },
    { to: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { to: "/dashboard/coupons", label: "Coupons", icon: Ticket },
    { to: "/dashboard/reviews", label: "Reviews", icon: Star },
  ]},
  { section: "Insights", items: [
    { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/dashboard/reports", label: "Reports", icon: FileText },
  ]},
  { section: "System", items: [
    { to: "/dashboard/users", label: "Users", icon: UserCog },
    { to: "/dashboard/settings", label: "Settings", icon: Settings },
  ]},
];

export function AppSidebar({ open, onNavigate, user }: { open: boolean; onNavigate?: () => void ,user:any}) {
  const pathname = usePathname();
 

 


  return (
    <aside
      className={`flex h-dvh flex-col bg-sidebar text-sidebar-foreground bg-red-500 transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-black text-primary-foreground shadow-[0_4px_16px_-4px] shadow-primary/60">
          T
        </div>
        {open && (
          <div className="min-w-0">
            <div className="truncate text-sm font-bold tracking-tight">TitanSports</div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">Admin Console</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {nav.map((group) => (
          <div key={group.section} className="mb-5">
            {open && (
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/40">
                {group.section}
              </div>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      href={item.to as string}
                      onClick={onNavigate}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      {active && (
                        <span className="absolute inset-y-1.5 left-0 w-1 rounded-r-full bg-primary" />
                      )}
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      {open && <span className="flex-1 truncate">{item.label}</span>}
                      {open && item.badge && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className={`flex items-center gap-3 rounded-xl p-2 ${open ? "" : "justify-center"}`}>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
            <Shield className="h-4 w-4" />
          </div>
          {open && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold">{`${user?.fname} ${user?.lname}`}</div>
              <div className="truncate text-[11px] text-sidebar-foreground/50">Super Admin</div>
            </div>
          )}
          {open && (
            <button
              aria-label="Log out"
              className="rounded-lg p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
