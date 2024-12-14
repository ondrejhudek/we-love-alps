import { getRowByValue } from "@/app/utils/database";
import { TableName, AnyTable } from "@/app/utils/types";

import View from "./view";

type Params = Promise<{ table: TableName; id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { table, id } = await params;

  const data = await getRowByValue<AnyTable>(table, "id", id);
  return <View table={table} id={id} data={data} />;
};

export default Page;
