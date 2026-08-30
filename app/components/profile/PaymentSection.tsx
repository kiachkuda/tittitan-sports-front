import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./PersonalInformation";

export function PaymentsSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Payments"
        description="View your payment history and transactions."
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-semibold">Payment History</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            ["#TS-10045", "M-Pesa", "KSh 6,500", "Successful"],
            ["#TS-10032", "M-Pesa", "KSh 4,800", "Successful"],
            ["#TS-10021", "M-Pesa", "KSh 3,500", "Successful"],
          ].map(([order, method, amount, status]) => (
            <div
              key={order}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {order}
                </p>
                <p className="text-sm text-slate-500">
                  {method}
                </p>
              </div>

              <div className="flex items-center justify-between gap-5">
                <span className="font-semibold">{amount}</span>

                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 size={15} />
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
