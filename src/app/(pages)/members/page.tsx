import Data from "@/app/data/Documents";
import { Member } from "@/app/utils/types";

import View from "./view";

const Page = async () => (
  // @ts-expect-error Server Component
  <Data<Member> tableName="member" viewComponent={View} />
);

export default Page;
