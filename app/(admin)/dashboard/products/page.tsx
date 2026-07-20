"use client"
import AdminShell from "@/app/(admin)/compononents/admin/AdminShell";
import { useMemo, useState } from "react";
import {
  Plus, Search, Filter, Download, Upload, MoreHorizontal, Pencil, Trash2,
  Copy, Eye, ChevronLeft, ChevronRight, Package, TrendingUp, AlertTriangle,
  CheckCircle2, LayoutGrid, List, ArrowUpDown, Star,
} from "lucide-react";
import { useRouter } from "next/navigation";


type Status = "Active" | "Draft" | "Out of Stock" | "Archived";
type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  status: Status;
  image: string;
  updated: string;
};

const PRODUCTS: Product[] = [
  { id: "P-1042", name: "Arsenal Home Jersey 25/26", sku: "ARS-H-2526", category: "Club Jerseys", brand: "Adidas", price: 4200, stock: 128, sold: 342, rating: 4.8, status: "Active", image: "🔴", updated: "2h ago" },
  { id: "P-1041", name: "Real Madrid Away 25/26", sku: "RMA-A-2526", category: "Club Jerseys", brand: "Adidas", price: 4600, stock: 84, sold: 298, rating: 4.9, status: "Active", image: "⚪", updated: "5h ago" },
  { id: "P-1040", name: "Man City Home 25/26", sku: "MCI-H-2526", category: "Club Jerseys", brand: "Puma", price: 4300, stock: 62, sold: 267, rating: 4.7, status: "Active", image: "🔵", updated: "1d ago" },
  { id: "P-1039", name: "Barcelona Home 25/26", sku: "BAR-H-2526", category: "Club Jerseys", brand: "Nike", price: 4200, stock: 12, sold: 231, rating: 4.6, status: "Active", image: "🟣", updated: "1d ago" },
  { id: "P-1038", name: "Kenya Harambee Stars Home", sku: "KEN-H-2526", category: "National Teams", brand: "Umbro", price: 3400, stock: 210, sold: 198, rating: 4.9, status: "Active", image: "🟢", updated: "2d ago" },
  { id: "P-1037", name: "PSG Third Jersey 25/26", sku: "PSG-T-2526", category: "Club Jerseys", brand: "Nike", price: 5100, stock: 0, sold: 164, rating: 4.5, status: "Out of Stock", image: "⚫", updated: "3d ago" },
  { id: "P-1036", name: "Liverpool Home 25/26", sku: "LIV-H-2526", category: "Club Jerseys", brand: "Nike", price: 4400, stock: 96, sold: 187, rating: 4.7, status: "Active", image: "🔴", updated: "3d ago" },
  { id: "P-1035", name: "Bayern Munich Home 25/26", sku: "BAY-H-2526", category: "Club Jerseys", brand: "Adidas", price: 4500, stock: 44, sold: 152, rating: 4.6, status: "Active", image: "🔴", updated: "4d ago" },
  { id: "P-1034", name: "Argentina 3-Star Home", sku: "ARG-H-2526", category: "National Teams", brand: "Adidas", price: 4800, stock: 8, sold: 289, rating: 5.0, status: "Active", image: "🔵", updated: "4d ago" },
  { id: "P-1033", name: "Brazil Home Jersey 25/26", sku: "BRA-H-2526", category: "National Teams", brand: "Nike", price: 4700, stock: 76, sold: 244, rating: 4.8, status: "Active", image: "🟡", updated: "5d ago" },
  { id: "P-1032", name: "Predator Match Ball", sku: "EQP-BAL-01", category: "Equipment", brand: "Adidas", price: 3200, stock: 140, sold: 92, rating: 4.4, status: "Active", image: "⚽", updated: "6d ago" },
  { id: "P-1031", name: "Titan Pro Shin Guards", sku: "EQP-SHN-04", category: "Equipment", brand: "Nike", price: 1800, stock: 220, sold: 78, rating: 4.3, status: "Active", image: "🛡️", updated: "1w ago" },
  { id: "P-1030", name: "Chelsea Retro 12/13 Home", sku: "CHE-R-1213", category: "Retro", brand: "Adidas", price: 5400, stock: 18, sold: 61, rating: 4.9, status: "Draft", image: "🔵", updated: "1w ago" },
  { id: "P-1029", name: "AC Milan Away 25/26", sku: "MIL-A-2526", category: "Club Jerseys", brand: "Puma", price: 4300, stock: 0, sold: 118, rating: 4.5, status: "Out of Stock", image: "⚪", updated: "1w ago" },
];

const CATEGORIES = ["All", "Club Jerseys", "National Teams", "Retro", "Equipment"] as const;
const STATUSES: (Status | "All")[] = ["All", "Active", "Draft", "Out of Stock", "Archived"];

export default function Home() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [status, setStatus] = useState<Status | "All">("All");
  const [view, setView] = useState<"table" | "grid">("table");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const perPage = 8;

  const router = useRouter();

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (status !== "All" && p.status !== status) return false;
      if (q && !`${p.name} ${p.sku}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const toggleAll = () =>
    setSelected((s) =>
      s.size === paged.length ? new Set() : new Set(paged.map((p) => p.id))
    );

    const handleClick = (destination:string) => {
      router.push(destination);
    }

  const stats = [
    { label: "Total Products", value: PRODUCTS.length, delta: "+12", icon: Package, accent: "primary" },
    { label: "Active", value: PRODUCTS.filter((p) => p.status === "Active").length, delta: "+8", icon: CheckCircle2, accent: "success" },
    { label: "Low Stock", value: PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 20).length, delta: "3", icon: AlertTriangle, accent: "warning" },
    { label: "Out of Stock", value: PRODUCTS.filter((p) => p.status === "Out of Stock").length, delta: "+2", icon: TrendingUp, accent: "danger" },
  ] as const;



  return (
    <AdminShell>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Catalog</div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage jerseys, equipment, and merchandise across the TitanSports catalog.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
            <Upload className="h-4 w-4" /> Import
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
            <Download className="h-4 w-4" /> Export
          </button>
          <button onClick={ () => handleClick("/dashboard/products/new")} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_-6px] shadow-primary/60 transition hover:brightness-110">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-6 rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search by name or SKU…"
              className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <Select value={cat} onChange={(v) => { setCat(v as typeof cat); setPage(1); }} options={[...CATEGORIES]} />
          <Select value={status} onChange={(v) => { setStatus(v as typeof status); setPage(1); }} options={STATUSES.map(String)} />

          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-semibold text-foreground transition hover:bg-muted">
            <Filter className="h-4 w-4" /> More filters
          </button>

          <div className="ml-auto flex items-center gap-1 rounded-xl border border-border bg-background p-1">
            <button
              onClick={() => setView("table")}
              aria-label="Table view"
              className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                view === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {selected.size > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-border bg-primary/5 px-5 py-3 text-sm">
            <div className="font-semibold">
              {selected.size} selected
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-muted">Bulk edit</button>
              <button className="rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-muted">Archive</button>
              <button className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>
        )}

        {view === "table" ? (
          <TableView
            rows={paged}
            selected={selected}
            toggle={toggle}
            toggleAll={toggleAll}
          />
        ) : (
          <GridView rows={paged} />
        )}

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 text-sm">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{filtered.length}</span> products
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-8 min-w-8 rounded-lg px-2.5 text-xs font-semibold transition ${
                    currentPage === n
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

/* ---------- Views ---------- */

function TableView({
  rows, selected, toggle, toggleAll,
}: {
  rows: Product[];
  selected: Set<string>;
  toggle: (id: string) => void;
  toggleAll: () => void;
}) {
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="w-10 px-5 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 rounded border-border accent-primary"
              />
            </th>
            <Th>Product <ArrowUpDown className="h-3 w-3" /></Th>
            <Th>SKU</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Sold</Th>
            <Th>Rating</Th>
            <Th>Status</Th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={10} className="px-5 py-16 text-center text-sm text-muted-foreground">
                No products match your filters.
              </td>
            </tr>
          )}
          {rows.map((p) => (
            <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
              <td className="px-5 py-4">
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => toggle(p.id)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-muted to-muted/50 text-xl">
                    {p.image}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{p.name}</div>
                    <div className="text-[11px] text-muted-foreground">{p.brand} • Updated {p.updated}</div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{p.sku}</td>
              <td className="px-5 py-4">
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">{p.category}</span>
              </td>
              <td className="px-5 py-4 font-semibold">KES {p.price.toLocaleString()}</td>
              <td className="px-5 py-4">
                <StockPill n={p.stock} />
              </td>
              <td className="px-5 py-4 text-muted-foreground">{p.sold}</td>
              <td className="px-5 py-4">
                <div className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                  <span className="font-semibold">{p.rating}</span>
                </div>
              </td>
              <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
              <td className="px-5 py-4">
                <RowActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GridView({ rows }: { rows: Product[] }) {
  if (rows.length === 0) {
    return (
      <div className="px-5 py-16 text-center text-sm text-muted-foreground">
        No products match your filters.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {rows.map((p) => (
        <div
          key={p.id}
          className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:shadow-[var(--shadow-elevated)]"
        >
          <div className="relative grid h-40 place-items-center bg-gradient-to-br from-muted to-muted/40 text-6xl">
            {p.image}
            <div className="absolute right-3 top-3">
              <StatusBadge status={p.status} />
            </div>
          </div>
          <div className="p-4">
            <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>{p.category}</span>
              <span className="inline-flex items-center gap-1 text-warning">
                <Star className="h-3 w-3 fill-warning" />
                <span className="font-bold text-foreground">{p.rating}</span>
              </span>
            </div>
            <div className="line-clamp-1 font-semibold">{p.name}</div>
            <div className="text-[11px] text-muted-foreground">{p.sku}</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-lg font-bold">KES {p.price.toLocaleString()}</div>
              <StockPill n={p.stock} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Small building blocks ---------- */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 font-semibold">
      <span className="inline-flex items-center gap-1.5">{children}</span>
    </th>
  );
}

function Select({
  value, onChange, options,
}: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 appearance-none rounded-xl border border-border bg-background pl-3.5 pr-9 text-sm font-medium outline-none transition hover:bg-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StockPill({ n }: { n: number }) {
  const tone =
    n === 0 ? "bg-destructive/10 text-destructive"
    : n <= 20 ? "bg-warning/20 text-warning-foreground"
    : "bg-success/10 text-success";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {n === 0 ? "Out of stock" : `${n} in stock`}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Active: "bg-success/10 text-success",
    Draft: "bg-muted text-muted-foreground",
    "Out of Stock": "bg-destructive/10 text-destructive",
    Archived: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function StatCard({
  label, value, delta, icon: Icon, accent,
}: {
  label: string; value: number; delta: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "primary" | "success" | "warning" | "danger";
}) {
  const map = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    danger: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${map[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[11px] font-semibold text-muted-foreground">{delta} this week</span>
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

function RowActions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-label="Actions"
        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-elevated)]">
          <MenuItem icon={Eye}>View</MenuItem>
          <MenuItem icon={Pencil}>Edit</MenuItem>
          <MenuItem icon={Copy}>Duplicate</MenuItem>
          <div className="border-t border-border" />
          <MenuItem icon={Trash2} danger>Delete</MenuItem>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon: Icon, children, danger,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode; danger?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition ${
        danger ? "text-destructive hover:bg-destructive/10" : "hover:bg-muted"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}
