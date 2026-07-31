"use client";

import { Filter, SlidersHorizontal } from "lucide-react";
import FilterGroup from "./products/FilterGroup";
import { Category } from "../types/interface";

interface ProductFilterProps {
  categories: Category[];
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
  selectedSizes: string[];
  handleSizeChange: (size: string) => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  handleCategoryChange,
  selectedSizes,
  handleSizeChange
}: ProductFilterProps) {
  return (
    <aside className="md:block md:h-fit w-fit rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <Filter className="text-red-600" />
        <h2 className="text-xl font-bold">Filters</h2>
      </div>

      <FilterGroup title="Category">
        {categories.map((item) => (
          <label key={item.category_id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedCategory === item.name}
              onChange={() => handleCategoryChange(item.name)}
            />
            {item.name}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
  <div className="flex flex-wrap flex-row gap-2">
    {["S", "M", "L", "XL", "XXL"].map((size) => (
      <button
        key={size}
        type="button"
        onClick={() => handleSizeChange(size)}
        className={`rounded-lg border px-4 py-2 transition ${
          selectedSizes.includes(size)
            ? "border-red-600 bg-red-600 text-white"
            : "hover:border-red-600 hover:bg-red-600 hover:text-white"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={1000}
          max={30000}
          className="w-full accent-red-600"
        />

        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>KSh 1,000</span>
          <span>KSh 30,000</span>
        </div>
      </FilterGroup>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700">
        <SlidersHorizontal size={18} />
        Apply Filters
      </button>
    </aside>
  );
}