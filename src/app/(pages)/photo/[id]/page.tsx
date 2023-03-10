import { notFound } from "next/navigation";

import { getImages } from "@/app/cloudinary/service";
import Photoalbum from "@/app/components/Photoalbum";

import TRIPS from "@/data/trips";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const trip = TRIPS.find((trip) => trip.id === id);
  const images = await getImages(id);

  if (!trip) {
    notFound();
  }

  return <Photoalbum images={images} />;
};

export default Page;
