import { getFolders, getFolderThumbnails } from "@/app/cloudinary/service";
import { GalleryFolderProps } from "@/app/cloudinary/types";
import Photogallery from "@/app/components/Photogallery";
import { getDocuments } from "@/app/mongodb";
import { TripProps } from "@/app/utils/types";

const Page = async () => {
  const [folderData, folderThumbnails, tripsData] = await Promise.all([
    getFolders(),
    getFolderThumbnails(),
    getDocuments<TripProps>("trips"),
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

  return <Photogallery folders={folders} tripsData={tripsData} />;
};

export default Page;
