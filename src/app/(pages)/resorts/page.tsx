import Data from "@/app/data/Documents";
import { ResortProps } from "@/app/utils/types";

import View from "./view";

const Page = async () => (
  // @ts-expect-error Server Component
  <Data<ResortProps> tableName="resorts" viewComponent={View} />
);

export default Page;
