

import { Product } from "@/app/types/interface";
import {useRouter} from "next/navigation"



const API_URL = "http://localhost:5000/api/v1"; 


export async function createProduct(product: Product) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}


export const  getProductById = async( id: number) => {
  try{
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Error fetching product:", error);
    throw error;
  }
}

export const  deleteProductById = async( id: number) => {

  let isDeleted = true;

  try{
     const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if(!data){
      isDeleted = false;
    }

    return isDeleted;

  }catch(error){
    console.error("Error Deleting product:", error);
    throw error;
  }
}

// const countProduct = async (id: number) => {
//   try {
//     const response = await fetch(`${API_URL}/products/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to fetch products (${response.status})`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// }
