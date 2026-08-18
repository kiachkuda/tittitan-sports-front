
import { Address } from "../types/interface";

const base_url = `${process.env.NEXT_PUBLIC_API_URL}`;



export async function createAddress(address: Address) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
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
        console.error("Error creating Address:", error);
        throw error;
    }
}

export async function getAddress() {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating Address:", error);
        throw error;
    }

}