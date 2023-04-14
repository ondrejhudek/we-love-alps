import { getDocuments } from "@/app/mongodb";
import { MemberProps } from "@/app/utils/types";

import Content from "./content";

const Page = async () => {
  const data = await getDocuments<MemberProps>("members");
  return <Content data={data} />;
};

export default Page;
