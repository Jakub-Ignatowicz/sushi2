import { Order, PostOrder } from "@/types/api";
import { fetchApi } from ".";

export const getOrders = async (page: number = 1, pageSize: number = 25) =>
  // fetchApi<Order[]>(
  //   `/orders?${new URLSearchParams({ page: `${page}`, pageSize: `${pageSize}` })}`,
  // );
  {
    const res = await fetch("http://backend:5152/api/orders");
    console.log("res", res);

    return (await res.json()) as Order[];
  };

export const getNewOrders = () => fetchApi<Order[]>("orders/new");

export const createOrder = (order: PostOrder) =>
  fetchApi<Order>("orders", "POST", { body: JSON.stringify(order) });

export const getInProgressOrders = () =>
  fetchApi<Order[]>("orders/in-progress");
