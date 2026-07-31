"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, EyeClosed, Heart } from "lucide-react";
import { ImageType } from "../types/interface";

type ProductCardProps = {
  product_id: string;
  name: string;
  price: number;
  product_image: ImageType;
};

export default function ProductCard({
  product_id,
  name,
  price,
  product_image,
}: ProductCardProps) {
  return (
     <Link
          href={`/products/${product_id}`}
          className="flex items-center justify-between rounded-xl"
        >
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      
      <div className="relative">
        <Image
          src={product_image.image_path}
          alt={name}
          width={250}
          height={250}
          loading="eager"
          className="aspect-square w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:bg-orange-600 hover:text-white">
          <Heart size={18} />
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-2 text-sm font-bold">
            {name}
          </h3>

          <p className="mt-2 text-lg text-orange-600">
            KSh {price}
          </p>
        </div>
        <div className="flex w-full justify-between">
         <p>View</p>
           <Eye />
        </div>
      </div>
       
    </div>
    </Link>
  );
}