"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms debounce
    return () => clearTimeout(handler);
  }, [value, onSearch]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2"
        style={{ borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', color: '#111827' }}
      />
    </div>
  );
} 