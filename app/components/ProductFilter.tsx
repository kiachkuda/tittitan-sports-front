"use client";

import {
  ChevronDown,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import FilterGroup from "./products/FilterGroup";

export default function ProductFilter() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <Filter className="text-red-600" />
        <h2 className="text-xl font-bold">Filters</h2>
      </div>

      {/* Categories */}
      <FilterGroup title="Category">
        {[
          "Jerseys",
          "Boots",
          "Accessories",
          "Training",
        ].map((item) => (
          <label key={item} className="flex items-center gap-3">
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* Teams */}
      <FilterGroup title="Teams">
        {[
          "Arsenal",
          "Barcelona",
          "Chelsea",
          "Manchester United",
        ].map((item) => (
          <label key={item} className="flex items-center gap-3">
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* Size */}

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              className="rounded-lg border px-4 py-2 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
              {size}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}

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

