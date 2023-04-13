import mongoClient from "@/app/mongodb/client";
import { MemberProps } from "@/app/utils/types";

import Content from "./content";

const Page = async () => {
  const client = await mongoClient;
  const db = client.db("app");

  const data = await db
    .collection<MemberProps>("members")
    .find()
    .limit(100)
    .toArray();
  const parsedData = JSON.parse(JSON.stringify(data));

  return <Content data={parsedData} />;
};

export default Page;
