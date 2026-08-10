"use client";

import { DELIVERY_METHODS, formatCurrency, SAVED_ADDRESSES } from "@/app/types/constants";
import { Address, DeliveryMethodId} from "@/app/types/interface";
import { useMemo, useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import RadioCard from "../../ui/RadioCard";

interface DeliveryStepProps {
  addressId: string | null;
  usingNewAddress: boolean;
  newAddress: Address;
  deliveryMethodId: string;
  onAddressSelect: (id: string) => void;
  onUseNewAddress: () => void;
  onNewAddressChange: (address: Address) => void;
  onDeliveryMethodChange: (id: DeliveryMethodId) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function DeliveryStep({
  addressId,
  usingNewAddress,
  newAddress,
  deliveryMethodId,
  onAddressSelect,
  onUseNewAddress,
  onNewAddressChange,
  onDeliveryMethodChange,
  onBack,
  onContinue,
}: DeliveryStepProps) {
  const [submitted, setSubmitted] = useState(false);

  const newAddressErrors = useMemo(() => {
    if (!usingNewAddress || !submitted) return {};
    const errors: Partial<Record<keyof Address, string>> = {};
    if (!newAddress.firstname) errors.firstname = "Enter the recipient's name";
    if (!newAddress.street) errors.street = "Enter a street address";
    if (!newAddress.county) errors.county = "Enter a city";
    if (!newAddress.phone) errors.phone = "Enter a phone number";
    return errors;
  }, [usingNewAddress, newAddress, submitted]);

  const isValid = usingNewAddress
    ? Boolean(newAddress.firstname && newAddress.lastname && newAddress.street && newAddress.county && newAddress.phone)
    : Boolean(addressId);

  function handleContinue() {
    setSubmitted(true);
    if (isValid) onContinue();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
          Delivery
        </h1>
        <p className="mt-1 text-[14px] text-ink/55">
          Choose where your order should go and how fast you need it.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink/45">
          Shipping address
        </h2>
        {SAVED_ADDRESSES.map((addr) => (
          <RadioCard
            key={addr.address_id}
            name="address"
            value={`${(addr.address_id)?.toString()}`}
            checked={!usingNewAddress && addressId === addr.address_id}
            onChange={onAddressSelect}
            title={addr.firstname}
            subtitle={`${addr.street}, ${addr.town}, ${addr.county}`}
          />
        ))}
        <RadioCard
          name="address"
          value="new"
          checked={usingNewAddress}
          onChange={onUseNewAddress}
          title="Deliver to a new address"
        />

        {usingNewAddress && (
          <div className="grid grid-cols-1 gap-4 rounded-lg border border-blue-900 border-line p-4 sm:grid-cols-2">
            <Input
              label="First name"
              value={newAddress.firstname ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, firstname: e.target.value })}
              error={newAddressErrors.firstname}
              placeholder="Jane Doe"
            />
            <Input
              label="Last name"
              value={newAddress.lastname ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, lastname: e.target.value })}
              error={newAddressErrors.lastname}
              placeholder="Jane Doe"
            />
            <Input
              label="Phone number"
              value={newAddress.phone ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, phone: e.target.value })}
              error={newAddressErrors.phone}
              placeholder="+254 700 000 000"
            />
            <div className="sm:col-span-2">
              <Input
                label="Street address"
                value={newAddress.street ?? ""}
                onChange={(e) => onNewAddressChange({ ...newAddress, street: e.target.value })}
                error={newAddressErrors.street}
                placeholder="Street, building, apartment"
              />
            </div>
            <Input
              label="County"
              value={newAddress.county ?? "Nairobi"}
              onChange={(e) => onNewAddressChange({ ...newAddress, county: e.target.value })}
              error={newAddressErrors.county}
              placeholder="Nairobi"
            />
            <Input
              label="Country"
              value={newAddress.town ?? "Nairobi"}
              onChange={(e) => onNewAddressChange({ ...newAddress, town: e.target.value })}
              placeholder="Kenya"
            />
          </div>
        )}
      </section>

      <section className="flex flex-col border p-4 rounded-lg border-blue-900 gap-3">
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink/45">
          Delivery method
        </h2>
        {DELIVERY_METHODS.map((method) => (
          <RadioCard
            key={method.id}
            name="delivery-method"
            value={method.id}
            checked={deliveryMethodId === method.id}
            onChange={(id) => onDeliveryMethodChange(id as DeliveryMethodId)}
            title={method.label}
            subtitle={`${method.description} · ${method.etaLabel}`}
            meta={method.price === 0 ? "Free" : formatCurrency(method.price)}
          />
        ))}
      </section>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button className="p-2 bg-orange-400" onClick={handleContinue} fullWidth>
          Continue to payment
        </Button>
      </div>
    </div>
  );
}
