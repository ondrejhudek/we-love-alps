import { getCount } from "@/app/utils/database";

import View from "./view";

const Page = async () => {
  const [memberCount, tripCount, resortCount, videoCount] = await Promise.all([
    getCount("member"),
    getCount("trip"),
    getCount("resort"),
    getCount("video"),
  ]);

  return (
    <View
      member={memberCount}
      trip={tripCount}
      resort={resortCount}
      video={videoCount}
    />
  );
};

export default Page;
