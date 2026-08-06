import { useRouter } from "next/dist/client/components/navigation";


let API_URL = ""

if(process.env.NODE_ENV === "development"){
  API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
}else{
  API_URL = process.env.API_URL || "https://titan-sportke.onrender.com/api/v1";
}


export async function getAllCategories() {
  try {
    
    const response = await fetch(
      `${API_URL}/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories (${response.status})`);
    }

    

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
