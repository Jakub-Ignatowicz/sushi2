import { Category } from "@/types/api";
import { fetchApi } from ".";

export const getCategories = async () =>
  fetchApi.GET<Category[]>("/categories");

export const updateCategoryOrder = async (categories: string[]) =>
  fetchApi.POST("/categories/order", { body: JSON.stringify(categories) });

export const changeCategoryName = async (id: string, name: string) =>
  fetchApi.PATCH(`/categories/${id}`, { body: JSON.stringify(name) });
