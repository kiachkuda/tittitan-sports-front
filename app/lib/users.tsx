import { json } from "stream/consumers";
import { User } from "../types/interface";

const base_url = `${process.env.NEXT_PUBLIC_API_URL}`;


export async function getUsers() {
    try {
        const response = await fetch(`${base_url}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const users = response.json();
        return users;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createUser(user: User) {
    try {
        const response = await fetch(base_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        },
        )
        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}