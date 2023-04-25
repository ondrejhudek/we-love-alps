import { ResortProps } from "@/app/utils/types";

import Data from "@/app/data/Documents";

import View from "./view";

const Page = async () => (
  // @ts-expect-error Server Component
  <Data<ResortProps> collectionName="resorts" viewComponent={View} />
);

export default Page;
