import mongoClient from "@/app/mongodb/client";
import { TripProps, VideoProps } from "@/app/utils/types";

import Content, { VideoContentProps } from "./content";

const Page = async () => {
  const client = await mongoClient;
  const db = client.db("app");

  const videosData = await db
    .collection<VideoProps>("videos")
    .find({}, { projection: { _id: 0 } })
    .limit(100)
    .toArray();
  const tripsData = await db
    .collection<TripProps>("trips")
    .find(
      {
        id: {
          $in: videosData.map(({ tripId }) => tripId),
        },
      },
      { projection: { _id: 0 } }
    )
    .limit(100)
    .toArray();

  const data = videosData.reduce<VideoContentProps[]>((acc, video) => {
    const trip = tripsData.find(({ id }) => id === video.tripId);
    if (trip) acc.push({ ...video, title: trip.title, year: trip.year });
    return acc;
  }, []);

  return <Content data={data} />;
};

export default Page;
