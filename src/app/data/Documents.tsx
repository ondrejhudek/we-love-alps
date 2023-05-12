import Alert from "@/app/components/Alert";
import { getRows } from "@/app/utils/database";
import { Table, OrderBy } from "@/app/utils/types";

const Documents = async <T extends object>({
  tableName,
  orderBy,
  viewComponent: View,
}: {
  tableName: Table;
  orderBy?: OrderBy[];
  viewComponent: React.FC<{ data: T[] }>;
}) => {
  const data = await getRows<T>(tableName, orderBy);

  if (!data || !data.length)
    return (
      <Alert
        title="Něco se pokazilo!"
        description="Bohužel se stránka rozbila. Prosím zkus to znovu."
      />
    );

  return <View data={data} />;
};

export default Documents;
