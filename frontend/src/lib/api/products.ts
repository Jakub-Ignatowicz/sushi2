import { Product } from "@/types/api";
import { fetchApi } from ".";

export const getProducts = () =>
  fetchApi<Product[]>("products", {
    method: "GET",
  });

export const updateProduct = (product: Product) =>
  fetchApi<Product>(`products/${product.id}`, {
    method: "POST",
    body: JSON.stringify(product),
  });

export const createProduct = (product: Product) =>
  fetchApi<Product>("products", {
    method: "POST",
    body: JSON.stringify(product),
  });
