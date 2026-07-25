"use client"
import AdminShell from "@/app/(admin)/compononents/admin/AdminShell";
import { useEffect, useMemo, useState } from "react";
import {
  Plus, Search, Filter, Download, Upload, MoreHorizontal, Pencil, Trash2,
  Copy, Eye, ChevronLeft, ChevronRight, Package, TrendingUp, AlertTriangle,
  CheckCircle2, LayoutGrid, List, ArrowUpDown, Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {Product}  from "@/app/types/interface";
import {getAllProducts} from "@/app/lib/product";
import { RowActions } from "../../compononents/RowAction";
import { TableView } from "../../compononents/products/table";




export default function Home() {
  const [q, setQ] = useState("");
  
  const [view, setView] = useState<"table" | "grid">("table");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const perPage = 8;
  const [products, setproducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const data = await getAllProducts();
        setproducts(data.results);
        console.log("Fetched products:", data);
      }
      catch (error) {
        console.error("Error fetching products:", error);
      }
    } 
    fetchproducts();
  },[q]
  )
  const router = useRouter();

  const filtered = useMemo(() => {
    return products.filter((p) => {
     // if (cat !== "All" && p.category !== cat) return false;
      if (q && !`${p.name} ${p.sku}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggle = (id: number) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const toggleAll = () =>
    setSelected((s) =>
      s.size === paged.length ? new Set() : new Set(paged.map((p) => p.product_id))
    );

    const handleClick = (destination:string) => {
      router.push(destination);
    }

  const stats = [
    { label: "Total products", value: products.length, delta: "+12", icon: Package, accent: "primary" },
    ] as const;


  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Catalog</div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">products</h1>
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

          {/* <Select value={cat} onChange={(v) => { setCat(v as typeof cat); setPage(1); }} options={[...CATEGORIES]} /> */}
          {/* <Select value={status} onChange={(v) => { setStatus(v as typeof status); setPage(1); }} options={STATUSES.map(String)} /> */}

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
            rows={products}
            
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
    </>
  );
}

/* ---------- Views ---------- */



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
            
          </div>
          <div className="p-4">
            <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>{p.category}</span>
             
            </div>
            <div className="line-clamp-1 font-semibold">{p.name}</div>
            <div className="text-[11px] text-muted-foreground">{p.sku}</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-lg font-bold">KES {p.price.toLocaleString()}</div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Small building blocks ---------- */


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

// function StockPill({ n }: { n: number }) {
//   const tone =
//     n === 0 ? "bg-destructive/10 text-destructive"
//     : n <= 20 ? "bg-warning/20 text-warning-foreground"
//     : "bg-success/10 text-success";
//   return (
//     <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {n === 0 ? "Out of stock" : `${n} in stock`}
//     </span>
//   );
// }

// function StatusBadge({ status }: { status: Status }) {
//   const map: Record<Status, string> = {
//     Active: "bg-success/10 text-success",
//     Draft: "bg-muted text-muted-foreground",
//     "Out of Stock": "bg-destructive/10 text-destructive",
//     Archived: "bg-muted text-muted-foreground",
//   };
//   return (
//     <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${map[status]}`}>
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {status}
//     </span>
//   );
// }

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