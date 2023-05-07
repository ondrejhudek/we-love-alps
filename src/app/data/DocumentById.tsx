import { TableName, getRowById } from "@/app/utils/database";

import Alert from "@/app/components/Alert";

const Document = async <T extends { id: string }>({
  tableName,
  id,
  viewComponent: View,
}: {
  tableName: TableName;
  id: string;
  viewComponent: React.FC<{ data: T }>;
}) => {
  const data = await getRowById<T>(tableName, id);

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
