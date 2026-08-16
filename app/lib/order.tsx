
import { CartItem } from "../types/interface";
export type Orders = {
  address_id:number,
  items : CartItem[]
}

let API_URL = ""

if(process.env.NODE_ENV === "development"){
  API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
}else{
  API_URL = process.env.API_URL || "https://titan-sportke.onrender.com/api/v1";
}

export async function createOrder(order: any) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const response = await fetch(`${API_URL}/orders`,
      {
        method: "GET",
        credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },

      }
    )

    
    return response.json();

  } catch (error) {
    
  }
}