import CheckoutFlow from "@/app/components/checkout/CheckoutFlow";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <CheckoutFlow />
    </main>
  );
}
