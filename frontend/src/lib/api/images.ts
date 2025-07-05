import { API_URL } from ".";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};
