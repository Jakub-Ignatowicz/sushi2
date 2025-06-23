import { Category } from "@/types/api";
import { fetchApi } from ".";

export const getCategories = async () => fetchApi<Category[]>("/categories");

export const updateCategoryOrder = async (categories: string[]) =>
  fetchApi("/categories/order", {
    method: "POST",
    body: JSON.stringify(categories),
  });
