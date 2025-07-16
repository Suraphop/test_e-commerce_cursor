import { prisma } from "@/lib/prisma";
import ProductsCatalogClient from "./ProductsCatalogClient";
import { Suspense } from "react";

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

async function getLatestProducts(): Promise<ProductCard[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    select: { id: true, name: true, price: true, images: true },
  });
  return products.map((p: { id: string; name: string; price: number; images: string[] }) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.images[0] || "",
  }));
}

async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
  return categories;
}

export default async function ProductsCatalogPage() {
  const latestProducts = await getLatestProducts();
  const categories = await getCategories();
  return (
    <Suspense>
      <ProductsCatalogClient
        latestProducts={latestProducts}
        categories={categories}
      />
    </Suspense>
  );
} 