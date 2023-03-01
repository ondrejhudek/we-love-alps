import Header from "@/app/components/Header";
import Photogallery from "@/app/components/Photogallery";
import { getFolders, getImages } from "@/app/utils/cloudinary";

const Page = async () => {
  const folderData = await getFolders();

  const folders = await Promise.all(
    folderData.folders
      .sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      })
      .map(async ({ path }) => {
        const image = await getImages(path, 1);
        return {
          path,
          ...image,
        };
      })
  );

  return (
    <>
      <Header />
      <Photogallery folders={folders} />
    </>
  );
};

export default Page;
