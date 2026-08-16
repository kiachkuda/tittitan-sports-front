// lib/mpesa.ts

import {useRouter} from "next/navigation"


export async function createPayment(PaymentDetails: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mpesa/stkpush`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(PaymentDetails),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error processing payments:", error);
    throw error;
  }
}