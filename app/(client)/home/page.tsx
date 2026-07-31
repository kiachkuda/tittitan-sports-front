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
import { StaticImageData } from "next/image"




// const Images = [cat1, cat2, cat3, cat4];
// const Titles = [, "Accessories","BasketBall", "Kids Kits"]


const HomePage = () => {

    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [products, setProducts] = useState<SingleProduct[]>([]);




    useEffect(() => {

        const getProducts = async () => {
            const data = await getAllProducts({});
            const products1 = data.data;
            setProducts(products1);

           

            setCategories(products1.product_categories)
             console.log(products1.product_categories[0])
        }



        getProducts();

    }, [])


    return (
        <>
            <div className="gap-3 p-2">

                {/* {categories.map((category) => (
    <CategoryProducts
        key={category.category_id}
        title={category.name}
        products={products.filter((p) =>
            p.categories?.some(
                (c) => c.name === category.name
            )
        )}
    />
))} */}

                <Title title="Buy Top-Rated and High-Quality Personalized Jerseys Online" />
                <div className="grid grid-cols-4 gap-4 px-4">


                    {
                        products.map((product: any) => {
                            return <>
                                <Title title={product.name} />
                            </>
                        })
                    }
                </div>
            </div>


        </>
    )
}

export default HomePage;