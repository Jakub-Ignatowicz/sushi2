import { Category } from "@/types/api";
import { fetchApi } from ".";

export const getCategories = async () => fetchApi<Category[]>("/categories");
