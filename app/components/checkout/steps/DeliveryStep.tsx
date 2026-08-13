"use client";

import { DELIVERY_METHODS, formatCurrency, SAVED_ADDRESSES } from "@/app/types/constants";
import { Address, DeliveryMethodId} from "@/app/types/interface";
import { useEffect, useMemo, useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import RadioCard from "../../ui/RadioCard";
import { getAddress } from "@/app/lib/address";

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
  savedAddress: Address[]
}

export default function DeliveryStep({
  addressId,
  usingNewAddress,
  savedAddress,
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

    if (!newAddress.first_name) errors.first_name = "Enter the recipient's name";
    
    if (!newAddress.street_address) errors.street_address = "Enter a street_address address";
    if (!newAddress.county) errors.county = "Enter a county";
    if (!newAddress.county) errors.city = "Enter a Town to Delivery ";
    if (!newAddress.phone_number) errors.phone_number = "Enter a phone_number number";
    return errors;
  }, [usingNewAddress, newAddress, submitted]);

   

  const isValid = usingNewAddress
    ? Boolean(newAddress.first_name && newAddress.last_name && newAddress.street_address && newAddress.county && newAddress.phone_number)
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
        {savedAddress.map((addr) => (
          <RadioCard
            key={addr.address_id}
            name="address"
            value={`${(addr.address_id)?.toString()}`}
            checked={!usingNewAddress && addressId === addr.address_id}
            onChange={onAddressSelect}
            title={addr.first_name}
            subtitle={`${addr.street_address}, ${addr.city}, ${addr.county}`}
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
              value={newAddress.first_name ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, first_name: e.target.value })}
              error={newAddressErrors.first_name}
              placeholder="Jane Doe"
            />
            <Input
              label="Last name"
              value={newAddress.last_name ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, last_name: e.target.value })}
              error={newAddressErrors.last_name}
              placeholder="Jane Doe"
            />
            <Input
              label="Phone number"
              value={newAddress.phone_number ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, phone_number: e.target.value })}
              error={newAddressErrors.phone_number}
              placeholder="+254 700 000 000"
            />
            
            <Input
              label="County"
              value={newAddress.county ?? "Nairobi"}
              onChange={(e) => onNewAddressChange({ ...newAddress, county: e.target.value })}
              error={newAddressErrors.county}
              placeholder="Nairobi"
            />
            <Input
              label="City"
              value={newAddress.city ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, city: e.target.value })}
              placeholder="Kenya"
            />
            <div className="sm:col-span-2">
              <Input
                label="Street address"
                value={newAddress.street_address ?? ""}
                onChange={(e) => onNewAddressChange({ ...newAddress, street_address: e.target.value })}
                error={newAddressErrors.street_address}
                placeholder="Street, building, apartment"
              />
            </div>
             <Input
              label="Landmark"
              value={newAddress.landmark ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, landmark: e.target.value })}
              placeholder="Public School"
            />
             <Input
              label="Apartment/Building"
              value={newAddress.apartment ?? ""}
              onChange={(e) => onNewAddressChange({ ...newAddress, apartment: e.target.value })}
              placeholder="Block 5"
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
        <Button className="bg-[#000022] hover:bg-[#000055] text-white"  onClick={onBack}>
          Back
        </Button>
        <Button className="p-2 bg-orange-400" onClick={handleContinue} fullWidth>
          Continue to payment
        </Button>
      </div>
    </div>
  );
}
