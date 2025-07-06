import { Category, CategoryPost } from "@/types/api";
import { fetchApi } from ".";

export const createCategory = async (dto: CategoryPost) =>
  fetchApi.POST<Category>("/categories", { body: JSON.stringify(dto) });

export const editCategory = async (categoryId: string, dto: CategoryPost) =>
  fetchApi.PUT<Category>(`/categories/${categoryId}`, {
    body: JSON.stringify(dto),
  });

export const getCategories = async () =>
  fetchApi.GET<Category[]>("/categories");

export const updateCategoryOrder = async (categories: string[]) =>
  fetchApi.POST("/categories/order", { body: JSON.stringify(categories) });

export const changeCategoryName = async (id: string, name: string) =>
  fetchApi.PATCH(`/categories/${id}`, { body: JSON.stringify(name) });

export const deleteCategory = async (id: string) =>
  fetchApi.DELETE(`/categories/${id}`);
