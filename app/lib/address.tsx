import { API_URL } from "../types/constants";
import { Address } from "../types/interface";



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

        return response.json();
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }

}