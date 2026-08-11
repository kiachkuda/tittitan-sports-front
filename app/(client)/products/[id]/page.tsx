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
import { ImageType, Product, SingleProduct, Variant, CartItem } from "@/app/types/interface";
import { getProductById } from "@/app/lib/product";
import { useParams, useSearchParams } from "next/navigation";
import ProductGallery from "@/app/components/products/productImage";

import { SIZES } from "@/app/types/interface";

import { useCart } from "@/contexts/CartProvider";
import { data } from "framer-motion/m";





export default function ProductPage() {


  const [images, setImages] = useState<ImageType[]>([]);
  const [productName, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [variants, setVariants] = useState<Variant[]>([]);
  const param = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [sku, setSku] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<CartItem>({} as CartItem);
  const availableSizes = new Set(
    variants.map((variant: any) => variant.size.toUpperCase())
  );
  const [selectedSize, setSelectedSize] = useState<number>();



  const { addToCart } = useCart();

  useEffect(() => {
    const getproduct = async (id: number) => {
      const data = await getProductById(id);

      setProduct(data);
      setImages(data.product_image ?? []);
      setName(data.name ?? "");
      setDescription(data.description ?? "");
      setPrice(data.price ?? 0);
      setVariants(data.product_variants ?? [])
      setSku(data.sku ?? "")
      setTeam(data.team ?? "");

      const v = data.product_variants[0];

    //  console.log(v.variant_id, v.size )
    //  setSelectedSize(v.variant_id)
    }
    

    getproduct(Number(param.id));

  }, [])





  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Header */}


      <section className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href={'/products/'}>Shop</Link>
          <span className="mx-2">/</span>

          <Link href="#">{team}</Link>
          <span className="mx-2">/</span>

          <span className="text-neutral-900">
            {sku}
          </span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Gallery */}

          <ProductGallery images={images} productName={productName} />

          {/* Details */}

          <div>

            <p className="text-sm font-medium uppercase tracking-widest text-red-500">
              {team}
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              {productName}
            </h1>

            {/* <div className="mt-4 flex items-center gap-3">
              <div className="text-amber-500">
                ★★★★★
              </div>

              <span className="text-sm text-neutral-500">
                4.8 · 1,204 reviews
              </span>
            </div> */}

            <div className="mt-6 flex items-center gap-3">

              <span className="text-2xl font-medium">
                {`KSH ${price}`}
              </span>

              <span className="text-lg text-neutral-400 line-through">
                {`KSH ${price * 1.20}`}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Save 20%
              </span>

            </div>

            <p className="mt-6 leading-relaxed text-neutral-600">
              {description}
            </p>

            {/* Sizes */}
            <div className="mt-2 p-2"> 
              <h3 className="font-medium text-2xl">Available Sizes</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              
              {variants.map((v) => {
                // const available = availableSizes.has(size.toUpperCase());
                const selected = v.variant_id == selectedSize;
                return (
                  <button
                    key={v.size}
                    onClick={()=>{setSelectedSize(v.variant_id); console.log(selectedSize)}}
                    className={`bg-black rounded-lg text-white  px-4 md:px-8 py-2 font-medium text-2xl transition
                       ${selected ? "border border-gray-200 bg-orange-400 text-gray-200" : ""}
                    
                      
                      }`}
                  >
                    {v.size}
                  </button>
                );
              })}
            </div>

            {/* Quantity */}

            <div className="mt-8 flex flex-col gap-3">

              <div className="flex items-center justify-between w-full rounded-md border-gray-600">

                <button
                  className="px-4 py-3 w-12 text-3xl bg-black border border-white text-2xl rounded-md text-white"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus />
                </button>

                <span className="w-12 text-center text-2xl font-bold">
                  {qty}
                </span>

                <button
                  className="px-4 py-3 text-3xl rounded-md bg-black text-white"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus />
                </button>

              </div>

              <div className="w-full mt-2">
                <h3 className="font-medium text-xl">Custom</h3>

                <div className="flex items-center gap-5 my-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <input type="checkbox" name="printname" className="text-2lg w-4 h-4 border-2 border-gray-300 outline-1" />

                      <label htmlFor="printname" className="ml-2 text-gray-700 font-medium text-lg">PRINT NAME
                        + Ksh 200</label>

                    </div>
                    <div>
                      <input type="checkbox" name="printname" className="text-2lg w-4 h-4 border-2 border-gray-300 outline-1" />

                      <label htmlFor="printnumber" className="ml-2 text-gray-700 font-medium text-lg">PRINT NUMBER
                        + Ksh 200</label>

                    </div>
                  </div>
                </div>

              </div>

              <button
                onClick={() => addToCart(product, qty, selectedSize)}
                className="flex-1 rounded-full bg-black py-3 font-medium text-white"
              >
                Add To Bag — KSH{price * qty}
              </button>

            </div>

          </div>

        </div>
      </section>
    </main>
  );


}

