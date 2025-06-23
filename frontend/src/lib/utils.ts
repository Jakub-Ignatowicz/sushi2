import { Product } from "@/types/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function priceToString(price: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
}

export type AggregatedProducts = {
  [categoryName: string]: Product[];
};

export function groupProductsByCategory(
  products: Product[],
): AggregatedProducts {
  const categoryOrder: Record<string, number> = {};
  const aggregated: AggregatedProducts = {};

  for (const product of products) {
    for (const category of product.categories) {
      categoryOrder[category.name] = category.orderIndex;
      (aggregated[category.name] ??= []).push(product);
    }
  }

  return Object.fromEntries(
    Object.entries(aggregated).sort(
      (a, b) => categoryOrder[a[0]] - categoryOrder[b[0]],
    ),
  );
}
