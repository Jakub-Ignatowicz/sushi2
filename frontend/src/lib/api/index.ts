const BASE_URL = "http://localhost:5152/api";

type ErrorResponse = {
  status: "error";
  errors: string[];
};

export const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");
    const res = await fetch(`${BASE_URL}/${normalizedEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      const errorData = (await res.json()) as ErrorResponse;
      return { status: "error", errors: errorData.errors || ["Unknown error"] };
    }

    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      errors: [err instanceof Error ? err.message : "Unexpected error"],
    };
  }
};
