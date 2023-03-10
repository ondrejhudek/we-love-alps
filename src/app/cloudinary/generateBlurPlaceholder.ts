import { IMAGE_BASE_PATH } from ".";
import { ImageProps } from "./types";

const cache = new Map<ImageProps, string>();

export const getBlurredUrl = (publicId: string, params: string) =>
  `${IMAGE_BASE_PATH}/${params}/${publicId}`;

const getBase64ImageUrl = async (
  image: ImageProps
): Promise<string | undefined> => {
  let url = cache.get(image);
  if (url) {
    return url;
  }

  const response = await fetch(
    getBlurredUrl(image.public_id, "w_100,e_blur:1000,q_auto,f_webp")
  );

  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString("base64");

  url = `data:image/webp;base64,${data}`;
  cache.set(image, url);
  return url;
};

export default getBase64ImageUrl;
