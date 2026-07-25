"use client"
import { deleteProductById } from "@/app/lib/product";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteProduct() {

    const id = useParams();
    const router = useRouter();

    useEffect(() => {
        const deleteProduct = async () => {
            const deleted = await deleteProductById(Number(id))

            if(deleted) {
                router.push('/dashboard/products')
            }
        }
    })


}