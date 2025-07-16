"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductSearch from "./ProductSearch";
import ProductGrid from "./ProductGrid";

interface ProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductSearchWithResultsProps {
  latestProducts: ProductCard[]; // Kept for prop compatibility, but not used
  selectedCategory: string | null;
  selectedPriceRange: [number, number];
  sortOrder: 'asc' | 'desc' | null;
}

export default function ProductSearchWithResults({ selectedCategory, selectedPriceRange, sortOrder }: ProductSearchWithResultsProps) {
  const [results, setResults] = useState<ProductCard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const prevFilters = useRef<{category: string | null, priceRange: [number, number]}>({category: null, priceRange: [0, 1000]});
  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch all results (no pagination)
  const fetchResults = async (q: string, category: string | null, priceRange: [number, number], sort: 'asc' | 'desc' | null = null) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (category) params.append('category', category);
    if (priceRange) {
      params.append('priceMin', priceRange[0].toString());
      params.append('priceMax', priceRange[1].toString());
    }
    if (sort) params.append('sort', sort);
    const res = await fetch(`/api/products/search?${params.toString()}`);
    const data = await res.json();
    setResults(data.products);
    setLoading(false);
  };

  // On initial load, fetch all products (no filters, no query)
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      fetchResults("", null, [0, 1000], sortOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoad]);

  // When filters change, fetch all results
  useEffect(() => {
    const prev = prevFilters.current;
    const filtersChanged =
      prev.category !== selectedCategory ||
      prev.priceRange[0] !== selectedPriceRange[0] ||
      prev.priceRange[1] !== selectedPriceRange[1];
    if (filtersChanged) {
      prevFilters.current = {
        category: selectedCategory,
        priceRange: selectedPriceRange,
      };
      fetchResults(query, selectedCategory, selectedPriceRange, sortOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedPriceRange]);

  // When query or sortOrder changes, fetch all results
  useEffect(() => {
    if (!initialLoad) {
      fetchResults(query, selectedCategory, selectedPriceRange, sortOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sortOrder]);

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  return (
    <div>
      <ProductSearch onSearch={handleSearch} />
      <div className="mt-6">
        {loading && <div className="text-gray-500">Searching...</div>}
        {results && results.length === 0 && !loading && (
          <div className="text-gray-500">No products found.</div>
        )}
        {results && results.length > 0 && !loading && (
          <ProductGrid products={results} paginated={true} />
        )}
      </div>
    </div>
  );
} 