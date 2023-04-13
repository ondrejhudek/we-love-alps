import { notFound } from "next/navigation";

import mongoClient from "@/app/mongodb/client";
import { MemberProps } from "@/app/utils/types";

import Content from "./content";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const client = await mongoClient;
  const db = client.db("app");

  const data = await db.collection<MemberProps>("members").findOne({ id });

  if (!data) {
    notFound();
  }

  const parsedData = JSON.parse(JSON.stringify(data));

  return <Content data={parsedData} />;
};

export default Page;
