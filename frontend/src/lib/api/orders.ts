import { Order, OrderStatus, OrderPost } from "@/types/api";
import { fetchApi } from ".";

export const getOrders = async (page: number = 1, pageSize: number = 25) =>
  fetchApi.GET<Order[]>(
    `/orders?${new URLSearchParams({ page: `${page}`, pageSize: `${pageSize}` })}`,
  );

export const getNewOrders = (...opts: any) =>
  fetchApi.GET<Order[]>("orders/new", opts);

export const createOrder = (order: OrderPost) =>
  fetchApi.POST<Order>("orders", { body: JSON.stringify(order) });

export const getInProgressOrders = () =>
  fetchApi.GET<Order[]>("orders/in-progress");

export const changeOrderStatus = (orderId: string, status: OrderStatus) =>
  fetchApi.POST<void>(`orders/${orderId}/status`, {
    body: JSON.stringify({ status }),
  });
