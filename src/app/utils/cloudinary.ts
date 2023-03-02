const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const getPath = (path: string) =>
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${path}`;

const ENDPOINTS = {
  folders: getPath("folders"),
  thumbnails: getPath("resources/image/tags/gallery_thumbnail?max_results=100"),
  images: getPath("resources/image/upload?prefix={{folder}}&max_results=500"),
};

const HEADERS = {
  "Content-Type": "application/json",
  Authorization:
    "Basic " + Buffer.from(API_KEY + ":" + API_SECRET).toString("base64"),
};

export type FolderProps = { name: string; path: string };

interface FolderData {
  total_count: number;
  folders: FolderProps[];
}

export type ImageProps = {
  asset_id: string;
  public_id: string;
  url: string;
  width: number;
  height: number;
  folder: string;
};

interface ImageData {
  // total_count: number; // TODO: Find out how to get it back
  resources: ImageProps[];
}

export interface GalleryFolderProps {
  path: string;
  thumbnailImage?: ImageProps;
}

/**
 * Processes fetched response.
 * If response is not OK, it throws an error.
 * Otherwise returns response data.
 * @param res Fetch response
 * @returns Promise with response data.
 */
const processResponse = <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    console.error(`${res.status} - ${res.statusText}`);
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<T>;
};

/**
 * Retrives all folders.
 * @returns Promise with a list of folders.
 */
export const getFolders = async () => {
  const res = await fetch(ENDPOINTS.folders, {
    headers: HEADERS,
  });

  return processResponse<FolderData>(res);
};

/**
 * Retrives thumbnail image for each folder. Image has to have a `gallery_thumbnail` tag.
 * @returns Promise with image resources
 */
export const getFolderThumbnails = async () => {
  const res = await fetch(ENDPOINTS.thumbnails, {
    headers: HEADERS,
  });

  return processResponse<ImageData>(res);
};

/**
 * Retrives all images within a specified folder.
 * @param folder Folder path
 * @returns Promise with image resources
 */
export const getImages = async (folder: string) => {
  const res = await fetch(ENDPOINTS.images.replace("{{folder}}", folder), {
    headers: HEADERS,
  });

  return processResponse<ImageData>(res);
};
