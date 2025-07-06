import { env } from "next-runtime-env";
import { toast } from "sonner";
import { authRefresh } from "./auth";

export const HOST_URL = env("NEXT_PUBLIC_HOST_URL") || "http://localhost:5152";

export const API_URL = HOST_URL + "/api";
export const IMAGES_URL = HOST_URL + "/images/";

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

async function parseResponse(response: Response): Promise<any> {
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}

const prepareOptions = async (options?: RequestInit): Promise<RequestInit> => {
  const newOptions = { ...options };

  const isFormData = newOptions.body instanceof FormData;

  if (newOptions.body && typeof newOptions.body !== "string" && !isFormData) {
    newOptions.body = JSON.stringify(newOptions.body);
  }

  let cookie;
  if (typeof window === "undefined") {
    const cookieStore = await (await import("next/headers")).cookies();
    cookie = cookieStore.toString();
  }

  newOptions.headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Cookie: cookie || "",
    ...(newOptions.headers || {}),
  };

  return newOptions;
};

type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export const fetchApi = {
  request: async <T>(
    endpoint: string,
    requestType: RequestMethod = "GET",
    options?: RequestInit,
    isRetry = false,
  ): Promise<T> => {
    try {
      let url;
      if (endpoint.startsWith("http")) {
        url = endpoint;
      } else {
        url = `${API_URL}/${endpoint.replace(/^\//, "")}`;
      }

      const response = await fetch(url, {
        method: requestType,
        credentials: "include",
        ...(await prepareOptions(options)),
      });

      if (response.status == 401 && !isRetry) {
        const refreshed = await authRefresh();
        if (refreshed) {
          return fetchApi.request<T>(endpoint, requestType, options, true);
        }
      }

      const data = await parseResponse(response);
      if (!response.ok) {
        throw new ProblemDetails(data);
      }

      return data as T;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  GET: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "GET", options),
  POST: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "POST", options),
  PATCH: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "PATCH", options),
  PUT: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "PUT", options),
  DELETE: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi.request<T>(endpoint, "DELETE", options),
};

// decorator pattern
export const withToast = async <T>(
  fn: () => Promise<T>,
): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ProblemDetails) {
      toast.error(error.status, {
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

export const getImageUrl = (imageName: string) => IMAGES_URL + imageName;
