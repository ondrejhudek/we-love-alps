import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import { getImages } from "@/app/cloudinary/service";
import Photoalbum from "@/app/components/Photoalbum";
import { getRowByValue } from "@/app/utils/database";
import { Trip } from "@/app/utils/types";

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const [data, images] = await Promise.all([
    getRowByValue<Trip>("trip", "id", id),
    getImages(id),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header label={data.title} badge={`${images.length} fotek`} />
      <Photoalbum images={images} />
    </>
  );
};

export default Page;
