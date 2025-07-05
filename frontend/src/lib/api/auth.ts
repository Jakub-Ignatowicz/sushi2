import { AuthResponse } from "@/types/api";
import { fetchApi } from ".";

export const authLogin = async (username: string, password: string) =>
  fetchApi.POST<AuthResponse>("/auth/login", {
    body: JSON.stringify({ username, password }),
  });

export const authRefresh = async () => {
  try {
    await fetchApi.request("/auth/refresh", "POST", undefined, true);
    return true;
  } catch {
    return false;
  }
};

export const authMe = async () => fetchApi.POST<AuthResponse>("/auth/me");
