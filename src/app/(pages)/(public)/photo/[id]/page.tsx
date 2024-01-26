import { list } from "@vercel/blob";
import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import Photoalbum from "@/app/components/Photoalbum";
import { getRowByValue } from "@/app/utils/database";
import { Trip } from "@/app/utils/types";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const [data, { blobs: images }] = await Promise.all([
    getRowByValue<Trip>("trip", "id", id),
    list({
      prefix: `photogallery/${id}`,
    }),
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
