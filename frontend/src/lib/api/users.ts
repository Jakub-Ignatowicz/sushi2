import { PostUser } from "@/types/api";
import { fetchApi } from ".";

export const createUser = async (user: PostUser) =>
  await fetchApi<string>("/users", "POST", {
    body: JSON.stringify(user),
  });
