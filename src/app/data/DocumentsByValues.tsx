import Alert from "@/app/components/Alert";
import { getRowsByValues } from "@/app/utils/database";
import { Table, AnyColumn, OrderBy } from "@/app/utils/types";

const DocumentsByValues = async <T extends object>({
  tableName,
  column,
  values,
  orderBy,
  viewComponent: View,
  withError = false,
}: {
  tableName: Table;
  column: AnyColumn;
  values: string[];
  orderBy?: OrderBy[];
  viewComponent: React.FC<{ data: T[] }>;
  withError: boolean;
}) => {
  const data = await getRowsByValues<T>(tableName, column, values, orderBy);

  if (!data?.length)
    return withError ? (
      <Alert
        title="Něco se pokazilo!"
        description="Bohužel se stránka rozbila. Prosím zkus to znovu."
      />
    ) : null;

  return <View data={data} />;
};

export default DocumentsByValues;
