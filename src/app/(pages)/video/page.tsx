import { getRows } from "@/app/utils/kysely";
import { TripProps, VideoProps } from "@/app/utils/types";

import View, { VideoViewProps } from "./view";

const Page = async () => {
  const [videosData, tripsData] = await Promise.all([
    getRows<VideoProps>("videos"),
    getRows<TripProps>("trips"),
  ]);

  const data = videosData.reduce<VideoViewProps[]>((acc, video) => {
    const trip = tripsData.find(({ id }) => id === video.trip_id);
    if (trip) acc.push({ ...video, title: trip.title, year: trip.year });
    return acc;
  }, []);

  return <View data={data} />;
};

export default Page;
