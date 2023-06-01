import Data from "@/app/components/data/Documents";
import { Resort } from "@/app/utils/types";

import View from "./view";

const Page = async () => (
  <Data<Resort>
    tableName="resort"
    orderBy={[{ column: "name" }]}
    viewComponent={View}
  />
);

export default Page;
