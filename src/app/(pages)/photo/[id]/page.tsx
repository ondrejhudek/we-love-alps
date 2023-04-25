import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import { getImages } from "@/app/cloudinary/service";
import Photoalbum from "@/app/components/Photoalbum";
import { getDocumentById } from "@/app/mongodb";
import { TripProps } from "@/app/utils/types";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const [data, images] = await Promise.all([
    getDocumentById<TripProps>("trips", id),
    getImages(id),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header label={data.title} />
      <Photoalbum images={images} />
    </>
  );
};

export default Page;
