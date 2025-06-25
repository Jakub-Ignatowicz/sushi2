import { Product } from "@/types/api";
import { fetchApi } from ".";

export const getProducts = () => fetchApi<Product[]>("products");

export const updateProduct = (product: Product) =>
  fetchApi<Product>(`products/${product.id}`, "POST", {
    body: JSON.stringify(product),
  });

export const createProduct = (product: Product) =>
  fetchApi<Product>("products", "POST", {
    body: JSON.stringify(product),
  });
