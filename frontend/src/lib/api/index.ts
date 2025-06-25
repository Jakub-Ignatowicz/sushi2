import { toast } from "sonner";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5152";
export const API_URL = `${API_BASE_URL}/api`;
export const IMAGES_URL = `${API_BASE_URL}/images`;

// TODO; frontend middlewear
export const fetchApi = async <T>(
  endpoint: string,
  requestType: "GET" | "POST" | "PATCH" | "PUT" = "GET",
  options?: RequestInit,
): Promise<T | undefined> => {
  try {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");
    const res = await fetch(`${API_URL}/${normalizedEndpoint}`, {
      method: requestType,
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      toast.error(`Niestety wystąpił błąd: ${res.status}`);
      return;
    }

    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.error(err);
    toast.error("Niestety wystąpił błąd: 500", {
      description: [err instanceof Error ? err.message : "Unexpected error"],
    });
  }
};
