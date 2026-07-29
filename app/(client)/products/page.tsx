"use client"
import ProductCard from "@/app/components/ProductCard";
import ProductFilter from "@/app/components/ProductFilter";
import { getAllProducts } from "@/app/lib/product";
import { Product } from "@/app/types/interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function ProductsPage() {

    const [products, setProducts] = useState<Product[]>([]);
    //const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
   // const searchParams = useSearchParams();

const currentPage = Number(searchParams.get("page") || 1);

    useEffect( ()=> {
        const getproducts = async () => {
            const result = await getAllProducts({ page: currentPage });
            const data = result;
            const pagination = data.pagination;

            setTotalPages(pagination.totalPages)
            console.log("products", data.data)
            console.log("products", data.pagination)
            //setCurrentPage(pagination.page)
            setProducts(data.data);
        }

        getproducts();
    }, [currentPage])



const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages) return;

  const params = new URLSearchParams(searchParams.toString());
  params.set("page", page.toString());

  router.push(`${pathname}?${params.toString()}`, {
    scroll: true,
  });
};

  // const handleChange = (value:string) => {
  //       const params = new URLSearchParams(searchParams);
  //       params.set("category", value || '');
  //       setCategory(value)
  //       if(params.get('category') == "")
  //       {
  //         params.delete('category');
  //         if(params.get('page')) params.set("page", "1")
  //       }  
          
  //       router.push(`${pathname}/?${params}/#products`)
  //   }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      {/* Heading */}
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.3em] text-red-600">
          Products
        </p>

        <h1 className="mt-2 text-5xl font-black">
          Shop The Latest Collection
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <ProductFilter />

        {/* Products */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-500">
              Showing {products.length} Products
            </p>

            <select className="rounded-xl border px-4 py-3">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product : Product) => (
              <ProductCard
                key={product.product_id}
                product_id={product.product_id.toString()}
                name={product.name}
                
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