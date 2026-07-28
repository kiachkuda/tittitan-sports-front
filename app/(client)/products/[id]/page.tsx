"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  ChevronRight,
} from "lucide-react";
import { SingleProduct } from "@/app/types/interface";
import { getProductById } from "@/app/lib/product";
import { useParams } from "next/navigation";



export default function ProductPage() {
  
    const [product, setProduct] = useState<SingleProduct>();
    const param = useParams();



    useEffect( ()=> {
      
        const getproduct = async (id : number)=>{
            const data = await getProductById(id);
            setProduct(data)
        }

        getproduct(Number(param.id));
    }, [])


}

function TrustCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gray-100 p-4">
      <div className="text-red-600">{icon}</div>
      <span className="font-medium">{title}</span>
    </div>
  );
}