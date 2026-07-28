"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ZoomIn,
} from "lucide-react";

const images = [
  "/products/jersey-1.jpg",
  "/products/jersey-2.jpg",
  "/products/jersey-3.jpg",
];

const sizes = ["S", "M", "L", "XL"];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
        Quick View
      </p>

      <h2 className="mt-2 text-4xl font-black">On the Shelf Right Now</h2>

      <div className="mt-10 grid gap-12 rounded-3xl bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10">
        {/* Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {images.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-xl border-2 transition ${
                  selectedImage === image
                    ? "border-red-600"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt="Thumbnail"
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative flex-1 overflow-hidden rounded-3xl bg-gray-100">
            <Image
              src={selectedImage}
              alt="Canada Jersey"
              width={700}
              height={700}
              className="h-full w-full object-cover"
            />

            <span className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase text-white">
              New Drop
            </span>

            <button className="absolute bottom-4 right-4 rounded-full bg-white p-3 shadow-lg">
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Titan • Jerseys • 26/27
          </p>

          <h3 className="mt-3 text-4xl font-black leading-tight">
            Alphonso Davies
            <br />
            Canada Home Jersey
          </h3>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-3xl font-bold text-red-600">
              CHF 85.00
            </span>

            <span className="text-lg text-gray-400 line-through">
              CHF 95.00
            </span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              In Stock
            </span>
          </div>

          <p className="mt-5 text-gray-600">
            Lightweight match fabric with moisture-wicking technology.
            Officially licensed with optional player name and number printing.
          </p>

          {/* Sizes */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold">Size</span>

              <button className="flex items-center gap-1 text-sm text-red-600">
                <Ruler size={16} />
                Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 w-14 rounded-xl border font-semibold transition ${
                    selectedSize === size
                      ? "border-red-600 bg-red-600 text-white"
                      : "hover:border-red-600"
                  }`}
                >
                  {size}
                </button>
              ))}

              <button
                disabled
                className="h-11 w-14 cursor-not-allowed rounded-xl border opacity-40 line-through"
              >
                XXL
              </button>
            </div>
          </div>

          {/* Personalization */}
          <div className="mt-8">
            <label className="font-semibold">
              Player Name (Optional)
            </label>

            <div className="mt-3 flex gap-3">
              <input
                placeholder="DAVIES"
                className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-red-600"
              />

              <input
                placeholder="19"
                className="w-24 rounded-xl border px-4 py-3 text-center outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-xl border">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="p-3"
              >
                <Minus size={18} />
              </button>

              <span className="w-10 text-center font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3"
              >
                <Plus size={18} />
              </button>
            </div>

            <button className="flex flex-1 items-center justify-between rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700">
              <span className="flex items-center gap-2">
                <ShoppingBag size={18} />
                Add to Cart
              </span>

              <span>CHF {(85 * quantity).toFixed(2)}</span>
            </button>
          </div>

          {/* Features */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-100 p-4">
              <RotateCcw className="mb-2 text-red-600" />
              <p className="text-sm font-medium">
                30-Day Returns
              </p>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
              <Truck className="mb-2 text-red-600" />
              <p className="text-sm font-medium">
                Ships in 48 Hours
              </p>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
              <ShieldCheck className="mb-2 text-red-600" />
              <p className="text-sm font-medium">
                100% Authentic
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}