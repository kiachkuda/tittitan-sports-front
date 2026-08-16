
import { Address } from "../types/interface";

let API_URL =
 "process.env.API_URL";



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
        console.error("Error creating Address:", error);
        throw error;
    }
}

export async function getAddress() {

    try {
        const response = await fetch(`${API_URL}/address`, {
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