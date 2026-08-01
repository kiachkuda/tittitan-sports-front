"use client"
import Announcement from "@/app/components/Announcement"

import Hero from "@/app/components/Hero"
import CategoryCard from "@/app/components/home/categoryCard"
import Title from "@/app/components/home/title"
import Nav from "@/app/components/NavBar"
import CategoryProducts from "@/app/components/products/categoryProduct"
import { getAllProducts } from "@/app/lib/product"
import { Category, Product, ProductCategory, SingleProduct } from "@/app/types/interface"
import { useEffect, useState } from "react"

import cat1 from "@/public/images/image-1.jpeg"
import cat2 from "@/public/images/image-2.jpeg"
import cat3 from "@/public/images/image-3.jpeg"
import cat4 from "@/public/images/image-4.jpeg"
import cat5 from "@/public/images/image-4.jpeg"
import { getAllCategories } from "@/app/lib/category"





const Images = [cat1, cat2, cat3, cat4, cat5];
const categoryImages: Record<string, string> = {
  Jerseys: "/categories/jerseys.jpg",
  Boots: "/categories/boots.jpg",
  Balls: "/categories/balls.jpg",
  Accessories: "/categories/accessories.jpg",
};


const HomePage = () => {
const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
const [categories, setCategories] = useState<Category[]>([]);
const [products, setProducts] = useState<SingleProduct[]>([]);



    useEffect(() => {
    async function loadCategories() {
        const res = await getAllCategories();

        setCategories(res.data);

        console.log("Categories:", res.data);

        if (res.data.length > 0) {
            const first = res.data[0];

            setSelectedCategory(first.category_id);

            setProducts(
                first.product_categories.map((pc:any) => pc.products)
            );
        }
    }

    loadCategories();
}, []);


    return (
        <>
            <div className="gap-3 p-2">
                <Title title="Buy Top-Rated and High-Quality Personalized Jerseys Online" />
                <div className="grid grid-cols-4 gap-4 px-4">
                    {
                        categories.map((category: any) => {
                            return <>
                                <Title title={category.name} />

                                <CategoryCard image={category.product_categories[0]?.products?.product_image[0]?.image_path } title={category.name} />
                            </>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default HomePage;