import { Product } from "@/types/api";
import { fetchApi } from ".";

export const getProducts = () => fetchApi.GET<Product[]>("products");

export const getAvailableProducts = () =>
  fetchApi.GET<Product[]>("products/available");

export const getProductsRange = (productIds: string[]) =>
  fetchApi.POST<Product[]>("products/range", {
    body: JSON.stringify(productIds),
  });

export const updateProduct = (product: Product) =>
  fetchApi.PUT<Product>(`products/${product.id}`, {
    body: JSON.stringify(product),
  });

export const createProduct = (product: Product) =>
  fetchApi.POST<Product>("products", {
    body: JSON.stringify(product),
  });

export const deleteProduct = (productId: string) =>
  fetchApi.DELETE(`products/${productId}`);

export const featureProduct = (productId: string, featured: boolean) =>
  fetchApi.PATCH<Product>(`products/${productId}/featured`, {
    body: JSON.stringify(featured),
  });

export const availableProduct = (productId: string, available: boolean) =>
  fetchApi.PATCH<Product>(`products/${productId}/available`, {
    body: JSON.stringify(available),
  });
