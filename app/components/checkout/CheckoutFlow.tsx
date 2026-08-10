"use client";

import { useEffect, useMemo, useState } from "react";
import Stepper from "./Stepper";
import OrderSummary from "./OrderSummary";
import BagStep from "./steps/BagStep";
import DeliveryStep from "./steps/DeliveryStep";
import PaymentStep from "./steps/PaymentStep";
import ReviewStep from "./steps/ReviewStep";
import ConfirmationStep from "./steps/ConfirmationStep";

import { calculatePriceBreakdown, DELIVERY_METHODS, generateOrderNumber } from "@/app/types/constants";
import { Address, DeliveryMethodId, StepId } from "@/app/types/interface";
import { CheckoutState } from "@/app/types/interface";

import { useCart } from "@/contexts/CartProvider";
import { createAddress } from "@/app/lib/address";
import { useAuth } from "@/contexts/AuthProvider";
import { createPayment } from "@/app/lib/payment";

const STEP_ORDER: StepId[] = ["bag", "delivery", "payment", "review", "confirmed"];




export default function CheckoutFlow() {

  const cart = useCart();
  const auth = useAuth();

  const user = auth.user;

  

  const cartItems = cart.cartItems;
  const total =cart.subtotal;


const initialState: CheckoutState = {
  step: "bag",
  promoCode: "",
  promoApplied: false,
  addressId: "",
  newAddress : {} as Address,
  usingNewAddress: false,
  deliveryMethodId: "standard" as DeliveryMethodId,
  paymentMethodId: "mpesa",
  card: { number: "", name: "", expiry: "", cvc: "" },
  mpesaNumber:"",
  totalPrice:total,
  orderNumber: null,
};

  const [state, setState] = useState<CheckoutState>(initialState);
  const [furthestStepIndex, setFurthestStepIndex] = useState(0);

  const deliveryMethod = DELIVERY_METHODS.find((m) => m.id === state.deliveryMethodId)!;

  const breakdown = useMemo(
    () => calculatePriceBreakdown(cartItems, deliveryMethod.price, state.promoApplied),
    [cartItems, deliveryMethod.price, state.promoApplied]
  );

  function goTo(step: StepId) {
    const index = STEP_ORDER.indexOf(step);
    setFurthestStepIndex((prev) => Math.max(prev, index));
    setState((s) => ({ ...s, step }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateQuantity(id: string, quantity: number) {
    setState((s) => ({
      ...s,
      items: cartItems.map((item) => ( (item.product_id).toString() === id ? { ...item, quantity } : item)),
    }));
  }

  function removeItem(id: string) {
    setState((s) => ({ ...s, items: cartItems.filter((item) => (item.product_id).toString() !== id) }));
  }

  function applyPromo() {
    if (state.promoCode.trim().length > 0) {
      setState((s) => ({ ...s, promoApplied: true }));
    }
  }

  async function placeOrder() {
    const orderNumber = generateOrderNumber();
    setState((s) => ({ ...s, orderNumber }));

    const payload = {
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      address: state.usingNewAddress ? state.newAddress : { addressId: state.addressId },
      deliveryMethodId: state.deliveryMethodId,
      paymentMethodId: state.paymentMethodId,
      mpesaNumber: state.paymentMethodId === "mpesa" ? state.mpesaNumber : undefined,
      card:
        state.paymentMethodId === "card"
          ? { ...state.card, number: state.card.number.replace(/\s/g, "").slice(-4) } // never send full PAN to your own logs/back end unless it's actually PCI-handled
          : undefined,
      promoCode: state.promoApplied ? state.promoCode : undefined,
      totals: breakdown,
    };

    let addressId;
    if(state.usingNewAddress){
      const addRes = await createAddress(state.newAddress);
      addressId = addRes.data.address_id; 
    }

    const payment = createPayment({
      phone:state.mpesaNumber
    })

     const data = {
      address_id: addressId,
      items: cartItems.map((item) => ({
        variant_id: item.size, 
        quantity: item.quantity,
      })),
    };
    

    goTo("confirmed");
  }

  if (state.step === "confirmed" && state.orderNumber) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <ConfirmationStep
          orderNumber={state.orderNumber}
          total={breakdown.total}
          deliveryMethod={deliveryMethod}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <div className="mb-10 max-w-2xl">
        <Stepper
          currentStep={state.step}
          onStepClick={goTo}
          furthestStepIndex={furthestStepIndex}
        />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="max-w-2xl">
          {state.step === "bag" && (
            <BagStep items={cartItems} onContinue={() => goTo("delivery")} />
          )}

          {state.step === "delivery" && (
            <DeliveryStep
              addressId={state.addressId}
              usingNewAddress={state.usingNewAddress}
              newAddress={state.newAddress}
              deliveryMethodId={state.deliveryMethodId}
              onAddressSelect={(id) =>
                setState((s) => ({ ...s, addressId: id, usingNewAddress: false }))
              }
              onUseNewAddress={() => setState((s) => ({ ...s, usingNewAddress: true }))}
              onNewAddressChange={(newAddress:Address) => setState((s) => ({ ...s, newAddress }))}
              onDeliveryMethodChange={(deliveryMethodId) =>
                setState((s) => ({ ...s, deliveryMethodId }))
              }
              onBack={() => goTo("bag")}
              onContinue={() => goTo("payment")}
            />
          )}

          {state.step === "payment" && (
            <PaymentStep
              mpesaNumber={state.mpesaNumber}
              paymentMethodId={state.paymentMethodId}
              card={state.card}
              onMpesaNumberChange={(mpesaNumber) => setState((s) => ({ ...s, mpesaNumber }))}
              onPaymentMethodChange={(paymentMethodId) =>
                setState((s) => ({ ...s, paymentMethodId }))
              }
              onCardChange={(card) => setState((s) => ({ ...s, card }))}
              onBack={() => goTo("delivery")}
              onContinue={() => goTo("review")}
            />
          )}

          {state.step === "review" && (
            <ReviewStep
              addressId={state.addressId}
              usingNewAddress={state.usingNewAddress}
              newAddress={state.newAddress}
              deliveryMethodId={state.deliveryMethodId}
              paymentMethodId={state.paymentMethodId}
              mpesaNumber={state.mpesaNumber}
              totalPrice={total}
              card={state.card}
              onEditStep={goTo}
              onBack={() => goTo("payment")}
              onPlaceOrder={placeOrder}
            />
          )}
        </div>

        <OrderSummary
          items={cartItems}
          breakdown={breakdown}
          promoCode={state.promoCode}
          promoApplied={state.promoApplied}
          onPromoCodeChange={(promoCode) => setState((s) => ({ ...s, promoCode }))}
          onApplyPromo={applyPromo}
          editableItems={state.step === "bag"}
          onQuantityChange={updateQuantity}
          onRemoveItem={removeItem}
        />
      </div>
    </div>
  );
}
