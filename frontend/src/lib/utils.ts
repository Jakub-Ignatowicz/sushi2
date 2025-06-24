import { Address, Product } from "@/types/api";
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

  for (const products of Object.values(aggregated)) {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  return Object.fromEntries(
    Object.entries(aggregated).sort(
      (a, b) => categoryOrder[a[0]] - categoryOrder[b[0]],
    ),
  );
}
