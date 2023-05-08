import { sql } from "@vercel/postgres";

export type TableName = "members" | "resorts" | "trips" | "videos";
export type TableNameByField =
  | "membersByIds"
  | "resortsByIds"
  | "tripsByMember"
  | "tripsByResort"
  | "videosByTrip";

const SQL_ROWS_MEMBERS = <T extends object>() => sql<T>`SELECT * FROM members;`;
const SQL_ROWS_RESORTS = <T extends object>() => sql<T>`SELECT * FROM resorts;`;
const SQL_ROWS_TRIPS = <T extends object>() => sql<T>`SELECT * FROM trips;`;
const SQL_ROWS_VIDEOS = <T extends object>() => sql<T>`SELECT * FROM videos;`;

const SQL_ROWS = {
  members: SQL_ROWS_MEMBERS,
  resorts: SQL_ROWS_RESORTS,
  trips: SQL_ROWS_TRIPS,
  videos: SQL_ROWS_VIDEOS,
};

const SQL_ROWS_MEMBERS_BY_IDS = <T extends object>(values: string[]) => {
  console.log(
    "SQL_ROWS_MEMBERS_BY_IDS //",
    `SELECT * FROM members_test WHERE ${values
      .map((value) => `(alias = ${value})`)
      .join(" OR ")};`
  );
  // return sql<T>`SELECT * FROM members_test WHERE alias = ANY (ARRAY[${values
  //   .map((value) => `'${value}'`)
  //   .join(",")}]);`;
  // return sql<T>`SELECT * FROM members_test WHERE alias = ANY('{${values
  //   .map((value) => `"${value}"`)
  //   .join(",")}}');`;
  return sql<T>`SELECT * FROM members_test WHERE ${values
    .map((value) => `(alias = '${value}')`)
    .join(" OR ")};`;
};
const SQL_ROWS_RESORTS_BY_IDS = <T extends object>(values: string[]) => {
  console.log(
    "SQL_ROWS_RESORTS_BY_IDS //",
    `SELECT * FROM resorts WHERE id = ANY(ARRAY[${values.join(",")}]);`
  );
  return sql<T>`SELECT * FROM resorts WHERE id = ANY(ARRAY[${values.join(
    ","
  )}]);`;
};
const SQL_ROWS_TRIPS_BY_MEMBER = <T extends object>(values: string[]) =>
  sql<T>`SELECT * FROM trips WHERE ${values.join(",")} = ANY(ARRAY[members]);`;
const SQL_ROWS_TRIPS_BY_RESORT = <T extends object>(values: string[]) =>
  sql<T>`SELECT * FROM trips WHERE ${values.join(",")} = ANY(ARRAY[resorts]);`;
const SQL_ROWS_VIDEOS_BY_TRIP = <T extends object>(values: string[]) =>
  sql<T>`SELECT * FROM videos WHERE trip_id = ${values[0]};`;

const SQL_ROWS_BY_FIELD = {
  membersByIds: SQL_ROWS_MEMBERS_BY_IDS,
  resortsByIds: SQL_ROWS_RESORTS_BY_IDS,
  tripsByMember: SQL_ROWS_TRIPS_BY_MEMBER,
  tripsByResort: SQL_ROWS_TRIPS_BY_RESORT,
  videosByTrip: SQL_ROWS_VIDEOS_BY_TRIP,
};

const SQL_ROW_MEMBER = <T extends object>(id: string) =>
  sql<T>`SELECT * FROM members WHERE id = ${id};`;
const SQL_ROW_RESORT = <T extends object>(id: string) =>
  sql<T>`SELECT * FROM resorts WHERE id = ${id};`;
const SQL_ROW_TRIP = <T extends object>(id: string) =>
  sql<T>`SELECT * FROM trips WHERE id = ${id};`;
const SQL_ROW_VIDEO = <T extends object>(id: string) =>
  sql<T>`SELECT * FROM videos WHERE id = ${id};`;

const SQL_ROW = {
  members: SQL_ROW_MEMBER,
  resorts: SQL_ROW_RESORT,
  trips: SQL_ROW_TRIP,
  videos: SQL_ROW_VIDEO,
};

export const getRows = async <T extends object>(tableName: TableName) => {
  const { rows } = await SQL_ROWS[tableName]<T>();
  return rows;
};

export const getRowsByField = async <T extends object>(
  tableNameByField: TableNameByField,
  values: string[]
) => {
  try {
    const { rows } = await SQL_ROWS_BY_FIELD[tableNameByField]<T>(values);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

export const getRowById = async <T extends object>(
  tableName: TableName,
  id: string
) => {
  const { rows } = await SQL_ROW[tableName]<T>(id);
  return rows[0];
};

export const getCount = async (tableName: TableName) => {
  const { rowCount } = await SQL_ROWS[tableName]();
  return rowCount;
};
