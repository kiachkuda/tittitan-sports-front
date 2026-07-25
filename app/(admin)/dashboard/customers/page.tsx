"use client"
import { getUsers } from "@/app/lib/users"
import { User } from "@/app/types/interface"
import { useEffect, useState } from "react"


export default function CustomerPage() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(()=>{
        const getusers = async () => {
            try {
                 const data = await getUsers();
            setUsers(data.results);
             console.log(data)
            } catch (error) {
                throw error
            }
           
        }

        getusers();
        console.log("users", users)
       
    },[])
    return (
        <>
        <h1>Customer Page</h1>

        {users.map((user) =>
            <div key={user.user_id}>{user.first_name}</div>
        )}

        </>
    )

}