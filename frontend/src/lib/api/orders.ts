import { Order } from "@/types/api";
import { fetchApi } from ".";

export const getOrders = () => fetchApi<Order[]>("orders");

export const getNewOrders = () => fetchApi<Order[]>("orders/new");

export const getInProgressOrders = () =>
  fetchApi<Order[]>("orders/in-progress");
