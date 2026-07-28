"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Variant } from "@/app/types/interface";


type ProductInfoProps = {
  title: string;
  price: number;
  description?: string;
  variants: Variant[];
};

export default function ProductInfo({
  title,
  price,
  description,
  variants,
}: ProductInfoProps) {
 
    console.log(variants)

  const sizes = [...new Set(variants.map((v) => v.size))];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const selectedVariant = variants.find(
    (v) => v.size === selectedSize
  );

  

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>

        {/* <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="ml-1 font-medium">{rating}</span>
          </div>

          <span className="text-gray-400">•</span>

          <span className="text-gray-600">
            {reviewCount} Reviews
          </span>
        </div> */}
      </div>

      {/* Price */}
      <div>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-red-600">
            ${price.toFixed(2)}
          </span>

          
        </div>

        <p className="mt-2 text-green-600 font-medium">
          {selectedVariant?.stock_quantity
            ? `${selectedVariant.stock_quantity} items in stock`
            : "Out of Stock"}
        </p>
      </div>

      

      {/* Size */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">
          Size
        </h3>

        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => {
            const available = variants.some(
              (v) =>
               
                v.size === size &&
                v.stock_quantity > 0
            );

            return (
              <button
                key={size}
                disabled={!available}
                onClick={() => setSelectedSize(size)}
                className={`h-12 min-w-12 rounded-xl border px-5 font-medium transition ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                } ${
                  !available &&
                  "cursor-not-allowed opacity-40 line-through"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}