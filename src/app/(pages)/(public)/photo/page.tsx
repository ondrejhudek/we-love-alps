import { list } from "@vercel/blob";

import Header from "@/app/components/Header";
import Photogallery from "@/app/components/Photogallery";
import { getRows } from "@/app/utils/database";
import { Trip } from "@/app/utils/types";

const Page = async () => {
  const [tripsData, { folders }] = await Promise.all([
    getRows<Trip>("trip"),
    list({
      prefix: "photogallery/",
      mode: "folded",
    }),
  ]);

  const tripsWithPhotos = tripsData
    .filter((trip) =>
      folders.find(
        (folder) =>
          folder.substring(folder.indexOf("/") + 1, folder.lastIndexOf("/")) ===
          trip.id
      )
    )
    .sort((a, b) => b.year - a.year);

  return (
    <>
      <Header />
      <Photogallery tripsData={tripsWithPhotos} />
    </>
  );
};

export default Page;
