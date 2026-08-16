"use client";

import { useEffect, useMemo, useState } from "react";
import Stepper from "./Stepper";
import OrderSummary from "./OrderSummary";
import BagStep from "./steps/BagStep";
import DeliveryStep from "./steps/DeliveryStep";
import PaymentStep from "./steps/PaymentStep";
import ReviewStep from "./steps/ReviewStep";
import ConfirmationStep from "./steps/ConfirmationStep";

import { calculatePriceBreakdown, DELIVERY_METHODS, generateOrderNumber, SAVED_ADDRESSES } from "@/app/types/constants";
import { Address, DeliveryMethodId, StepId } from "@/app/types/interface";
import { CheckoutState } from "@/app/types/interface";

import { useCart } from "@/contexts/CartProvider";
import { createAddress, getAddress } from "@/app/lib/address";
import { useAuth } from "@/contexts/AuthProvider";
import { createPayment } from "@/app/lib/payment";
import { createOrder } from "@/app/lib/order";
import { address } from "framer-motion/client";

const STEP_ORDER: StepId[] = ["bag", "delivery", "payment", "review", "confirmed"];




export default function CheckoutFlow(props:{savedAddress:Address[]}) {

  const cart = useCart();
  const auth = useAuth();

  const user = auth.user;

  

  const cartItems = cart.cartItems;
  const total =cart.subtotal;

  const [selectedId, setSelectedId] = useState<string>();
 


const [savedAdd, setSavedAdd] = useState<Address[]>(SAVED_ADDRESSES)
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

 useEffect(()=>{
  const saved = async()=>{
    let data = await getAddress();
    setSavedAdd(data.data)
    console.log("data")
    setState((s)=>({...s, }))
  }
  saved();
 },[])

  function goTo(step: StepId) {
    const index = STEP_ORDER.indexOf(step);
    setFurthestStepIndex((prev) => Math.max(prev, index));
    setState((s) => ({ ...s, step }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }



  function applyPromo() {
    if (state.promoCode.trim().length > 0) {
      setState((s) => ({ ...s, promoApplied: true }));
    }
  }

  async function placeOrder() {
    const orderNumber = generateOrderNumber();
    setState((s) => ({ ...s, orderNumber }));

   

    let addressId;
    if(state.usingNewAddress){
      const addRes = await createAddress(state.newAddress);
      addressId = addRes.data.address_id; 
    }else{
      addressId = selectedId;
    }

    const payment = createPayment({
      phone:state.mpesaNumber
    })
    console.log(cartItems)
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
      totals: state.totalPrice,
    };
    
     const data = {
      address_id: addressId,
      items: cartItems.map((item) => ({
        variant_id: item.variant_id, 
        quantity: item.quantity,
        subtotal: (item.quantity * item.price + item.printing_cost),
        product_name: item.product_name,
        printing_cost:item.printing_cost,
      })),
      subtotal:breakdown.subtotal,
      shipping_cost: breakdown.shipping,
      total_amount:breakdown.total
    };
     console.log(breakdown)
     createOrder(data);

    
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
              savedAddress={savedAdd}
              usingNewAddress={state.usingNewAddress}
              newAddress={state.newAddress}
              deliveryMethodId={state.deliveryMethodId}
              onAddressSelect={
                (id) => {setSelectedId(id); setState((s) => ({...s, addressId:id, usingNewAddress: false})); }
                
              
              }
              onUseNewAddress={() => { setState((s) => ({ ...s, usingNewAddress: true }));  }}
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
              savedAddress={savedAdd}
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
          onQuantityChange={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
        />
      </div>
    </div>
  );
}
