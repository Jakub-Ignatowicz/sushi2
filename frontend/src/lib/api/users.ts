import { PostUser } from "@/types/api";
import { fetchApi } from ".";

export const createUser = (user: PostUser) =>
  fetchApi.POST<string>("/users", {
    body: JSON.stringify(user),
  });
