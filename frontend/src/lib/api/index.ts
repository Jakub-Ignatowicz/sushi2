import { env } from "next-runtime-env";
import { toast } from "sonner";

export const API_URL = env("NEXT_PUBLIC_API_URL") || "http://localhost:5152";

// TODO; frontend middlewear
export const fetchApi = async <T>(
  endpoint: string,
  requestType: "GET" | "POST" | "PATCH" | "PUT" = "GET",
  options?: RequestInit,
): Promise<T | undefined> => {
  try {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");
    console.log(`Fetching API: ${API_URL}/${normalizedEndpoint}`);
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
