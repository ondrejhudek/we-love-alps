import { getDocuments } from "@/app/mongodb";
import { TripProps, VideoProps } from "@/app/utils/types";

import View, { VideoViewProps } from "./view";

const Page = async () => {
  const [videosData, tripsData] = await Promise.all([
    getDocuments<VideoProps>("videos"),
    getDocuments<TripProps>("trips"),
  ]);

  const sql = `INSERT INTO videos (tripId, youtubeId) VALUES ${videosData
    .map((item) => {
      return `('${item.tripId}', '${item.youtubeId}')`;
    })
    .join(",")};`;
  console.log(sql);

  const data = videosData.reduce<VideoViewProps[]>((acc, video) => {
    const trip = tripsData.find(({ id }) => id === video.tripId);
    if (trip) acc.push({ ...video, title: trip.title, year: trip.year });
    return acc;
  }, []);

  return <View data={data} />;
};

export default Page;
