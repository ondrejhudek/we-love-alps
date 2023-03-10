import { v2 as cloudinary } from "cloudinary";

import { CLOUD_NAME, API_KEY, API_SECRET } from ".";
import generateBlurPlaceholder from "./generateBlurPlaceholder";
import { FolderData, ImageData } from "./types";

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

/**
 * Processes all images.
 * @param data Image data
 * @returns Processed Image data
 */
const processImages = async (data: ImageData) => {
  return await Promise.all(
    data.resources.map(async (resource) => ({
      ...resource,
      blurDataUrl: await generateBlurPlaceholder(resource),
    }))
  );
};

/**
 * Retrives all folders.
 * @returns Promise with a list of folders.
 */
export const getFolders = async () => {
  return (await cloudinary.api.sub_folders("gallery")) as FolderData;
};

/**
 * Retrives thumbnail image for each folder. Image has to have a `gallery_thumbnail` tag.
 * @returns Promise with image resources
 */
export const getFolderThumbnails = async () => {
  const data = (await cloudinary.api.resources_by_tag("gallery_thumbnail", {
    max_results: 100,
  })) as ImageData;

  return await processImages(data);
};

/**
 * Retrives all images within a specified folder.
 * @param folder Folder path
 * @returns Promise with image resources
 */
export const getImages = async (folder: string) => {
  const data = (await cloudinary.search
    .expression(`resource_type:image AND folder:gallery/${folder}/*`)
    .sort_by("public_id", "asc")
    .max_results(100)
    .execute()) as ImageData;

  return await processImages(data);
};
