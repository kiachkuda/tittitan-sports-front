"use client"
import CheckoutFlow from "@/app/components/checkout/CheckoutFlow";
import { getAddress } from "@/app/lib/address";
import { SAVED_ADDRESSES } from "@/app/types/constants";
import { Address } from "@/app/types/interface";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function CheckoutPage() {
  const auth = useAuth();
  const user = auth.user;
  const loading = auth.loading;
  const router = useRouter();
  const [addressess, setAddressess] = useState<Address[]>(SAVED_ADDRESSES);

  useEffect(()=>{

    if(!user && !loading) {
      router.push("/login")
    }

    
        const getUserAddress = async ()=>{
            const data = await getAddress();
            console.log(data) 
            setAddressess(data.data)
          }
          getUserAddress();
      

  },[])

  return (
    <main className="min-h-screen bg-paper">
      <CheckoutFlow savedAddress={addressess} />
    </main>
  );
}
