
"use client"
import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";

import { useCart } from "@/contexts/CartProvider";
import Cart from "@/app/components/cart/Cart"
import CartItems from "@/app/components/cart/CartItems";
import Total from "@/app/components/cart/total";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import MpesaPaymentForm from "@/app/components/payment/paymentModel";

export default function Checkout() {
  const [method, setMethod] = useState("");
  const  {subtotal,cartItems} = useCart();
  const {user} = useAuth();
  const route = useRouter();

  useEffect( ()=> {

   
    
  },[])
  

  const renderFields = () => {
    switch (method) {
      case "paypal":
        return (
          <div className="grid gap-4 mt-4">
            <input
              type="email"
              placeholder="PayPal Email"
              className="border p-2 rounded-xl"
            />
          </div>
        );
      case "stripe":
        return (
          <div className="grid gap-4 mt-4">
            <input
              type="text"
              placeholder="Card Number"
              className="border p-2 rounded-xl"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="border p-2 rounded-xl"
            />
            <input
              type="text"
              placeholder="CVC"
              className="border p-2 rounded-xl"
            />
          </div>
        );
      case "mpesa":
        return (
          <div className="grid gap-4 mt-4">
            <input
              type="text"
              placeholder="Mpesa Phone Number"
              className="border p-2 rounded-xl"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row m-auto justify-center p-6 gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <CartItems />
 
        {/* Order Summary */}
         { cartItems.length > 0 ? (
        <Total />
         ) : <></>}
        
      </div>
      <div className="">
       <MpesaPaymentForm />
      </div>
    </div>
  );
}
