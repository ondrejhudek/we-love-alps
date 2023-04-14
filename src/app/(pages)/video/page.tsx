import { getDocuments } from "@/app/mongodb";
import { TripProps, VideoProps } from "@/app/utils/types";

import Videos, { VideoContentProps } from "./components/Videos";

const Page = async () => {
  const [videosData, tripsData] = await Promise.all([
    getDocuments<VideoProps>("videos"),
    getDocuments<TripProps>("trips"),
  ]);

  const data = videosData.reduce<VideoContentProps[]>((acc, video) => {
    const trip = tripsData.find(({ id }) => id === video.tripId);
    if (trip) acc.push({ ...video, title: trip.title, year: trip.year });
    return acc;
  }, []);

  return <Videos data={data} />;
};

export default Page;
