'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from "../(home)/Sidebar";
import ProductSearchWithResults from "../(home)/ProductSearchWithResults";

interface ProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsCatalogClient({ latestProducts, categories }: { latestProducts: ProductCard[]; categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>('asc');

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPageState] = useState(initialPage);

  // Sync page state to URL
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [page, router, searchParams]);

  // When the URL changes (e.g., back/forward), update page state
  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;
    setPageState(urlPage);
  }, [searchParams]);

  return (
    <div>
      <div className="flex gap-8">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          selectedPriceRange={selectedPriceRange}
          onCategoryChange={setSelectedCategory}
          onPriceRangeChange={setSelectedPriceRange}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        <div className="flex-1">
          <ProductSearchWithResults
            latestProducts={latestProducts}
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            sortOrder={sortOrder}
          />
        </div>
      </div>
    </div>
  );
} 