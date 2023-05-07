import Alert from "@/app/components/Alert";
import { TableName, getRows } from "@/app/utils/database";

const Documents = async <T extends object>({
  tableName,
  viewComponent: View,
}: {
  tableName: TableName;
  viewComponent: React.FC<{ data: T[] }>;
}) => {
  const data = await getRows<T>(tableName);

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
