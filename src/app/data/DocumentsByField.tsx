import { getDocumentsByField, CollectionName } from "@/app/mongodb";

import Alert from "@/app/components/Alert";

const DocumentsByField = async <T extends object>({
  collectionName,
  field,
  values,
  viewComponent: View,
  withError = false,
}: {
  collectionName: CollectionName;
  field: string;
  values: string[];
  viewComponent: React.FC<{ data: T[] }>;
  withError: boolean;
}) => {
  const data = await getDocumentsByField<T>(collectionName, field, values);

  if (!data || !data.length)
    return withError ? (
      <Alert
        title="Něco se pokazilo!"
        description="Bohužel se stránka rozbila. Prosím zkus to znovu."
      />
    ) : null;

  return <View data={data} />;
};

export default DocumentsByField;
