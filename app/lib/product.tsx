

import { Product } from "@/app/types/interface";
import {useRouter} from "next/navigation"

let API_URL = ""

if(process.env.NODE_ENV === "development"){
  API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
}else{
  API_URL = process.env.API_URL || "https://titan-sportke.onrender.com/api/v1";
}


export async function createProduct(product: Product, token:any) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
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

export type ProductFilters = {
  page?: number;
  limit?: number;
  category?: string;
  team?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
};



export async function getAllProducts(filters: ProductFilters = {}) {
 
  try {
    const query = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, value.toString());
      }
    });

    const response = await fetch(
      `${API_URL}/products?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }

    

    return await response.json();
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

export const  deleteProductById = async( id: number, token:any) => {

  let isDeleted = false;

  try{
     const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization":`Bearer ${token}`
      }
    });
    const data = await response.json();

    if(data){
      isDeleted = true;
    }
    
    return isDeleted;

  }catch(error){
    console.error("Error Deleting product:", error);
    throw error;
  }
}

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${API_URL}/categories/products?category=${category}`, { 

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
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
