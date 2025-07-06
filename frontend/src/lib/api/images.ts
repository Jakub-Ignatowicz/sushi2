import { ImageUploadResponse } from "@/types/api";
import { fetchApi } from ".";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  return fetchApi.POST<ImageUploadResponse>("/images/upload", {
    body: formData,
  });
};
