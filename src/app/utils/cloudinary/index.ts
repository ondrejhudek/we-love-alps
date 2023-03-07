export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const API_KEY = process.env.CLOUDINARY_API_KEY;
export const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const getBasePath = (path: string) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/${path}`;

export const IMAGE_BASE_PATH = getBasePath("image/upload");
