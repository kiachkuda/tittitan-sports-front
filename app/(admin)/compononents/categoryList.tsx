"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { div } from "framer-motion/m";

interface Category {
  category_id: number;
  name: string;
  description: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);


  const handleDelete = async (categoryId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/categories/${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
        if (!response.ok) {
            throw new Error("Failed to delete category");
        }

      // Remove the deleted category from the state
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.category_id !== categoryId)
      );
    } catch (error) {
      console.error(error);
    }
}

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/categories",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        console.log("Fetched categories:", data.data);
        setCategories(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-10 text-center">
        No categories found.
      </div>
    );
  }

  return (
   
        <table className="min-w-full divide-y divide-gray-200 mt-5">
          <thead className="bg-black text-white">
            <tr>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Category Name
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Description
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Action
                </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
                <tr key={category.category_id}> 
                    <td className="px-6 py-4 whitespace-nowrap">
                        {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(category.category_id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

  );
}