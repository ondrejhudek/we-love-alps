import { notFound } from "next/navigation";

import { getDocumentById } from "@/app/mongodb";
import { MemberProps } from "@/app/utils/types";

import Content from "./content";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getDocumentById<MemberProps>("members", id);

  if (!data) {
    notFound();
  }

  return <Content data={data} />;
};

export default Page;
