import { getCount, getSchema } from "@/app/utils/database";

import View from "./view";

const Page = async () => {
  const [memberCount, tripCount, resortCount, videoCount, schema] =
    await Promise.all([
      getCount("member"),
      getCount("trip"),
      getCount("resort"),
      getCount("video"),
      getSchema(),
    ]);

  return (
    <View
      member={memberCount}
      trip={tripCount}
      resort={resortCount}
      video={videoCount}
      schema={schema}
    />
  );
};

export default Page;
