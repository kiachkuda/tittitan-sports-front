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
import { ImageType, SingleProduct, Variant } from "@/app/types/interface";
import { getProductById } from "@/app/lib/product";
import { useParams } from "next/navigation";
import ProductGallery from "@/app/components/products/productImage";
import ProductInfo from "@/app/components/products/productInfo";
import VariantSelector from "@/app/components/products/variants";



export default function ProductPage() {
  
    const [product, setProduct] = useState<SingleProduct>();
    const [images, setImages] = useState<ImageType[]>([]);
    const [productName, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [variants, setVariants] = useState<Variant[]>([]);
    const param = useParams();
    const [activeImage, setActiveImage] = useState(0);
            const [qty, setQty] = useState(1);

    useEffect(() => {
      
        const getproduct = async (id: number) => {
            const data = await getProductById(id);
            setProduct(data);
            setImages(data.product_image ?? []);
            setName(product?.name ?? "");
            setDescription(product?.description ?? "");
            setPrice(product?.price ?? 0);
            setVariants(product?.product_variants ?? [])
             
            console.log(data);
        }

        getproduct(Number(param.id));
        
    }, [])

    

    return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            AERO<span className="text-red-500">/</span>LAB
          </Link>

          <nav className="hidden gap-8 text-sm text-neutral-600 md:flex">
            <Link href="#">Men</Link>
            <Link href="#">Women</Link>
            <Link href="#">Collections</Link>
            <Link href="#">Journal</Link>
          </nav>

          <button className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm hover:bg-neutral-50">
            Cart · 0
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href="#">Shop</Link>
          <span className="mx-2">/</span>

          <Link href="#">Footwear</Link>
          <span className="mx-2">/</span>

          <span className="text-neutral-900">
            Aero Runner 07
          </span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Gallery */}

          <ProductGallery images={images} productName={productName} />

          {/* Details */}

          <div>

            <p className="text-sm font-medium uppercase tracking-widest text-red-500">
              Aero Lab Performance
            </p>

            <h1 className="mt-2 text-5xl font-semibold">
              Aero Runner 07
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="text-amber-500">
                ★★★★★
              </div>

              <span className="text-sm text-neutral-500">
                4.8 · 1,204 reviews
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">

              <span className="text-3xl font-bold">
                $168
              </span>

              <span className="text-lg text-neutral-400 line-through">
                $210
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Save 20%
              </span>

            </div>

            <p className="mt-6 leading-relaxed text-neutral-600">
              Featherlight and responsive, the Aero Runner 07 pairs a woven mesh upper
              with a nitrogen-infused foam midsole.
            </p>

            {/* Sizes */}

            <div className="mt-10">

              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium">
                  Size (US)
                </span>

                <button className="text-sm underline">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">

                {product.product_variants.map((s, i) => {

                  return (
                    <button
                    className="bg-orange-600 text-white"
                      key={i}
      
                      
                      >
                       { s.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}

            <div className="mt-8 flex gap-3">

              <div className="flex items-center rounded-full border">

                <button
                  className="px-4 py-3"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>

                <span className="w-8 text-center">
                  {qty}
                </span>

                <button
                  className="px-4 py-3"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>

              </div>

              <button className="flex-1 rounded-full bg-black py-3 font-medium text-white">
                Add To Bag — ${168 * qty}
              </button>

            </div>

          </div>

        </div>
      </section>
    </main>
  );


}

