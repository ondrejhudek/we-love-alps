import { sql } from "@vercel/postgres";

// import { MemberProps, ResortProps, TripProps, VideoProps } from "./types";

// export type TableProps = MemberProps | ResortProps | TripProps | VideoProps;
export type TableName = "members" | "resorts" | "trips" | "videos";

const getMembers = async <T extends object>(field?: string, value?: string) => {
  //   const whereQuery = field && value ? ` WHERE '${value}' = ANY(${field})` : ``;
  const { rows, rowCount } = await sql<T>`SELECT * FROM members;`;
  return { rows, rowCount };
};

const getMember = async <T extends object>(id: string) => {
  const { rows } = await sql<T>`SELECT * FROM members WHERE id = ${id};`;
  return rows[0];
};

const getResorts = async <T extends object>(field?: string, value?: string) => {
  //   const whereQuery = field && value ? ` WHERE '${value}' = ANY(${field})` : ``;
  const { rows, rowCount } = await sql<T>`SELECT * FROM resorts;`;
  return { rows, rowCount };
};

const getResort = async <T extends object>(id: string) => {
  const { rows } = await sql<T>`SELECT * FROM resorts WHERE id = ${id};`;
  // console.log("getResort", { rows });
  return rows[0];
};

const getTrips = async <T extends object>(field?: string, value?: string) => {
  //   const whereQuery = field && value ? ` WHERE '${value}' = ANY(${field})` : ``;
  const { rows, rowCount } =
    await sql<T>`SELECT * FROM trips ORDER BY year ASC;`;
  return { rows, rowCount };
};

const getTrip = async <T extends object>(id: string) => {
  const { rows } = await sql<T>`SELECT * FROM trips WHERE id = ${id};`;
  return rows[0];
};

const getVideos = async <T extends object>(field?: string, value?: string) => {
  //   const whereQuery = field && value ? ` WHERE '${value}' = ANY(${field})` : ``;
  const { rows, rowCount } = await sql<T>`SELECT * FROM videos;`;
  return { rows, rowCount };
};

const getVideo = async <T extends object>(id: string) => {
  const { rows } = await sql<T>`SELECT * FROM videos WHERE id = ${id};`;
  return rows[0];
};

const TABLE_ROWS = {
  members: getMembers,
  resorts: getResorts,
  trips: getTrips,
  videos: getVideos,
};

const TABLE_ROW = {
  members: getMember,
  resorts: getResort,
  trips: getTrip,
  videos: getVideo,
};

export const getRowsByField = async <T extends object>(
  field: string,
  value: string
) => {
  const { rows } =
    await sql<T>`SELECT * FROM trips WHERE ${value} = ANY(${field});`;
  console.log("getRowsByField //", { rows });
  return rows;
};

export const getRowsByField2 = async <T extends object>(
  tableName: TableName,
  field: string,
  value: string
) => {
  const { rows } =
    await sql<T>`SELECT * FROM ${tableName} WHERE 'solden' = ALL(resorts);`;
  console.log("getRowsByField //", { rows });
  return rows;
};

// TODO: add sort and limit
export const getRows = async <T extends object>(
  tableName: TableName,
  field?: string,
  value?: string
) => {
  const { rows } = await TABLE_ROWS[tableName]<T>(field, value);
  // console.log("getRows //", { tableName, size: rows.length });
  return rows;
};

export const getRowById = async <T extends object>(
  tableName: TableName,
  id: string
) => {
  const rows = await TABLE_ROW[tableName]<T>(id);
  return rows;
};

export const getCount = async (tableName: TableName) => {
  const { rowCount } = await TABLE_ROWS[tableName]();
  // console.log("getRows //", { tableName, size: rows.length });
  return rowCount;
};
