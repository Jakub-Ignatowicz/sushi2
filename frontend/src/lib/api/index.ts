import { ErrorResponse } from "@/types/api";

const BASE_URL = "http://localhost:5152/api";

export const fetchApi = async <T>(
  endpoint: string,
  requestType: "GET" | "POST" | "PATCH" | "PUT" = "GET",
  options?: RequestInit,
): Promise<T | ErrorResponse> => {
  try {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");
    const res = await fetch(`${BASE_URL}/${normalizedEndpoint}`, {
      method: requestType,
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      const errorData = (await res.json()) as ErrorResponse;
      return {
        status: res.status,
        errors: errorData.errors || ["Unknown error"],
      };
    }

    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      errors: [err instanceof Error ? err.message : "Unexpected error"],
    };
  }
};
