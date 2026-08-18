"use client";

import Button from "../../ui/Button";
import { formatCurrency } from "@/app/types/constants";
import { DeliveryMethod } from "@/app/types/interface";

type PaymentStatus = "PENDING" | "PAID" | "CANCELLED" | "FAILED";

interface ConfirmationStepProps {
  orderNumber: string;
  total: number;
  deliveryMethod: DeliveryMethod;
  email?: string;
  paymentStatus: PaymentStatus;
  onContinueShopping?: () => void;
}

export default function ConfirmationStep({
  orderNumber,
  total,
  deliveryMethod,
  paymentStatus,
  onContinueShopping,
}: ConfirmationStepProps) {
  const isPending = paymentStatus === "PENDING";
  const isPaid = paymentStatus === "PAID";
  const isCancelled =
    paymentStatus === "CANCELLED" ||
    paymentStatus === "FAILED";

  if (isPending) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-10 text-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400/15">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
        </div>

        <div>
          <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
            Confirm your payment
          </h1>

          <p className="mt-1 text-[14px] text-ink/55">
            We've sent a payment request to your phone.
            Enter your M-Pesa PIN to complete the payment.
          </p>
        </div>

        <div className="w-full rounded-xl border border-dashed border-line p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ink/50">
              Order number
            </span>

            <span className="font-mono text-[15px] font-semibold text-ink">
              {orderNumber}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] text-ink/50">
              Amount
            </span>

            <span className="font-mono text-[15px] font-semibold text-ink">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <p className="text-[13px] text-ink/50">
          Waiting for payment confirmation...
        </p>
      </div>
    );
  }

  if (isCancelled) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-10 text-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="#DC2626"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
            Payment cancelled
          </h1>

          <p className="mt-1 text-[14px] text-ink/55">
            Your payment was not completed. Your order has
            not been confirmed.
          </p>
        </div>

        <div className="w-full rounded-xl border border-dashed border-line p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ink/50">
              Order number
            </span>

            <span className="font-mono text-[15px] font-semibold text-ink">
              {orderNumber}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] text-ink/50">
              Amount
            </span>

            <span className="font-mono text-[15px] font-semibold text-ink">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <Button
          className="bg-orange-400 hover:bg-orange-300"
          fullWidth
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Continue shopping
        </Button>
      </div>
    );
  }

  // PAID
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-10 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12.5L9.5 18L20 6"
            stroke="#16A34A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
          Order placed
        </h1>

        <p className="mt-1 text-[14px] text-ink/55">
          We've sent a confirmation to your email with
          the order details.
        </p>
      </div>

      <div className="w-full rounded-xl border border-dashed border-line p-5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-ink/50">
            Order number
          </span>

          <span className="font-mono text-[15px] font-semibold text-ink">
            {orderNumber}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] text-ink/50">
            Total paid
          </span>

          <span className="font-mono text-[15px] font-semibold text-ink">
            {formatCurrency(total)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] text-ink/50">
            Estimated arrival
          </span>

          <span className="text-[14px] font-medium text-ink">
            {deliveryMethod.etaLabel}
          </span>
        </div>
      </div>

      <Button
        className="bg-orange-400 hover:bg-orange-300"
        fullWidth
        onClick={
          onContinueShopping ??
          (() => {
            window.location.href = "/";
          })
        }
      >
        Continue shopping
      </Button>
    </div>
  );
}