import mongoClient from "@/app/mongodb/client";
import { ResortProps } from "@/app/utils/types";

import Content from "./content";

const Page = async () => {
  const client = await mongoClient;
  const db = client.db("app");

  const data = await db
    .collection<ResortProps>("resorts")
    .find({}, { projection: { _id: 0 } })
    .limit(100)
    .toArray();

  return <Content data={data} />;
};

export default Page;
