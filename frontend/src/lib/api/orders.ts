import { Order } from "@/types/api";
import { fetchApi } from ".";

export const getOrders = () => fetchApi<Order[]>("orders");
