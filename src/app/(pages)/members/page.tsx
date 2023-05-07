import Data from "@/app/data/Documents";
import { MemberProps } from "@/app/utils/types";

import View from "./view";

const Page = async () => (
  // @ts-expect-error Server Component
  <Data<MemberProps> tableName="members" viewComponent={View} />
);

export default Page;
