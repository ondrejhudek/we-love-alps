import { getRowByValue, updateRow } from "@/app/utils/database";
import { TableName, AnyTable } from "@/app/utils/types";

import View from "./view";

const Page = async ({
  params: { table, id },
}: {
  params: { table: TableName; id: string };
}) => {
  const data = await getRowByValue<AnyTable>(table, "id", id);

  return <View table={table} id={id} data={data} />;
};

export default Page;
