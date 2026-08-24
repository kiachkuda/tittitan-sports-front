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
  savedAddress:Address[];
  newAddress: Address;
  deliveryMethodId: DeliveryMethodId;
  paymentMethodId: PaymentMethodId;
  totalPrice: number;
  mpesaNumber:string; 
  card: CardDetails;
  onEditStep: (step: StepId) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function ReviewStep({
  addressId,
  savedAddress,
  usingNewAddress,
  newAddress,
  deliveryMethodId,
  paymentMethodId,
  mpesaNumber,
  totalPrice,
  card,
  onEditStep,
  onBack,
  onPlaceOrder,
}: ReviewStepProps) {
  const [placing, setPlacing] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
 

  function handlePlaceOrderClick() {
    setConfirmOpen(true);
  }

  const address = usingNewAddress
  ? newAddress
  : savedAddress.find((a) => (a.address_id).toString() === addressId);
  const deliveryMethod = DELIVERY_METHODS.find((m) => m.id === deliveryMethodId)!;
  const paymentMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethodId)!;

  console.log(savedAddress)
  console.log(addressId)
  console.log(address)

  function handlePlaceOrder() {
    setPlacing(true);
    
  }

  function confirmAndPlace() {
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
        <div className="grid sm:grid-cols-2">
          <div className="p-2 bg-gray-100 my-2">
            <p className="text-[15px] uppercase font-medium text-ink">FirstName: {address?.first_name}</p>
          </div>
          <div className="p-2 bg-gray-100  my-2">
            <p className="text-[14px] uppercase font-medium text-ink">LastName: {address?.last_name}</p>
          </div>
  <div className="p-2 bg-gray-100  my-2">
            <p className="text-[14px] font-medium uppercase text-ink">Phone Number: {address?.phone_number}</p>
          </div>
          <div className="p-2 bg-gray-100  my-2">
            <p className="text-[13.5px] uppercase text-ink/55">
            Address: {address?.county}, {address?.city} , {address?.street_address}</p>
            <p className="text-[13.5px] uppercase text-ink/55">
               {address?.landmark && <>{`${address.landmark},`}</>} {address?.apartment  && <>{`${address.apartment},`}</>}
            </p>
          </div>          
         
        </div>

      </ReviewCard>

       <ReviewCard  title="Payment" onEdit={() => onEditStep("payment")}>
         {paymentMethodId === "mpesa" && (
    <p className="text-lg font-mono text-ink/70">
      M-Pesa: {mpesaNumber}
    </p>
  )}
        {paymentMethodId === "card" && card.number && (
          <p className="font-mono text-[13.5px] text-ink/55">
            Card ending {card.number.replace(/\s/g, "").slice(-4)}
          </p>
        )}
      </ReviewCard>

      <ReviewCard title="Delivery method" onEdit={() => onEditStep("delivery")}>
        <p className="text-[14px] font-medium text-ink">{deliveryMethod.label}</p>
        <p className="text-[13.5px] text-ink/55">{deliveryMethod.etaLabel}</p>
      </ReviewCard>

     

      <div className="flex gap-3">
        <Button className="bg-[#000022] text-white p-2 hover:bg-[#000055]" onClick={onBack} disabled={placing}>
          Back
        </Button>
        <Button className="p-2 bg-orange-400" onClick={handlePlaceOrderClick} fullWidth disabled={placing}>
          {placing ? "Placing order…" : "Place order"}
        </Button>
      </div>

        {
          confirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
            <h2 className="font-display text-[18px] font-bold text-ink">
              Confirm payment
            </h2>
            <p className="mt-2 text-[14px] text-ink/70">
              You're about to pay{" "}
              <span className="font-medium text-ink">
                KES {totalPrice.toLocaleString()}
              </span>{" "}
              via <span className="font-medium text-ink">{paymentMethodId}</span>.
            </p>
            {paymentMethodId === "mpesa" && (
              <p className="mt-2 text-[13px] text-ink/55">
                You'll receive an M-Pesa prompt on your phone to complete this payment.
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                className="bg-[#000022] text-white"
                onClick={() => setConfirmOpen(false)}
                disabled={placing}
              >
                Cancel
              </Button>
              <Button onClick={confirmAndPlace} fullWidth disabled={placing}>
                {placing ? "Placing order…" : "Yes, pay now"}
              </Button>
            </div>
          </div>
        </div>
          )
        }

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
        <h2 className="text-[18px] font-semibold uppercase tracking-wide text-ink/45">
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
