import Alert from "@/app/components/Alert";
import Header from "@/app/components/Header";
import Photoalbum from "@/app/components/Photoalbum";
import { getImages } from "@/app/utils/cloudinary";

import TRIPS from "@/data/trips";

const Page = async ({ params: { id } }: { params: { id: string[] } }) => {
  const tripId = id[0];
  const trip = TRIPS.find((trip) => trip.id === tripId);
  const images = await getImages(tripId);

  if (!trip)
    return (
      <Alert
        title="Toto fotogalerie neexistuje."
        description="Běž zpět a vyber jiný."
        button={{
          path: "/photo",
          label: "Zpět na Fotky",
        }}
      />
    );

  return (
    <>
      <Header name={trip?.title} />
      <Photoalbum images={images.resources} />
    </>
  );
};

export default Page;
