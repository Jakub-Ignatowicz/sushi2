import { Category } from "@/types/api";
import { fetchApi } from ".";

export const getCategories = async () => fetchApi<Category[]>("/categories");

export const updateCategoryOrder = async (categories: string[]) =>
  fetchApi("/categories/order", "POST", { body: JSON.stringify(categories) });

export const changeCategoryName = async (id: string, name: string) =>
  fetchApi(`/categories/${id}`, "PATCH", { body: JSON.stringify(name) });
