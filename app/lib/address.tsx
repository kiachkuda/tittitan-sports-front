
import { Address } from "../types/interface";

let API_URL = ""

if(process.env.NODE_ENV === "development"){
  API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
}else{
  API_URL = process.env.API_URL || "https://titan-sportke.onrender.com/api/v1";
}


export async function createAddress(address: Address) {
    try {
        const response = await fetch(`${API_URL}/address`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(address),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export async function getAddress() {

    try {
        const response = await fetch(`${API_URL}/address`, {
            method: "GET",
            credentials: "include",
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }

}