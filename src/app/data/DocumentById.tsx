import Alert from "@/app/components/Alert";
import { TableName, getRowByValue } from "@/app/utils/database";

const Document = async <T extends { id: string }>({
  tableName,
  id,
  viewComponent: View,
}: {
  tableName: TableName;
  id: string;
  viewComponent: React.FC<{ data: T }>;
}) => {
  const data = await getRowByValue<T>(tableName, "id", id);

  if (!data)
    return (
      <Alert
        title="Něco se pokazilo!"
        description="Bohužel se stránka rozbila. Prosím zkus to znovu."
      />
    );

  return <View data={data} />;
};

export default Document;
