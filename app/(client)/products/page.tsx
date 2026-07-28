"use client"
import ProductCard from "@/app/components/ProductCard";
import ProductFilter from "@/app/components/ProductFilter";
import { getAllProducts } from "@/app/lib/product";
import { Product } from "@/app/types/interface";
import { useEffect, useState } from "react";



export default function ProductsPage() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect( ()=> {
        const getproducts = async () => {
            const result = await getAllProducts();
            const data = result;
            console.log("products", data.data)
            setProducts(data.data);
        }

        getproducts();
    }, [])



  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      {/* Heading */}
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.3em] text-red-600">
          Products
        </p>

        <h1 className="mt-2 text-5xl font-black">
          Shop The Latest Collection
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <ProductFilter />

        {/* Products */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-500">
              Showing {products.length} Products
            </p>

            <select className="rounded-xl border px-4 py-3">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product : Product) => (
              <ProductCard
                key={product.product_id}
                product_id={product.product_id.toString()}
                name={product.name}
                
                price={product.price}
                product_image={product.product_image[0]}
               
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}