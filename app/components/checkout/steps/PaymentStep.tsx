"use client";

import { PAYMENT_METHODS } from "@/app/types/constants";
import { useMemo, useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import RadioCard from "../../ui/RadioCard";
import { CardDetails, PaymentMethodId } from "@/app/types/interface";


interface PaymentStepProps {
  paymentMethodId: string;
  card: CardDetails;
  onPaymentMethodChange: (id: PaymentMethodId) => void;
  onCardChange: (card: CardDetails) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function PaymentStep({
  paymentMethodId,
  card,
  onPaymentMethodChange,
  onCardChange,
  onBack,
  onContinue,
}: PaymentStepProps) {
  const [submitted, setSubmitted] = useState(false);
  const isCard = paymentMethodId === "card";
  const [mpesa, setMpesa] = useState("");

  const errors = useMemo(() => {
    if (!isCard || !submitted || !mpesa) {return {mpesa:mpesa}};
    const e: Partial<Record<keyof CardDetails, string>> = {};
    if (!/^\d{16}$/.test(card.number.replace(/\s/g, ""))) e.number = "Enter a valid 16-digit card number";
    if (!card.name) e.name = "Enter the name on card";
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "Use MM/YY format";
    if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "Enter a valid CVC";
   
    return e;
  }, [isCard, submitted, card]);

  const isValid = !isCard || Object.keys(errors).length === 0;

  function handleContinue() {
    setSubmitted(true);
    if (!isCard || (card.number && card.name && card.expiry && card.cvc && isValid)) {
      onContinue();
    }
  }

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
          Payment
        </h1>
        <p className="mt-1 text-[14px] text-ink/55">
          Choose how you'd like to pay. Your details are only used for this order.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        {PAYMENT_METHODS.map((method) => (
          <>
            <RadioCard
              key={method.id}
              name="payment-method"
              value={method.id}
              checked={paymentMethodId === method.id}
              onChange={(id) => onPaymentMethodChange(id as PaymentMethodId)}
              title={method.name}
              subtitle={method.description}
            />
            {paymentMethodId === method.id &&

              <Input
                label="mpesa number"


              />
            }

          </>
        ))}

      </section>

      {isCard && (
        <section className="grid grid-cols-1 gap-4 rounded-lg border border-line p-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Card number"
              inputMode="numeric"
              value={card.number}
              onChange={(e) => onCardChange({ ...card, number: formatCardNumber(e.target.value) })}
              error={errors.number}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Name on card"
              value={card.name}
              onChange={(e) => onCardChange({ ...card, name: e.target.value })}
              error={errors.name}
              placeholder="Jane Doe"
            />
          </div>
          <Input
            label="Expiry date"
            value={card.expiry}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
              const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
              onCardChange({ ...card, expiry: formatted });
            }}
            error={errors.expiry}
            placeholder="MM/YY"
          />
          <Input
            label="CVC"
            inputMode="numeric"
            value={card.cvc}
            onChange={(e) => onCardChange({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
            error={errors.cvc}
            placeholder="123"
          />
        </section>
      )}

      {paymentMethodId === "mobile-money" && (
        <p className="rounded-lg bg-accent-soft px-4 py-3 text-[13.5px] text-ink/70">
          You'll get a payment prompt on your phone once you place the order.
        </p>
      )}

      {paymentMethodId === "cod" && (
        <p className="rounded-lg bg-accent-soft px-4 py-3 text-[13.5px] text-ink/70">
          Have the exact amount ready for the courier on delivery.
        </p>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue} fullWidth>
          Review order
        </Button>
      </div>
    </div>
  );
}
