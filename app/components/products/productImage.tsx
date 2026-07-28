"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Expand } from "lucide-react";
import { ImageType } from "@/app/types/interface";



type ProductGalleryProps = {
  images: ImageType[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
 


 useEffect(() => {
    if (images.length) {
        setSelectedImage(images[0]);
    }
}, [images]);

if (!images.length || !selectedImage) return null;

  if (!images.length) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 lg:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
        {images.map((image) => (
          <button
            key={image?.id}
            onClick={() => setSelectedImage(image)}
            className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
              selectedImage?.id === image?.id
                ? "border-red-600 shadow-lg"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={image.image_path}
              alt={productName}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className=" flex-1 overflow-x-auto rounded-3xl bg-gray-100">
        <div className="group relative aspect-square">
          <Image
            key={selectedImage?.id}
            src={selectedImage?.image_path}
            alt={productName}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Top Left Badge */}
          <div className="absolute left-5 top-5 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            New Season
          </div>

          {/* Top Right Buttons */}
          <div className="absolute right-5 top-5 flex gap-3">
            <button className="rounded-full bg-white p-3 shadow-md transition hover:scale-110">
              <Heart size={20} />
            </button>

            <button className="rounded-full bg-white p-3 shadow-md transition hover:scale-110">
              <Expand size={20} />
            </button>
          </div>

          {/* Bottom Overlay */}
          <div className="absolute bottom-5 left-5 rounded-xl bg-white/90 px-4 py-3 backdrop-blur">
            <p className="text-xs font-medium text-gray-500">
              Official Titan Sports
            </p>

            <p className="font-semibold">
              Premium Match Quality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}