import { formatCurrency, PAYMENT_METHODS } from "@/app/types/constants";
import { Smartphone, Check, ShieldCheck, ChevronRight } from "lucide-react";
import { SetStateAction, useState } from "react";

export default function PaymentMethod(){
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
    
      const handleMethodChange = (method: SetStateAction<string>) => {
        setSelectedMethod(method);
        setPhone("");
      };
    
       const handlePayment = async () => {
    if (!phone.trim()) {
      alert("Please enter your mobile phone number.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log({
        payment_method: selectedMethod,
        phone_number: phone,
      });

      // Call your payment API here
      //
      // await fetch("/api/v1/payments", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     order_id: orderId,
      //     payment_method: selectedMethod,
      //     phone_number: phone,
      //   }),
      // });

    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

    return
    (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Payment methods */}
          <div className="rounded-2xl border border-[#1B1F3B]/10 bg-white p-5 sm:p-7">

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B1F3B] text-white">
                <Smartphone size={18} />
              </div>

              <div>
                <h2 className="font-bold">
                  Payment method
                </h2>

                <p className="text-xs text-[#3A3F63]/60">
                  Choose one of the available payment options
                </p>
              </div>
            </div>

            <div className="space-y-3">

              {PAYMENT_METHODS.map((method) => {
                const selected = selectedMethod === method.id;

                return (
                  <div
                    key={method.id}
                    className={`
                      overflow-hidden rounded-xl border-2 transition-all
                      ${
                        selected
                          ? "border-[#E8437B] bg-[#E8437B]/5"
                          : "border-[#1B1F3B]/10 bg-white hover:border-[#1B1F3B]/20"
                      }
                    `}
                  >

                    {/* Method */}
                    <button
                      type="button"
                      onClick={() =>
                        handleMethodChange(method.id)
                      }
                      className="flex w-full items-center gap-4 p-4 text-left"
                    >
                      {/* Radio */}
                      <span
                        className={`
                          flex h-5 w-5 shrink-0 items-center justify-center
                          rounded-full border-2
                          ${
                            selected
                              ? "border-[#E8437B] bg-[#E8437B]"
                              : "border-[#1B1F3B]/25"
                          }
                        `}
                      >
                        {selected && (
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="text-white"
                          />
                        )}
                      </span>

                      {/* Logo */}
                      <span
                        className={`
                          flex h-11 w-11 shrink-0 items-center
                          justify-center rounded-lg text-xs
                          font-black text-white
                          ${method.color}
                        `}
                      >
                        {method.id === "mpesa"
                          ? "M"
                          : method.id === "kcb"
                          ? "KCB"
                          : "E"}
                      </span>

                      {/* Details */}
                      <span className="flex-1">
                        <span className="block text-sm font-bold">
                          {method.name}
                        </span>

                        <span className="mt-0.5 block text-xs text-[#3A3F63]/60">
                          {method.description}
                        </span>
                      </span>

                      {selected && (
                        <Check
                          size={18}
                          className="text-[#E8437B]"
                        />
                      )}
                    </button>

                    {/* Hidden phone field */}
                    {selected && (
                      <div className="border-t border-[#E8437B]/10 px-4 pb-5 pt-4">
                        <label
                          htmlFor={`${method.id}-phone`}
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#3A3F63]"
                        >
                          Mobile phone number
                        </label>

                        <div className="relative">
                          <Smartphone
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3A3F63]/40"
                          />

                          <input
                            id={`${method.id}-phone`}
                            type="tel"
                            inputMode="numeric"
                            placeholder={method.placeholder}
                            value={phone}
                            onChange={(e) =>
                              setPhone(e.target.value)
                            }
                            className="w-full rounded-lg border border-[#1B1F3B]/15 bg-[#F7F4EE] py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#E8437B]"
                          />
                        </div>

                        <p className="mt-2 text-xs text-[#3A3F63]/60">
                          Enter the mobile number registered with{" "}
                          {method.name}.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

            {/* Security notice */}
            <div className="mt-6 flex gap-3 rounded-xl bg-[#F7F4EE] p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-[#3AA655]"
              />

              <div>
                <p className="text-xs font-bold">
                  Secure payment
                </p>

                <p className="mt-1 text-xs leading-5 text-[#3A3F63]/60">
                  Your payment information is securely processed.
                  We do not store your mobile banking PIN.
                </p>
              </div>
            </div>

            {/* Pay button */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={isProcessing || !phone.trim()}
              className={`
                mt-6 flex w-full items-center justify-center
                gap-2 rounded-xl px-5 py-4 text-sm font-bold
                text-white transition-all
                ${
                  !isProcessing && phone.trim()
                    ? "bg-[#E8437B] hover:-translate-y-0.5 hover:bg-[#D6376C] hover:shadow-lg"
                    : "cursor-not-allowed bg-[#1B1F3B]/15"
                }
              `}
            >
              {isProcessing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </>
              ) : (
                <>
                  Pay {formatCurrency(total)}
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
    )
}