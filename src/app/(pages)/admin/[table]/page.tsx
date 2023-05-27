import { getRows } from "@/app/utils/database";
import { TableName, AnyTable } from "@/app/utils/types";

import View from "./view";

const Page = async ({
  params: { table },
}: {
  params: { table: TableName };
}) => {
  const data = await getRows<AnyTable>(table);

  return <View table={table} data={data} />;
};

export default Page;
