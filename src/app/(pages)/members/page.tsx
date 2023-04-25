import Data from "@/app/data/Documents";

import View from "./view";

const Page = async () => (
  // @ts-expect-error Server Component
  <Data collectionName="members" viewComponent={View} />
);

export default Page;
