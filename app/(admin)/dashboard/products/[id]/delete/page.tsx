"use client"
import { deleteProductById } from "@/app/lib/product";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteProduct() {

    const id = useParams();
    const router = useRouter();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const deleteProduct = async () => {
             const isDeleted = await deleteProductById(Number(id), token)
             if (isDeleted) {
                router.push("/dashboard/products");
             }
             router.push("/dashboard/products");
        }
        deleteProduct();
    }, [router, id]);


}