import Alert from "@/app/components/Alert";
import { getRows } from "@/app/utils/database";
import { TableName, OrderBy } from "@/app/utils/types";

const Documents = async <T extends object>({
  tableName,
  orderBy,
  viewComponent: View,
}: {
  tableName: TableName;
  orderBy?: OrderBy[];
  viewComponent: React.FC<{ data: T[] }>;
}) => {
  const data = await getRows<T>(tableName, orderBy);

  if (!data?.length)
    return (
      <Alert
        title="Něco se pokazilo!"
        description="Bohužel se stránka rozbila. Prosím zkus to znovu."
      />
    );

  return <View data={data} />;
};

export default Documents;
