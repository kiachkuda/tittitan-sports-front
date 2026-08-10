"use client";

import CartItems from "../../cart/CartItems";
import Button from "../../ui/Button";
import { CartItem } from "@/app/types/interface";

interface BagStepProps {
  items: CartItem[];
  onContinue: () => void;
}

export default function BagStep({ items, onContinue }: BagStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
          Your bag
        </h1>
        <p className="mt-1 text-[14px] text-ink/55">
          Review your items before checkout. Quantities can be adjusted from the summary panel.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line py-16 text-center">
          <p className="text-[15px] font-medium text-ink">Your bag is empty</p>
          <p className="mt-1 text-[13px] text-ink/50">Add items to continue to checkout.</p>
        </div>
      ) : (
        <>
        <CartItems />
        <Button className="p-2 bg-orange-400" onClick={onContinue} fullWidth>
          Continue to delivery
        </Button>
        </>
      )}
    </div>
  );
}
