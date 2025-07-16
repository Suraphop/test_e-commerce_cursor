import React from "react";
import { prisma } from "@/lib/prisma";
import Carousel from "./Carousel";
import LatestProducts from "./LatestProducts";

interface ProductImage {
  src: string;
  alt: string;
  id: string;
}

interface ProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
}

async function getProductImages(): Promise<ProductImage[]> {
  const products = await prisma.product.findMany({
    select: { images: true, name: true, id: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return products
    .map((p: { images: string[]; name: string; id: string }) => ({
      src: p.images[0],
      alt: p.name,
      id: p.id,
    }))
    .filter((img: ProductImage) => !!img.src);
}

async function getLatestProducts(): Promise<ProductCard[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
    select: { id: true, name: true, price: true, images: true },
  });
  return products.map((p: { id: string; name: string; price: number; images: string[] }) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.images[0] || "",
  }));
}

export default async function HomePage() {
  const images = await getProductImages();
  const latestProducts = await getLatestProducts();

  return (
    <div>
      {/* Banner Carousel */}
      <div className="w-full mb-8">
        <div className="relative overflow-hidden rounded-lg w-full h-[50vh]" style={{ backgroundColor: '#F3F4F6' }}>
          <Carousel images={images} />
        </div>
      </div>
      {/* Latest Products */}
      <LatestProducts products={latestProducts} />
    </div>
  );
} 