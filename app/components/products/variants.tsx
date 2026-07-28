"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Variant } from "@/app/types/interface";
import { useEffect } from "react";



type Props = {
  variants: Variant[];  
};

export default function VariantSelector({
  variants,
}: Props) {

     console.log(variants)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Choose a Jersey</h2>

      <div className="space-y-5">
        {variants.map((variant) => (
         <div className="btn bg-black">XL</div>
        ))}
      </div>
    </div>
  );
}