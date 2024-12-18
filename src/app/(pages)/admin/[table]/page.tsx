import { getRows } from "@/app/utils/database";
import { TableName, AnyTable, OrderBy } from "@/app/utils/types";

import View from "./view";

const ORDER_BY: Record<TableName, OrderBy[]> = {
  activity: [{ column: "date", direction: "desc" }],
  member: [{ column: "id", direction: "asc" }],
  trip: [
    { column: "year", direction: "desc" },
    { column: "month", direction: "desc" },
  ],
  resort: [{ column: "id", direction: "asc" }],
  video: [{ column: "id", direction: "desc" }],
};

type Params = Promise<{ table: TableName }>;

const Page = async ({ params }: { params: Params }) => {
  const { table } = await params;

  const data = await getRows<AnyTable>(table, ORDER_BY[table]);

  return <View table={table} data={data} />;
};

export default Page;
