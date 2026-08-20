"use client"
import Announcement from "@/app/components/Announcement"

import Hero from "@/app/components/Hero"
import CategoryCard from "@/app/components/home/categoryCard"
import Title from "@/app/components/home/title"
import Nav from "@/app/components/NavBar"
import CategoryProducts from "@/app/components/products/categoryProduct"
import { getAllProducts, getProductsByCategory } from "@/app/lib/product"
import { Category, Product, ProductCategory, SingleProduct } from "@/app/types/interface"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams, useParams } from "next/navigation"

import cat1 from "@/public/images/epl.jpeg"
import cat2 from "@/public/images/bb.png"
import cat3 from "@/public/images/tracksuit.png"
import cat4 from "@/public/images/gears.png"
import cat5 from "@/public/images/image-4.jpeg"
import { getAllCategories } from "@/app/lib/category"
import ProductCard from "@/app/components/ProductCard"
import Link from "next/link"
import ProductSection from "@/app/components/home/ProductSection"






const Images = [cat1, cat2, cat3, cat4, cat5];
const categoryImages: Record<string, string> = {
    "Premier League": cat1.src,
    "Football Boots": cat2.src,
    "La Liga": cat3.src,
    "Protective Gears": cat4.src,
};


const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<SingleProduct[]>([]);



    useEffect(() => {

       console.log( "env file:", process.env.NEXT_PUBLIC_API_URL)

        async function loadCategories() {
            const res = await getAllCategories();
            setCategories(res.data);
            if (res.data.length > 0) {
                const first = res.data[0];
                setSelectedCategory(first.name);
            }
        }
        loadCategories();

    }, []);

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category.category_id);

        setProducts(
            category?.product_categories.map((pc: any) => pc.products)
        );
    };


    return (
        <div className="flex flex-col gap-6">
            {/* Category Cards */}
            <div className="flex flex-col mx-auto gap-6 px-4 md:px-16 py-6">
                <Title title="Home" />

                {/* Mobile Slider */}
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:hidden scrollbar-hide">
                    {Object.entries(categoryImages).map(([name, src]) => (
                        <Link
                            key={name}
                            href={`/products?category=${name}`}
                            className="snap-start flex-none w-[calc(50%-8px)]"
                        >
                            <CategoryCard title={name} image={src} />
                        </Link>
                    ))}
                </div>

                {/* Tablet/Desktop Grid */}
                <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6">
                    {Object.entries(categoryImages).map(([name, src]) => (
                        <Link key={name} href={`/products?category=${name}`}>
                            <CategoryCard title={name} image={src} />
                        </Link>
                    ))}
                </div>
            </div>
            {/* Products By Categories */}
            {categories.slice(0, 4).map((category) => (
                <ProductSection
                    key={category.category_id}
                    title={category.name}
                    products={category.product_categories.slice(0,6).map((pc: any) => pc.products)}
                />
            ))}
        </div>

    )
}

export default HomePage;