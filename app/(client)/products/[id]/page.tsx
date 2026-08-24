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
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [printingCost, setPrintingCost] = useState<number>(0);
  const [printName, setPrintName] = useState("");
  const [printNumber, setPrintNumber] = useState("");



  const cart = useCart();
  const addToCart = cart.addToCart;

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
                const quantity = v.stock_quantity;
                return (
                  quantity > 0 && (
 <button
                    key={v.size}
                    onClick={()=>{setSelectedSize(v.variant_id);}}
                    className={`bg-black rounded-lg text-white  px-4 md:px-8 py-2 font-medium text-2xl transition
                       ${selected ? "border border-gray-200 bg-orange-400 text-gray-200" : ""}
                    
                      
                      }`}
                  >
                    {v.size}
                  </button>
                  )
                 
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
                    <div className="space-y-4">
  {/* Printing option */}
  <div className="flex flex-row items-center gap-3">
    <input
      id="printname"
      type="checkbox"
      name="printname"
      checked={isPrinting}
      onChange={(e) => {
        const checked = e.target.checked;

        setIsPrinting(checked);
        setPrintingCost(checked ? 400 : 0);

        // Optional: clear fields when unchecked
        if (!checked) {
          setPrintName("");
          setPrintNumber("");
        }
      }}
      className="h-4 w-4 rounded border-gray-300 accent-orange-500"
    />

    <label
      htmlFor="printname"
      className="cursor-pointer text-lg font-medium text-gray-700"
    >
      PRINT NAME & NUMBER
      <span className="ml-2 text-orange-500">+ Ksh 400</span>
    </label>
  </div>

  {/* Custom printing fields */}
  {isPrinting && (
    <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:grid-cols-2">
      {/* Name */}
      <div>
        <label
          htmlFor="printName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Name to Print
        </label>

        <input
          id="printName"
          type="text"
          value={printName}
          onChange={(e) => setPrintName(e.target.value)}
          placeholder="Enter name"
          className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition
            placeholder:text-gray-400
            focus:border-orange-500
            focus:ring-4 focus:ring-orange-500/10"
        />
      </div>

      {/* Number */}
      <div>
        <label
          htmlFor="printNumber"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Number to Print
        </label>

        <input
          id="printNumber"
          type="text"
          value={printNumber}
          onChange={(e) => setPrintNumber(e.target.value)}
          placeholder="e.g. 10"
          maxLength={2}
          className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition
            placeholder:text-gray-400
            focus:border-orange-500
            focus:ring-4 focus:ring-orange-500/10"
        />
      </div>
    </div>
  )}

  {/* Cost */}
  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
    <span className="text-sm text-gray-500">Printing cost</span>

    <span className="font-semibold text-gray-900">
      Ksh {printingCost.toLocaleString()}
    </span>
  </div>
</div>
                    
                  </div>
                </div>

              </div>

              <button
                onClick={() => addToCart(product, qty, selectedSize, printingCost)}
                className="flex-1 rounded-full bg-black py-3 font-medium text-white"
              >
                Add To Bag — KSH{price * qty + printingCost}
              </button>

            </div>

          </div>

        </div>
      </section>
    </main>
  );


}

