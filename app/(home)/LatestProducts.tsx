import React from "react";
import ProductGrid from "./ProductGrid";

interface ProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function LatestProducts({ products }: { products: ProductCard[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4" style={{ color: '#111827' }}>Latest Products</h2>
      <ProductGrid products={products} />
    </section>
  );
} 