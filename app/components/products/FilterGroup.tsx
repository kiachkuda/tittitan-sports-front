"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 flex w-full items-center justify-between font-semibold"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 pb-2">{children}</div>
      </div>
    </div>
  );
}

export default FilterGroup;