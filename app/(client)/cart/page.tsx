"use client";

import Link from "next/link";
import Cart from "@/app/components/cart/Cart"
import clsx from "clsx";
import { useCart } from "@/contexts/CartProvider";


export default function CartPage() {

  const { cartItems } = useCart();

  return (
    <div className="min-h-screen w-full m-auto bg-gray-50 py-10 px-6 md:px-20">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      <Cart />
      <Link href="/checkout">
        <button
          type="button"
          disabled={cartItems.length === 0}
          className={clsx(
            "w-full rounded-full px-6 py-4 font-semibold transition",
            cartItems.length > 0
              ? "bg-black text-white hover:bg-neutral-800"
              : "cursor-not-allowed bg-neutral-200 text-neutral-400"
          )}
        >
          Continue to Checkout
        </button>
      </Link>
    </div>
  );
}
