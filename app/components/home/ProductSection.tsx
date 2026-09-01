"use client";

import Link from "next/link";
import ProductCard from "../ProductCard";
import { ChevronRight } from "lucide-react";
import { Product } from "@/app/types/interface";
import { addToWishlist } from "@/app/lib/wishlist";

interface ProductSectionProps {
  title: string;
  products: Product[];
  href?: string;
}

export default function ProductSection({
  title,
  products,
  href = `/products?category=${encodeURIComponent(title)}`,
}: ProductSectionProps) {
  if (!products.length) return null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Shop the latest {title} jerseys.
            </p>
          </div>

          <Link
            href={href}
            className="group flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white"
          >
            View All
            <ChevronRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              name={product?.name}
                price={product?.price}
                product_id={product?.product_id.toString()}
                product_image={product?.product_image[0]}
                addToWishlist={() => addToWishlist(product.product_id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}