"use client";
import React from "react";
import "rc-slider/assets/index.css";

interface Category {
  id: string;
  name: string;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedPriceRange: [number, number];
  onCategoryChange: (categoryId: string | null) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  sortOrder: 'asc' | 'desc' | null;
  onSortChange: (order: 'asc' | 'desc' | null) => void;
}

export default function Sidebar({
  categories,
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceRangeChange,
  sortOrder,
  onSortChange,
}: SidebarProps) {
  return (
    <aside className="w-64 p-4 bg-[#F3F4F6] rounded-lg shadow flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#111827' }}>Categories</h3>
        <ul className="flex flex-col gap-2">
          <li key="all">
            <button
              className={`w-full text-left px-2 py-1 rounded hover:bg-[#E5E7EB] ${!selectedCategory ? 'bg-[#E5E7EB]' : ''}`}
              style={{ color: '#111827' }}
              onClick={() => onCategoryChange(null)}
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`w-full text-left px-2 py-1 rounded hover:bg-[#E5E7EB] ${selectedCategory === cat.id ? 'bg-[#E5E7EB]' : ''}`}
                style={{ color: '#111827' }}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#111827' }}>Filters</h3>
        {/* Price Range as buttons instead of slider */}
        <div className="mt-4">
          <h4 className="font-semibold mb-1" style={{ color: '#111827' }}>Price Range</h4>
          <div className="flex flex-col gap-2 px-2">
            <button
              className={`w-full px-2 py-1 rounded ${selectedPriceRange[0] === 0 && selectedPriceRange[1] === 1000 ? 'bg-[#E5E7EB]' : 'hover:bg-[#E5E7EB]'}`}
              style={{ color: '#111827' }}
              onClick={() => onPriceRangeChange([0, 1000])}
            >
              All
            </button>
            <button
              className={`w-full px-2 py-1 rounded ${selectedPriceRange[0] === 0 && selectedPriceRange[1] === 100 ? 'bg-[#E5E7EB]' : 'hover:bg-[#E5E7EB]'}`}
              style={{ color: '#111827' }}
              onClick={() => onPriceRangeChange([0, 100])}
            >
              $0 - $100
            </button>
            <button
              className={`w-full px-2 py-1 rounded ${selectedPriceRange[0] === 100 && selectedPriceRange[1] === 500 ? 'bg-[#E5E7EB]' : 'hover:bg-[#E5E7EB]'}`}
              style={{ color: '#111827' }}
              onClick={() => onPriceRangeChange([100, 500])}
            >
              $100 - $500
            </button>
            <button
              className={`w-full px-2 py-1 rounded ${selectedPriceRange[0] === 500 && selectedPriceRange[1] === 1000 ? 'bg-[#E5E7EB]' : 'hover:bg-[#E5E7EB]'}`}
              style={{ color: '#111827' }}
              onClick={() => onPriceRangeChange([500, 1000])}
            >
              $500 - $1000
            </button>
          </div>
        </div>
        {/* Sort by Price */}
        <div className="mt-4">
          <h4 className="font-semibold mb-1" style={{ color: '#111827' }}>Sort by Price</h4>
          <div className="flex gap-2 px-2">
            <button
              className={`flex-1 px-2 py-1 rounded ${sortOrder === 'asc' ? 'bg-[#E5E7EB]' : 'hover:bg-[#E5E7EB]'}`}
              style={{ color: '#111827' }}
              onClick={() => onSortChange('asc')}
            >
              Low to High
            </button>
            <button
              className={`flex-1 px-2 py-1 rounded ${sortOrder === 'desc' ? 'bg-[#E5E7EB]' : 'hover:bg-[#E5E7EB]'}`}
              style={{ color: '#111827' }}
              onClick={() => onSortChange('desc')}
            >
              High to Low
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
} 