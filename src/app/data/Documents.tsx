import { getDocuments, CollectionName } from "@/app/mongodb";

import Alert from "@/app/components/Alert";

// import { db } from "@vercel/postgres";
import { MemberProps, TripProps } from "@/app/utils/types";

const Documents = async <T extends object>({
  collectionName,
  viewComponent: View,
}: {
  collectionName: CollectionName;
  viewComponent: React.FC<{ data: T[] }>;
}) => {
  const data = await getDocuments<T>(collectionName);

  console.log({ collectionName });

  // if (collectionName === "members") {
  //   const sql = `INSERT INTO members (id, name, facebook, instagram, exPartners, siblings, interest) VALUES ${(
  //     data as MemberProps[]
  //   )
  //     .map((item) => {
  //       return `('${item.id}', '${item.name}', ${
  //         item.facebook ? `'${item.facebook}'` : "''"
  //       }, ${item.instagram ? `'${item.instagram}'` : "''"}, ARRAY ${
  //         !!item.exPartners?.length
  //           ? JSON.stringify(item.exPartners).replaceAll('"', "'")
  //           : "[]::VARCHAR[]"
  //       }, ARRAY ${
  //         !!item.siblings?.length
  //           ? JSON.stringify(item.siblings).replaceAll('"', "'")
  //           : "[]::VARCHAR[]"
  //       }, ARRAY ${
  //         !!item.interest?.length
  //           ? JSON.stringify(item.interest).replaceAll('"', "'")
  //           : "[]::VARCHAR[]"
  //       })`;
  //     })
  //     .join(",")};`;
  //   console.log(sql);
  // }

  // if (collectionName === "trips") {
  //   const sql = `INSERT INTO trips (id, title, countryCode, year, month, resorts, members, nonMembers) VALUES ${(
  //     data as TripProps[]
  //   )
  //     .map((item) => {
  //       return `('${item.id}', '${item.title}', ${item.countryCode}, ${
  //         item.year
  //       }, ${item.month}, ARRAY ${JSON.stringify(item.resorts).replaceAll(
  //         '"',
  //         "'"
  //       )}, ARRAY ${JSON.stringify(item.members).replaceAll('"', "'")}, ${
  //         item.nonMembers
  //       })`;
  //     })
  //     .join(",")};`;
  //   console.log(sql);
  // }

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
