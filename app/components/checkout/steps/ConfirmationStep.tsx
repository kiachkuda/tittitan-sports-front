"use client";

import Button from "../../ui/Button";
import { formatCurrency } from "@/app/types/constants";
import { DeliveryMethod } from "@/app/types/interface";

interface ConfirmationStepProps {
  orderNumber: string;
  total: number;
  deliveryMethod: DeliveryMethod;
  email?: string;
}

export default function ConfirmationStep({
  orderNumber,
  total,
  deliveryMethod,
}: ConfirmationStepProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 12.5L9.5 18L20 6" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div>
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
          Order placed
        </h1>
        <p className="mt-1 text-[14px] text-ink/55">
          We've sent a confirmation to your email with the order details.
        </p>
      </div>

      <div className="w-full rounded-xl border border-dashed border-line p-5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-ink/50">Order number</span>
          <span className="font-mono text-[15px] font-semibold text-ink">{orderNumber}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] text-ink/50">Total paid</span>
          <span className="font-mono text-[15px] font-semibold text-ink">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] text-ink/50">Estimated arrival</span>
          <span className="text-[14px] font-medium text-ink">{deliveryMethod.etaLabel}</span>
        </div>
      </div>

      <Button fullWidth onClick={() => (window.location.href = "/")}>
        Continue shopping
      </Button>
    </div>
  );
}
