const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const getEndpoint = (path: string) =>
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${path}`;

const ENDPOINTS = {
  folders: getEndpoint("folders"),
  images: getEndpoint("resources/search"),
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
  src: string;
  public_id: string;
  url: string;
  width: number;
  height: number;
  aspect_ratio: number;
};

interface ImageData {
  total_count: number;
  resources: ImageProps[];
}

export type GalleryFolderProps = ImageData & { path: string };

const processResponse = <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<T>;
};

export const getFolders = async () => {
  const res = await fetch(ENDPOINTS.folders, {
    headers: HEADERS,
  });

  return processResponse<FolderData>(res);
};

export const getImages = async (folder: string, max_results?: number) => {
  const res = await fetch(ENDPOINTS.images, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      expression: `resource_type:image AND folder=${folder}`,
      sort_by: [{ public_id: "desc" }],
      max_results: max_results || 100,
    }),
  });

  return processResponse<ImageData>(res);
};
