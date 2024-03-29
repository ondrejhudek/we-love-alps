import Data from "@/app/components/data/Documents";
import { Member } from "@/app/utils/types";

import View from "./view";

const Page = async () => (
  <Data<Member>
    tableName="member"
    orderBy={[{ column: "id" }]}
    viewComponent={View}
  />
);

export default Page;
