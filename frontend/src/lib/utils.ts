import { Address, Category, Product } from "@/types/api";
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

export type AggregatedCategory = Category & {
  products: Product[];
};
export type AggregatedProducts = {
  category: Category;
  products: Product[];
};

export function categorizieProducts(
  products: Product[],
): AggregatedCategory[] {
  const lookup: Record<string, AggregatedCategory> = {};

  for (const product of products) {
    for (const category of product.categories) {
      if (!lookup[category.id])
        lookup[category.id] = { ...category, products: [] };
      lookup[category.id].products.push(product);
    }
  }

  return Object.values(lookup)
    .map((cat) => {
      cat.products.sort((a, b) => a.name.localeCompare(b.name));
      return cat;
    })
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

// export const getImageUrl = (imageName: string): string =>
//   `${IMAGES_URL}/${imageName}`;
