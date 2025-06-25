export const API_BASE_URL = "http://localhost:5152";
export const API_URL = `${API_BASE_URL}/api`;
export const IMAGES_URL = `${API_BASE_URL}/images`;

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
    const res = await fetch(`${API_URL}/${normalizedEndpoint}`, {
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
