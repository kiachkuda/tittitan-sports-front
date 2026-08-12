"use client";

import { useState } from "react";

import { formatCurrency } from "@/app/types/constants";
import { CartItem, PriceBreakdown } from "@/app/types/interface";

interface OrderSummaryProps {
  items: CartItem[];
  breakdown: PriceBreakdown;
  promoCode: string;
  promoApplied: boolean;
  onPromoCodeChange: (code: string) => void;
  onApplyPromo: () => void;
  editableItems?: boolean;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemoveItem?: (id: number) => void;
}

export default function OrderSummary({
  items,
  breakdown,
  promoCode,
  promoApplied,
  onPromoCodeChange,
  onApplyPromo,
  editableItems = false,
  onQuantityChange,
  onRemoveItem,
}: OrderSummaryProps) {
  const [showItems, setShowItems] = useState(true);

  return (
    <aside className="w-full rounded-xl border border-line bg-paper lg:sticky lg:top-6">
      <div className="border-b border-dashed border-line p-5">
        <button
          type="button"
          onClick={() => setShowItems((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="text-[15px] font-semibold text-ink">
            Order summary
            <span className="ml-2 text-[13px] font-normal text-ink/50">
              {items.reduce((n, i) => n + i.quantity, 0)} items
            </span>
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform duration-200 ${showItems ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {showItems && (
          <ul className="mt-4 flex flex-col gap-4">
            {items.map((item) => (
              <li key={`${item.product_id}`} className="flex gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-line/60 font-mono text-[10px] text-ink/40">
                  {item.sku.slice(0, 3)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-ink">{item.name}</p>
                  {/* <p className="text-[12.5px] text-ink/50">{item.variant}</p> */}
                  <div className="mt-1.5 flex items-center justify-between">
                    {editableItems ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => onQuantityChange?.((item.product_id), Math.max(1, item.quantity - 1))}
                          className="flex h-6 w-6 items-center justify-center rounded border border-line text-ink/60 hover:border-ink"
                        >
                          −
                        </button>
                        <span className="w-4 text-center font-mono text-[13px]">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => onQuantityChange?.((item.product_id), item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border border-line text-ink/60 hover:border-ink"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span className="font-mono text-[12.5px] text-ink/50">Qty {item.quantity}</span>
                    )}
                    <span className="font-mono text-[13.5px] font-medium text-ink">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                  {editableItems && (
                    <button
                      type="button"
                      onClick={() => onRemoveItem?.((item.product_id))}
                      className="mt-1 text-[12px] text-ink/40 underline decoration-dotted hover:text-danger"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-b border-dashed border-line p-5">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            placeholder="Promo code"
            disabled={promoApplied}
            className="h-10 flex-1 rounded-md border border-line bg-transparent px-3 text-[14px] placeholder:text-ink/35 focus:border-ink focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={onApplyPromo}
            disabled={promoApplied || !promoCode}
            className="h-10 shrink-0 rounded-md border border-ink px-4 text-[13px] font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            {promoApplied ? "Applied" : "Apply"}
          </button>
        </div>
        {promoApplied && (
          <p className="mt-2 text-[13px] text-success">10% discount applied</p>
        )}
      </div>

      <div className="flex flex-col gap-2.5 p-5 font-mono text-[13.5px]">
        <Row label="Subtotal" value={formatCurrency(breakdown.subtotal)} />
        {breakdown.discount > 0 && (
          <Row label="Discount" value={`-${formatCurrency(breakdown.discount)}`} tone="success" />
        )}
        <Row
          label="Shipping"
          value={breakdown.shipping === 0 ? "Free" : formatCurrency(breakdown.shipping)}
        />
        <Row label="Tax" value={formatCurrency(breakdown.tax)} />
        <div className="my-1 border-t border-dashed border-line" />
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-[15px] font-semibold text-ink">Total</span>
          <span className="text-[19px] font-semibold text-ink">
            {formatCurrency(breakdown.total)}
          </span>
        </div>
      </div>
    </aside>
  );
}

function Row({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "success";
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="font-sans text-ink/55">{label}</span>
      <span className={tone === "success" ? "text-success" : "text-ink/80"}>{value}</span>
    </div>
  );
}
