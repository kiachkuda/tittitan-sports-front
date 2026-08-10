import { formatCurrency, PAYMENT_METHODS } from "@/app/types/constants";
import { ChevronRight } from "lucide-react";
import total from "../cart/total";
import { useState, SetStateAction } from "react";

export default function PaymentModal(props : {
    showPaymentModal: boolean, setShowPaymentModal: (arg0: boolean) => void
}) {

    const [selectedMethod, setSelectedMethod] = useState("mpesa");
        const [phone, setPhone] = useState("");
        const [isProcessing, setIsProcessing] = useState(false);
    
        // Example order information
        const subtotal = 6500;
        const shipping = 300;
        const discount = 0;
        const total = subtotal + shipping - discount;
    
        const selectedPayment = PAYMENT_METHODS.find(
            (method) => method.id === selectedMethod
        );
    
        
    
      
       

    return (
        <>
         {props.showPaymentModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1B1F3B]/10 px-6 py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#E8437B]">
            Payment
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#1B1F3B]">
            Complete your payment
          </h2>
        </div>

        <button
          type="button"
          onClick={() => props.setShowPaymentModal(false)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B1F3B]/5 text-[#1B1F3B]/60 transition hover:bg-[#1B1F3B]/10"
        >
          ✕
        </button>
      </div>

      {/* Payment method */}
      <div className="px-6 pt-6">

        <div className="flex items-center gap-3 rounded-xl bg-[#F7F4EE] p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1B1F3B] text-sm font-black text-[#F5A623]">
            {selectedMethod === "mpesa"
              ? "M"
              : selectedMethod === "kcb"
              ? "KCB"
              : "E"}
          </div>

          <div>
            <p className="text-sm font-bold text-[#1B1F3B]">
              {selectedPayment?.name}
            </p>

            <p className="text-xs text-[#3A3F63]/60">
              {phone}
            </p>
          </div>
        </div>

      </div>

      {/* Instructions */}
      <div className="px-6 py-6">

        <p className="mb-4 text-sm font-bold text-[#1B1F3B]">
          Follow these steps
        </p>

        {selectedMethod === "mpesa" && (
          <div className="space-y-3">

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                1
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Check your phone for the M-Pesa payment prompt.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                2
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Confirm that the amount displayed is{" "}
                <strong>{formatCurrency(total)}</strong>.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                3
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Enter your M-Pesa PIN on your phone to authorize
                the payment.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                4
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Wait for the payment confirmation before closing
                this page.
              </p>
            </div>

          </div>
        )}

        {selectedMethod === "kcb" && (
          <div className="space-y-3">

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                1
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Check your phone for the KCB payment prompt.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                2
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Confirm the payment amount shown on your phone.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                3
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Authorize the payment using your KCB mobile
                banking PIN.
              </p>
            </div>

          </div>
        )}

        {selectedMethod === "equity" && (
          <div className="space-y-3">

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                1
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Check your phone for the Equity payment prompt.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                2
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Confirm the payment amount displayed.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                3
              </span>

              <p className="text-sm leading-6 text-[#3A3F63]">
                Authorize the payment using your Equity mobile
                banking PIN.
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Amount */}
      <div className="mx-6 rounded-xl bg-[#1B1F3B] p-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">
            Amount to pay
          </span>

          <span className="text-lg font-bold text-[#F5A623]">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 px-6 py-6">

        <button
          type="button"
          onClick={() => props.setShowPaymentModal(false)}
          className="flex-1 rounded-xl border border-[#1B1F3B]/10 px-4 py-3 text-sm font-bold text-[#1B1F3B] transition hover:bg-[#F7F4EE]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={async () => {
            props.setShowPaymentModal(false);
            // Start your actual payment request here
            
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E8437B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#D6376C]"
        >
          I've got it
          <ChevronRight size={17} />
        </button>

      </div>

    </div>
  </div>
)}
        </>
    )
}