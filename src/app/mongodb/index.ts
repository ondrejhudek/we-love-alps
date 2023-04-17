import mongoClient from "./client";

export type CollectionName = "members" | "resorts" | "trips" | "videos";
interface Sort {
  [key: string]: -1 | 1;
}

const DATABASE_NAME = "app";

const SLEEP_TIME = 2000;
const sleep = () => new Promise((r) => setTimeout(r, SLEEP_TIME));

const getDatabase = async () => {
  const client = await mongoClient;
  return client.db(DATABASE_NAME);
};

export const getDocuments = async <T extends object>(
  collectionName: CollectionName,
  sort?: Sort,
  limit = 100
): Promise<T[]> => {
  // await sleep();
  const db = await getDatabase();
  return await db
    .collection(collectionName)
    .find({})
    .sort(sort || {})
    .project<T>({ _id: 0 })
    .limit(limit)
    .toArray();
};

export const getDocumentsByField = async <T extends object>(
  collectionName: CollectionName,
  field: string,
  values: string[],
  limit = 100
): Promise<T[]> => {
  // await sleep();
  const db = await getDatabase();
  return await db
    .collection(collectionName)
    .find({
      [field]: {
        $in: values,
      },
    })
    .project<T>({ _id: 0 })
    .limit(limit)
    .toArray();
};

export const getDocumentsCount = async (
  collectionName: CollectionName
): Promise<number> => {
  await sleep();
  const db = await getDatabase();
  return await db.collection(collectionName).estimatedDocumentCount();
};

export const getDocumentById = async <T extends { id: string }>(
  collectionName: CollectionName,
  id: string
): Promise<T | null> => {
  // await sleep();
  const db = await getDatabase();
  return await db
    .collection(collectionName)
    .findOne<T>({ id }, { projection: { _id: 0 } });
};
