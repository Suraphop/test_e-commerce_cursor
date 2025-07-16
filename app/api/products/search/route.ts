import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const page = pageParam ? parseInt(pageParam, 10) : undefined;
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;
  const skip = page && limit ? (page - 1) * limit : undefined;

  // New filters
  const categoryId = searchParams.get("category") ?? undefined;
  const priceMinParam = searchParams.get("priceMin");
  const priceMaxParam = searchParams.get("priceMax");
  const priceMin = priceMinParam !== null ? parseFloat(priceMinParam) : undefined;
  const priceMax = priceMaxParam !== null ? parseFloat(priceMaxParam) : undefined;
  const sort = searchParams.get("sort");

  // Build where clause
  const where: Record<string, unknown> = {
    AND: []
  };

  if (q) {
    (where.AND as unknown[]).push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (categoryId) {
    (where.AND as unknown[]).push({ categoryId });
  }
  if (priceMin !== undefined && !isNaN(priceMin)) {
    (where.AND as unknown[]).push({ price: { gte: priceMin } });
  }
  if (priceMax !== undefined && !isNaN(priceMax)) {
    (where.AND as unknown[]).push({ price: { lte: priceMax } });
  }

  // If no filters at all, return empty
  if (!q && !categoryId && priceMin === undefined && priceMax === undefined) {
    return NextResponse.json({ products: [], total: 0 });
  }

  // Only apply skip/take if limit is present
  const findManyArgs: Prisma.ProductFindManyArgs = {
    where,
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  };
  if (sort === 'asc' || sort === 'desc') {
    findManyArgs.orderBy = { price: sort };
  }
  if (limit !== undefined) findManyArgs.take = limit;
  if (skip !== undefined) findManyArgs.skip = skip;

  const [products, total] = await Promise.all([
    prisma.product.findMany(findManyArgs),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({
    products: (products as Array<{ id: string; name: string; price: number; images: string[] }>).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images[0] || "",
    })),
    total,
  });
} 