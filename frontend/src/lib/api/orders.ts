import { Order, OrderStatus, OrderPost } from "@/types/api";
import { fetchApi } from ".";

export const getOrders = async (page: any = 1, pageSize: any = 25) => {
  const params: Record<string, string> = {};
  if (page && page > 0) params.page = `${page}`;
  if (pageSize && pageSize > 0) params.pageSize = `${pageSize}`;

  const queryString = new URLSearchParams(params).toString();

  return fetchApi.GET<Order[]>(
    `/orders${queryString ? "?" + queryString : ""}`,
  );
};

export const getOrdersCount = () => fetchApi.GET<number>("orders/count");

export const getNewOrders = () => fetchApi.GET<Order[]>("orders/new");

export const createOrder = (order: OrderPost) =>
  fetchApi.POST<Order>("orders", { body: JSON.stringify(order) });

export const getInProgressOrders = () =>
  fetchApi.GET<Order[]>("orders/in-progress");

export const changeOrderStatus = (orderId: string, status: OrderStatus) =>
  fetchApi.POST<void>(`orders/${orderId}/status`, {
    body: JSON.stringify({ status }),
  });
