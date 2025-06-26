import { env } from "next-runtime-env";
import { toast } from "sonner";

export const API_URL = env("NEXT_PUBLIC_API_URL") || "http://localhost:5152";

export class StatusError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "StatusError";
    this.statusCode = statusCode;
  }
}

export const fetchApi = async <T>(
  endpoint: string,
  requestType: "GET" | "POST" | "PATCH" | "PUT" = "GET",
  options?: RequestInit,
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method: requestType,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new StatusError(
      `API error: ${response.status} ${response.statusText} - ${errorText}`,
      response.status,
    );
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  } else {
    throw new StatusError("Unexpected content type", response.status);
  }
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
