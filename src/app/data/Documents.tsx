import { getDocuments, CollectionName } from "@/app/mongodb";

import Alert from "@/app/components/Alert";

const Documents = async <T extends object>({
  collectionName,
  viewComponent: View,
}: {
  collectionName: CollectionName;
  viewComponent: React.FC<{ data: T[] }>;
}) => {
  const data = await getDocuments<T>(collectionName);

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
