import { API_URL } from ".";

type postImageDTO = {
  fileName: string;
  url: string;
};

export const uploadImage = async (file: File): Promise<postImageDTO> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/images/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return res.json();
};
