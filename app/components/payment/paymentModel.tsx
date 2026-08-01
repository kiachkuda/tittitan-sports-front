"use client";

import { useCart } from "@/contexts/CartProvider";
import { CreditCard, Phone, User, Hash } from "lucide-react";

export default function MpesaPaymentForm() {

    const {subtotal} = useCart();
  return (
    <div className="max-w-lg mx-auto rounded-2xl border border-gray-200 bg-white shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <CreditCard className="w-6 h-6 text-green-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            M-Pesa Payment
          </h2>
          <p className="text-sm text-gray-500">
            Enter your payment details below.
          </p>
        </div>
      </div>

      <form className="space-y-5">
        
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">
            M-Pesa Phone Number
          </label>

          <div className="flex items-center rounded-xl border px-4 h-12 focus-within:ring-2 focus-within:ring-green-500">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="tel"
              placeholder="07XXXXXXXX"
              className="flex-1 outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount Paid (KES)
          </label>

          <div className="flex items-center rounded-xl border px-4 h-12 focus-within:ring-2 focus-within:ring-green-500">
            <span className="font-semibold text-gray-600 mr-2">KES</span>

            <input
              type="number"
              placeholder={subtotal.toString()}
              className="flex-1 outline-none bg-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Confirm Payment
        </button>
      </form>

      <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
        <h3 className="font-semibold text-green-700 mb-2">
          Payment Instructions
        </h3>

        <ol className="text-sm text-gray-600 space-y-2 list-decimal ml-5">
          <li>Open the M-Pesa app or SIM Toolkit.</li>
          <li>Choose <strong>Lipa na M-Pesa</strong>.</li>
          <li>Enter the Paybill or Till Number.</li>
          <li>Complete the payment.</li>
          <li>Paste the confirmation code above.</li>
        </ol>
      </div>
    </div>
  );
}