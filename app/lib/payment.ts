// lib/mpesa.ts

import {useRouter} from "next/navigation"

let API_URL = process.env.NODE_ENV === "development" 
      ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1" 
      : process.env.API_URL || "https://titan-sportke.onrender.com/api/v1";

export async function createPayment(PaymentDetails: any) {
  try {
    const response = await fetch(`${API_URL}/mpesa/stkpush`, {
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