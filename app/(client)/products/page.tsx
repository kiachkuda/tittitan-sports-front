"use client"
import LoadingPage from "@/app/components/loading/loading";
import ProductCard from "@/app/components/ProductCard";
import ProductFilter from "@/app/components/ProductFilter";
import { getAllCategories } from "@/app/lib/category";
import { getAllProducts } from "@/app/lib/product";
import { Category, Product } from "@/app/types/interface";
import { time } from "console";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);
  //const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  // const searchParams = useSearchParams();

  
  const currentPage = Number(searchParams.get("page") || 1);
  const currentCategory = searchParams.get("category") || "";
  const currentSize = searchParams.getAll("size") || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    try {
      setLoading(true);
      const getproducts = async () => {
      const result = await getAllProducts({ page: currentPage, category: currentCategory, size: currentSize.join(",") });
      const data = result;
      const pagination = data.pagination;

      setTotalPages(pagination.totalPages)
      setProducts(data.data);
    }

    const getCategories = async () => {
      const cats = await getAllCategories();
      setCategories(cats.data);
    }

     getproducts();
     getCategories();
    
    } catch (error) {
      
    }finally{
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
   
  }, [currentPage, currentCategory,]);



  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
   
    router.push(`${pathname}?${params.toString()}`, {
      scroll: true,
    });
  };

  const handleChange = (value: string) => {
   
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", value.toString());
    setCategory(value)
    
    if (params.get('category') == "") {
      params.delete('category');
      if (params.get('page')) params.set("page", "1")
    }

    router.push(`${pathname}/?${params}`)
  }



  const handleSizeChange = (size: string) => {
    const params = new URLSearchParams(searchParams);

    let updatedSizes: string[];

    if (selectedSizes.includes(size)) {
      updatedSizes = selectedSizes.filter((s) => s !== size);
    } else {
      updatedSizes = [...selectedSizes, size];
    }

    setSelectedSizes(updatedSizes);

    // Remove old values
    params.delete("size");

    // Add each selected size
    updatedSizes.forEach((size) => {
      params.append("size", size);
    });

    if (params.has("page")) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const addToWishlist = async (productId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${productId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);

    } catch (error) {
      console.error(error);
    }
  };

  if(loading) {
    return <LoadingPage />
  }

  return (
    <section className="mx-auto  px-8 md:px-16 py-8">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="mt-2 md:text-5xl md:font-black text-2xl">
          Shop The Latest Collection
        </h1>
      </div>
      <div className="flex gap-2 col-span-12 my-4">
          <input type="text" name="search" placeholder="search item" className="p-2 w-full" />
          <div className="border bg-black text-white m-auto p-2 rounded-sm"><Search size={24} /></div>
        </div>
      <div className="flex flex-row gap-3">
        {/* Sidebar */}
        <div className="hidden md:block md:cols-span-12 col-span-3">
          <ProductFilter 
            categories={categories} 
            selectedCategory="category" 
            handleCategoryChange={handleChange}
            selectedSizes={selectedSizes}
            handleSizeChange={handleSizeChange}
             />
        </div>
        

        {/* Products */}
        <div className="col-span-12 md:col-span-9" id="products">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-500">
              Showing {products.length} Products
            </p>

            <select className="rounded-xl border px-4 py-3">
              <option>Newest</option>
              <option>Most Popular</option>
            </select>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard
                
                key={product.product_id}
                product_id={product.product_id.toString()}
                name={product.name}
                addToWishlist={() => addToWishlist(product.product_id)}
                price={product.price}
                product_image={product.product_image[0]}

              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded ${currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}