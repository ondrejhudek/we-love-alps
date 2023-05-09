import Data from "@/app/data/Documents";
import { Resort } from "@/app/utils/types";

import View from "./view";

const Page = async () => (
  // @ts-expect-error Server Component
  <Data<Resort> tableName="resort" viewComponent={View} />
);

export default Page;
