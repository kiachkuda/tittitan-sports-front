

import { Product } from "@/app/types/interface";
import {useRouter} from "next/navigation"



export async function createProduct(product: Product) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/products`, {
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
      `${process.env.NEXT_PUBLIC_API_URI}/products?${query.toString()}`,
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/products/${id}`, {
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
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/products/${id}`, {
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
