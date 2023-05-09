import Alert from "@/app/components/Alert";
import {
  TableName,
  AnyTableColumn,
  getRowsByValues,
} from "@/app/utils/database";

const DocumentsByValues = async <T extends object>({
  tableName,
  column,
  values,
  viewComponent: View,
  withError = false,
}: {
  tableName: TableName;
  column: AnyTableColumn;
  values: string[];
  viewComponent: React.FC<{ data: T[] }>;
  withError: boolean;
}) => {
  const data = await getRowsByValues<T>(tableName, column, values);

  if (!data || !data.length)
    return withError ? (
      <Alert
        title="Něco se pokazilo!"
        description="Bohužel se stránka rozbila. Prosím zkus to znovu."
      />
    ) : null;

  return <View data={data} />;
};

export default DocumentsByValues;
