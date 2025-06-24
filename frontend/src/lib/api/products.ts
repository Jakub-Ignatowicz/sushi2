import { Product } from "@/types/api";
import { fetchApi } from ".";

export const getProducts = () =>
  fetchApi<Product[]>("products", {
    method: "GET",
  });
