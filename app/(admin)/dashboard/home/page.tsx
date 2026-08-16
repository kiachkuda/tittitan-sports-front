'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, Package,
  Users, Clock, AlertTriangle, MoreHorizontal, ArrowUpRight,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";

import { useAuth } from "@/contexts/AuthProvider";
import { getAllOrders } from "@/app/lib/order";
import { getUsers } from "@/app/lib/users";


const revenueData = [
  { m: "Jan", revenue: 82000, orders: 120 },
  { m: "Feb", revenue: 96500, orders: 148 },
  { m: "Mar", revenue: 88200, orders: 132 },
  { m: "Apr", revenue: 115400, orders: 175 },
  { m: "May", revenue: 132900, orders: 198 },
  { m: "Jun", revenue: 128700, orders: 189 },
  { m: "Jul", revenue: 156300, orders: 231 },
  { m: "Aug", revenue: 171200, orders: 254 },
  { m: "Sep", revenue: 162800, orders: 242 },
  { m: "Oct", revenue: 189400, orders: 281 },
  { m: "Nov", revenue: 204100, orders: 302 },
  { m: "Dec", revenue: 245600, orders: 358 },
];

const topTeams = [
  { name: "Arsenal Home 25/26", sold: 342, pct: 92 },
  { name: "Real Madrid Away 25/26", sold: 298, pct: 80 },
  { name: "Man City Home 25/26", sold: 267, pct: 72 },
  { name: "Barcelona Home 25/26", sold: 231, pct: 62 },
  { name: "Kenya Harambee Stars", sold: 198, pct: 53 },
  { name: "PSG Third 25/26", sold: 164, pct: 44 },
];

const orders = [
  { id: "TS-10245", customer: "Brian Otieno", jersey: "Arsenal Home 25/26", qty: 2, pay: "Mpesa", status: "Completed", total: "KES 8,400", date: "17 Jul" },
  { id: "TS-10244", customer: "Aisha Kamau", jersey: "Real Madrid Away", qty: 1, pay: "Stripe", status: "Pending", total: "KES 4,600", date: "17 Jul" },
  { id: "TS-10243", customer: "Kevin Njoroge", jersey: "Man City Home", qty: 3, pay: "Mpesa", status: "Completed", total: "KES 12,900", date: "17 Jul" },
  { id: "TS-10242", customer: "Wanjiru Mwangi", jersey: "Barcelona Home", qty: 1, pay: "Visa", status: "Cancelled", total: "KES 4,200", date: "16 Jul" },
  { id: "TS-10241", customer: "Samuel Kiprop", jersey: "Harambee Stars Home", qty: 2, pay: "Mpesa", status: "Completed", total: "KES 6,800", date: "16 Jul" },
  { id: "TS-10240", customer: "Faith Chebet", jersey: "PSG Third 25/26", qty: 1, pay: "PayPal", status: "Pending", total: "KES 5,100", date: "16 Jul" },
];





export default function Home() {

  const auth = useAuth();
  const user = auth.user;
  const loading = auth.loading;
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);


  useEffect( () =>{

    const getOrders = async ()=>{
     let response = await getAllOrders();
      let users = await getUsers();

      let orders = response.data;
      setUsers(users);
      setOrders(orders)
      
    }

    

    getOrders();
    

  }, [])

  if (!loading && !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Dashboard
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Welcome back, {`${user?.firstname}`} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening in the TitanSportske store today.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm">
          <span className="text-muted-foreground">Period:</span>
          <span className="font-semibold">Last 30 days</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Total Revenue" value="KES 1,245,600" delta="+12.4%" up icon={DollarSign} accent="primary" big />
        <Kpi label="Orders" value="1,245" delta="+8.2%" up icon={ShoppingBag} accent="info" />
        <Kpi label="Products" value="542" delta="+3.1%" up icon={Package} accent="success" />
        <Kpi label="Customers" value={`${users?.length}`} delta="+15.7%" up icon={Users} accent="warning" />
        <Kpi label="Pending Orders" value="18" delta="-4" icon={Clock} accent="warning" />
        <Kpi label="Out of Stock" value="7" delta="+2" icon={AlertTriangle} accent="danger" />
      </div>

      {/* Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Revenue Overview"
            subtitle="Monthly revenue vs. orders"
            action={
              <div className="flex items-center gap-2 text-xs">
                <LegendDot className="bg-primary" /> Revenue
                <LegendDot className="ml-3 bg-info" /> Orders
              </div>
            }
          />
          <div className="h-72 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ord" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-info)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-info)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#rev)" />
                <Area type="monotone" dataKey="orders" stroke="var(--color-info)" strokeWidth={2} fill="url(#ord)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Top Jerseys" subtitle="Best sellers this month" />
          <ul className="space-y-4 px-5 pb-5">
            {topTeams.map((t) => (
              <li key={t.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="truncate font-medium">{t.name}</span>
                  <span className="ml-3 shrink-0 text-xs font-semibold text-muted-foreground">
                    {t.sold}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Second charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Orders by Month" subtitle="Volume trend" />
          <div className="h-56 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="orders" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Payment Methods" subtitle="Share of transactions" />
          <div className="space-y-3 px-5 pb-5 pt-1">
            {[
              { name: "Mpesa", pct: 58, color: "bg-success" },
              { name: "Visa / Mastercard", pct: 22, color: "bg-info" },
              { name: "Stripe", pct: 12, color: "bg-primary" },
              { name: "PayPal", pct: 8, color: "bg-warning" },
            ].map((p) => (
              <div key={p.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground">{p.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Inventory Health" subtitle="Across all warehouses" />
          <div className="space-y-4 px-5 pb-5 pt-1">
            <Metric label="In Stock" value="512" tone="success" />
            <Metric label="Low Stock" value="23" tone="warning" />
            <Metric label="Out of Stock" value="7" tone="danger" />
            <div className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Tip:</span> Restock Arsenal
              Home 25/26 (size L, XL) — trending 92% sell-through.
            </div>
          </div>
        </Card>
      </div>

      {/* Recent orders */}
      <Card className="mt-6">
        <CardHeader
          title="Recent Orders"
          subtitle="Latest activity across the store"
          action={
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View all <ArrowUpRight className="h-4 w-4" />
            </button>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Jersey</th>
                <th className="px-5 py-3 font-semibold">Qty</th>
                <th className="px-5 py-3 font-semibold">Payment</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {orders.map((o:any) => (
                <tr key={o?.order_id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-4 font-semibold">{o.order_id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                        {o.user_id}
                      </div>
                      <span className="font-medium">{o.user_id}</span>
                    </div>
                  </td>
                  
                  <td className="px-5 py-4">{}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">{o.pay}</span>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4 font-semibold">{o.total_amount}</td>
                  <td className="px-5 py-4 text-muted-foreground">{o.created_at}</td>
                  <td className="px-5 py-4">
                    <button aria-label="Actions" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
  </>
  );
}

/* ---------- Small building blocks ---------- */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({
  title, subtitle, action,
}: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 p-5">
      <div className="min-w-0">
        <h3 className="text-base font-bold tracking-tight">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const accentMap = {
  primary: { bg: "bg-primary/10", fg: "text-primary" },
  info: { bg: "bg-info/10", fg: "text-info" },
  success: { bg: "bg-success/10", fg: "text-success" },
  warning: { bg: "bg-warning/15", fg: "text-warning-foreground" },
  danger: { bg: "bg-destructive/10", fg: "text-destructive" },
} as const;

function Kpi({
  label, value, delta, up, icon: Icon, accent, big,
}: {
  label: string; value: string; delta?: string; up?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  accent: keyof typeof accentMap; big?: boolean;
}) {
  const a = accentMap[accent];
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-elevated)] ${
        big ? "sm:col-span-2 xl:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${a.bg} ${a.fg}`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
          >
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-bold tracking-tight ${big ? "text-3xl" : "text-2xl"}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "bg-success/10 text-success",
    Pending: "bg-warning/20 text-warning-foreground",
    Cancelled: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function LegendDot({ className = "" }: { className?: string }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${className}`} />;
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "success" | "warning" | "danger" }) {
  const bar = { success: "bg-success", warning: "bg-warning", danger: "bg-destructive" }[tone];
  return (
    <div className="flex items-center gap-3">
      <span className={`h-8 w-1 rounded-full ${bar}`} />
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}
