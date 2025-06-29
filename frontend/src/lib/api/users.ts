import { PostUser } from "@/types/api";
import { fetchApi } from ".";

const createUser = (user: PostUser) =>
  fetchApi.POST<string>("/users", {
    body: JSON.stringify(user),
  });

export const createUserGuest = (guest: PostUser["guest"]) =>
  createUser({ guest });

export const createUserNormal = (normal: PostUser["normal"]) =>
  createUser({ normal });
