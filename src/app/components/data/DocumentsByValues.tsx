import Alert from "@/app/components/Alert";
import { getRowsByValues } from "@/app/utils/database";
import { TableName, AnyColumn, OrderBy, Member } from "@/app/utils/types";

const DocumentsByValues = async <T extends object>({
  tableName,
  column,
  values,
  extraValues,
  orderBy,
  viewComponent: View,
  withError = false,
}: {
  tableName: TableName;
  column: AnyColumn;
  values: string[];
  extraValues?: {
    nonMembers?: number;
  };
  orderBy?: OrderBy[];
  viewComponent: React.FC<{ data: T[]; nonMembers?: number }>;
  withError?: boolean;
}) => {
  const data = await getRowsByValues<T>(tableName, column, values, orderBy);

  if (!data?.length)
    return withError ? (
      <Alert
        title="Něco se pokazilo!"
        description="Bohužel se stránka rozbila. Prosím zkus to znovu."
      />
    ) : null;

  return <View data={data} nonMembers={extraValues?.nonMembers} />;
};

export default DocumentsByValues;
