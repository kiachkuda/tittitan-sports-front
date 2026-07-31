"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ProductCard from "../ProductCard";
import { Product } from "@/app/types/interface";

interface Props {
  title: string;
  products: Product[];
}

export default function CategoryProducts({
  title,
  products,
}: Props) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const previous = () => {
    setIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-gray-500">
            Shop the latest {title} jerseys
          </p>
        </div>

        <Link
          href={`/products?category=${encodeURIComponent(title)}`}
          className="text-red-600 font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.product_id}
            product_id={(product.product_id).toString()}
            name={product.name}
            price={product.price}
           
            product_image={product.product_image[0]}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={products[index].product_id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: .3 }}
          >
            <ProductCard product_id={(products[index].product_id).toString()}
            name={products[index].name}
            price={products[index].price}
           
            product_image={products[index].product_image[0]} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={previous}
            className="rounded-full border p-3 hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>

          <span className="text-sm text-gray-500">
            {index + 1} / {products.length}
          </span>

          <button
            onClick={next}
            className="rounded-full border p-3 hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}