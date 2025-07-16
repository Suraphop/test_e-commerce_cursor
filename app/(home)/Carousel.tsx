"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProductImage {
  src: string;
  alt: string;
  id: string;
}

export default function Carousel({ images }: { images: ProductImage[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  if (!images.length) return <div className="h-[50vh] w-full flex items-center justify-center text-gray-400">No banners</div>;
  return (
    <div className="relative h-[50vh] w-full">
      {images.map((img, i) => (
        <Image
          key={img.id}
          src={img.src}
          alt={img.alt}
          width={800}
          height={256}
          className={`absolute top-0 left-0 w-full h-[50vh] object-cover rounded-lg transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          unoptimized
          priority={i === 0}
        />
      ))}
      {/* Arrow buttons */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-1 z-20"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-1 z-20"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-[#111827]' : 'bg-[#E5E7EB]'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
} 