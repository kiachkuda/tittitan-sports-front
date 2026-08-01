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

import cat1 from "@/public/images/image-1.jpeg"
import cat2 from "@/public/images/image-2.jpeg"
import cat3 from "@/public/images/image-3.jpeg"
import cat4 from "@/public/images/image-4.jpeg"
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
            <div className="flex flex-col mx-auto gap-6 px-16 py-6">
                <Title title="Home" />
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Object.entries(categoryImages).map(([name, src]) => (
                        <Link href={`/products?category=${name}`}>
                            <CategoryCard key={name} title={name} image={src} />
                        </Link>
                    ))}
                </div>
            </div>
            {/* Products By Categories */}
            {categories.map((category) => (
  <ProductSection
    key={category.category_id}
    title={category.name}
    products={category.product_categories.map((pc:any) => pc.products)}
  />
))}
        </div>
    
    )
}

export default HomePage;