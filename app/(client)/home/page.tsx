"use client"
import Announcement from "@/app/components/Announcement"

import Hero from "@/app/components/Hero"
import CategoryCard from "@/app/components/home/categoryCard"
import Title from "@/app/components/home/title"

import { SingleProduct } from "@/app/types/interface"
import { useEffect, useState } from "react"


import cat1 from "@/public/images/epl.png"
import cat2 from "@/public/images/bb.png"
import cat3 from "@/public/images/tracksuit.png"
import cat4 from "@/public/images/gears.png"
import cat5 from "@/public/images/balls.png"
import { getAllCategories } from "@/app/lib/category"

import Link from "next/link"
import ProductSection from "@/app/components/home/ProductSection"
import { CircleDot, Flag, Shirt } from "lucide-react"
import CategoryCards from "@/app/components/categories/categoryComponent"



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

  
    return (
        <div className="flex flex-col gap-6">
            {/* Category Cards */}
            <div className="flex flex-col mx-auto gap-6 px-4 md:px-16 py-6">
                <Title title="Home" />

             
                {/* Tablet/Desktop Grid */}
                
                    <CategoryCards />
                
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