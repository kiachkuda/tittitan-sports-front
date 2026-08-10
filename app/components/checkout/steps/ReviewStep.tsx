"use client";

import { DELIVERY_METHODS, PAYMENT_METHODS, SAVED_ADDRESSES } from "@/app/types/constants";
import { CardDetails, DeliveryMethodId, PaymentMethodId } from "@/app/types/interface";
import { Address } from "@/app/types/interface";
import { StepId } from "@/app/types/interface";
import { useState } from "react";
import Button from "../../ui/Button";


interface ReviewStepProps {
  addressId: string | null;
  usingNewAddress: boolean;
  newAddress: Partial<Address>;
  deliveryMethodId: DeliveryMethodId;
  paymentMethodId: PaymentMethodId;
  card: CardDetails;
  onEditStep: (step: StepId) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function ReviewStep({
  addressId,
  usingNewAddress,
  newAddress,
  deliveryMethodId,
  paymentMethodId,
  card,
  onEditStep,
  onBack,
  onPlaceOrder,
}: ReviewStepProps) {
  const [placing, setPlacing] = useState(false);

  const address = usingNewAddress
    ? newAddress
    : SAVED_ADDRESSES.find((a) => a.address_id === addressId);
  const deliveryMethod = DELIVERY_METHODS.find((m) => m.id === deliveryMethodId)!;
  const paymentMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethodId)!;

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(onPlaceOrder, 900);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
          Review your order
        </h1>
        <p className="mt-1 text-[14px] text-ink/55">
          Confirm everything looks right before you place the order.
        </p>
      </div>

      <ReviewCard title="Shipping address" onEdit={() => onEditStep("delivery")}>
        <p className="text-[14px] font-medium text-ink">{address?.firstname}</p>
        <p className="text-[13.5px] text-ink/55">
          {address?.street}, {address?.town}, {address?.county}
        </p>
        <p className="text-[13.5px] text-ink/55">{address?.phone}</p>
      </ReviewCard>

      <ReviewCard title="Delivery method" onEdit={() => onEditStep("delivery")}>
        <p className="text-[14px] font-medium text-ink">{deliveryMethod.label}</p>
        <p className="text-[13.5px] text-ink/55">{deliveryMethod.etaLabel}</p>
      </ReviewCard>

      <ReviewCard title="Payment" onEdit={() => onEditStep("payment")}>
        <p className="text-[14px] font-medium text-ink">{paymentMethod.name}</p>
        {paymentMethodId === "card" && card.number && (
          <p className="font-mono text-[13.5px] text-ink/55">
            Card ending {card.number.replace(/\s/g, "").slice(-4)}
          </p>
        )}
      </ReviewCard>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} disabled={placing}>
          Back
        </Button>
        <Button onClick={handlePlaceOrder} fullWidth disabled={placing}>
          {placing ? "Placing order…" : "Place order"}
        </Button>
      </div>
    </div>
  );
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink/45">
          {title}
        </h2>
        <button
          type="button"
          onClick={onEdit}
          className="text-[13px] font-medium text-accent hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
