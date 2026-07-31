"use client"
import Announcement from "@/app/components/Announcement"
import CategoryCard from "@/app/components/categories/CategoryCard"
import Hero from "@/app/components/Hero"
import Nav from "@/app/components/NavBar"
import CategoryProducts from "@/app/components/products/categoryProduct"
import { getAllProducts } from "@/app/lib/product"
import { Category, Product } from "@/app/types/interface"
import { useEffect, useState } from "react"

const HomePage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect( ()=> {
        const getProducts = getAllProducts();
        console.log(getProducts)
    })


    return (
        <>
          <div className="flex gap-3 p-2">
               
    {categories.map((category) => (
    <CategoryProducts
        key={category.category_id}
        title={category.name}
        products={products.filter((p) =>
            p.categories?.some(
                (c) => c.name === category.name
            )
        )}
    />
))}

                
          </div>
            
            
        </>
    )
}

export default HomePage;