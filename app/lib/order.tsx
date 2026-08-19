
import { CartItem } from "../types/interface";
export type Orders = {
  address_id:number,
  items : CartItem[]
}



let base_url = `${process.env.NEXT_PUBLIC_API_URL}`
export async function createOrder(order: any) {
  try {
    const response = await fetch(`${base_url}/orders`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`,
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

export async function getOrderStatus(id:string) {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`,
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