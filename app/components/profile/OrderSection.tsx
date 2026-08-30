import { ChevronRight } from "lucide-react";
import { SectionHeader } from "./PersonalInformation";

export function OrdersSection(props:{orders:any[]}) {
 
  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Orders"
        description="Track and manage your Titan Sports orders."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OrderStat label="All Orders" value="12" />
        <OrderStat label="Processing" value="2" />
        <OrderStat label="Shipped" value="1" />
        <OrderStat label="Delivered" value="9" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900">
            Recent Orders
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {props.orders.map((order) => (
            <div
              key={order.id}
              className="p-5 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">
                      {order.id}
                    </span>

                    <StatusBadge status={order.status} />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.date} · {order.items}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <span className="font-semibold text-slate-900">
                    {order.amount}
                  </span>

                  <button className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700">
                    View
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4 text-center">
          <button className="text-sm font-semibold text-orange-600">
            View all orders
          </button>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-green-50 text-green-600",
    Processing: "bg-yellow-50 text-yellow-600",
    Shipped: "bg-blue-50 text-blue-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function OrderStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xl font-bold text-slate-900">
        {value}
      </p>
      <p className="text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}
