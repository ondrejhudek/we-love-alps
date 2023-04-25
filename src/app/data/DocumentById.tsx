import { getDocumentById, CollectionName } from "@/app/mongodb";

import Alert from "@/app/components/Alert";

const Document = async <T extends { id: string }>({
  collectionName,
  id,
  viewComponent: View,
}: {
  collectionName: CollectionName;
  id: string;
  viewComponent: React.FC<{ data: T }>;
}) => {
  const data = await getDocumentById<T>(collectionName, id);

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
