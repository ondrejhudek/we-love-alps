import Photogallery from "@/app/components/Photogallery";
import {
  getFolders,
  getFolderThumbnails,
} from "@/app/utils/cloudinary/service";
import { GalleryFolderProps } from "@/app/utils/cloudinary/types";

const Page = async () => {
  const [folderData, folderThumbnails] = await Promise.all([
    getFolders(),
    getFolderThumbnails(),
  ]);

  const folders: GalleryFolderProps[] = folderData.folders
    // Sort folder desc by name
    .sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    })
    .map(({ path }) => ({
      path,
      thumbnailImage: folderThumbnails.find(({ folder }) => folder === path),
    }));

  return <Photogallery folders={folders} />;
};

export default Page;
