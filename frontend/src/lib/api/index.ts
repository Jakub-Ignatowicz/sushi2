import { env } from "next-runtime-env";
import { toast } from "sonner";

export const API_URL =
  env("NEXT_PUBLIC_API_URL") || "http://localhost:5152/api";

export interface IProblemDetails {
  detail?: string;
  title?: string;
  status?: number;
  [key: string]: any;
}

export class ProblemDetails extends Error {
  detail: string;
  title: string;
  status: number;
  [key: string]: any;

  constructor(data: any) {
    super(data.detail || "An error occurred");
    this.title = data.title || "Error";
    this.status = data.status || 500;
    this.detail = data.detail || "An error occurred";
    Object.assign(this, data);
  }
}

type RequestMethod = "GET" | "POST" | "PATCH" | "PUT";

export const fetchApi = {
  request: async <T>(
    endpoint: string,
    requestType: RequestMethod = "GET",
    options?: RequestInit,
  ): Promise<T> => {
    const url = `${API_URL}/${endpoint.replace(/^\//, "")}`;

    const response = await fetch(url, {
      method: requestType,
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ProblemDetails(data) as T;
    }

    return data as T;
  },

  GET: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "GET", options),
  POST: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "POST", options),
  PATCH: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "PATCH", options),
  PUT: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "PUT", options),
};

// decorator pattern
export const withToast = async <T>(
  fn: () => Promise<T>,
): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof StatusError) {
      toast.error(error.statusCode, {
        description: error.message,
      });
      return;
    }

    if (error instanceof Error) {
      toast.error("Unknown error", {
        description: error.message,
      });
    }
  }
};
