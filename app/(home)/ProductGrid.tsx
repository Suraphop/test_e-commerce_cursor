'use client';

import React, { useState } from "react";
import Image from "next/image";

interface ProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products: ProductCard[];
  paginated?: boolean;
}

const PAGE_SIZE = 8;

export default function ProductGrid({ products, paginated = false }: ProductGridProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  const paginatedProducts = paginated
    ? products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : products;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded shadow flex flex-col items-center h-full w-full flex-grow bg-white transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full aspect-square object-cover rounded mb-2"
                style={{ backgroundColor: '#F3F4F6' }}
                unoptimized
              />
            ) : (
              <div className="w-full aspect-square rounded mb-2" style={{ backgroundColor: '#F3F4F6' }} />
            )}
            <div className="font-semibold text-center w-full" style={{ color: '#111827' }}>{product.name}</div>
            <div className="text-center w-full font-bold" style={{ color: '#1f2937' }}>${product.price.toFixed(2)}</div>
            <button className="mt-2 px-4 py-1 rounded w-full" style={{ backgroundColor: '#111827', color: '#FFFFFF' }}>View</button>
          </div>
        ))}
      </div>
      {paginated && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 items-center">
          <button
            className="px-3 py-1 rounded border bg-white text-[#111827] transition disabled:opacity-50"
            style={{ borderColor: '#E5E7EB' }}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2 text-[#111827] font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded border bg-white text-[#111827] transition disabled:opacity-50"
            style={{ borderColor: '#E5E7EB' }}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
} 