import { getDocuments } from "@/app/mongodb";
import { ResortProps } from "@/app/utils/types";

import Content from "./content";

const Page = async () => {
  const data = await getDocuments<ResortProps>("resorts");
  return <Content data={data} />;
};

export default Page;
