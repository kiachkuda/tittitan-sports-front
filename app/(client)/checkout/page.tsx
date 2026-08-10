"use client"
import CheckoutFlow from "@/app/components/checkout/CheckoutFlow";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function CheckoutPage() {
  const auth = useAuth();
  const user = auth.user;
  const loading = auth.loading;
  const router = useRouter();

  useEffect(()=>{
    if(!user && !loading) {
      router.push("/login")
    }
  })

  return (
    <main className="min-h-screen bg-paper">
      <CheckoutFlow />
    </main>
  );
}
