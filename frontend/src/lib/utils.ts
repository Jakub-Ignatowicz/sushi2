import { Address, Category, Product } from "@/types/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const FEATURED_CATEGORY_ID = "1054bce1-b6ab-4d1b-85d7-3760dc1c7291";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function priceToString(price: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
}

export function addressToString(address: Address): string {
  return `ul. ${address.street} ${address.homeNumber}${address.apartmentNumber ? `/${address.apartmentNumber}` : ""}`;
}

export function formatDate(date: Date): string {
  return (
    new Date(date).toLocaleDateString("pl-PL") +
    " " +
    new Date(date).toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
}

export type AggregatedCategory = {
  products: Product[];
} & Category;

export function categorizeProducts(
  products: Product[],
  withFeatured = false,
): AggregatedCategory[] {
  const lookup: Record<string, AggregatedCategory> = {};

  for (const product of products) {
    const category = product.category;
    if (!lookup[category.id])
      lookup[category.id] = { ...category, products: [] };
    lookup[category.id].products.push(product);
  }

  if (withFeatured) {
    const featuredProducts = products.filter((p) => p.isFeatured);

    if (featuredProducts.length > 0) {
      const featuredCategory: AggregatedCategory = {
        id: FEATURED_CATEGORY_ID,
        name: "Wyróżnione",
        orderIndex: -999,
        products: featuredProducts,
      };

      lookup[FEATURED_CATEGORY_ID] = featuredCategory;
    }
  }

  return Object.values(lookup)
    .map((cat) => {
      cat.products.sort((a, b) => a.name.localeCompare(b.name));
      return cat;
    })
    .sort((a, b) => a.orderIndex - b.orderIndex);
}
