import { sql } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

import { MemberProps, ResortProps, TripProps, VideoProps } from "./types";

export type AnyTableColumn =
  | keyof MemberProps
  | keyof ResortProps
  | keyof TripProps
  | keyof VideoProps;

export interface Database {
  members: MemberProps;
  resorts: ResortProps;
  trips: TripProps;
  videos: VideoProps;
}

export type TableName = keyof Database;

const db = createKysely<Database>();
const { countAll } = db.fn;

export const getRows = async <T extends object>(table: keyof Database) => {
  const result = (await db.selectFrom(table).selectAll().execute()) as T[];
  return result;
};

export const getRowsByValues = async <T extends object>(
  table: keyof Database,
  column: AnyTableColumn,
  values: string[]
) => {
  const result = (await db
    .selectFrom(table)
    .selectAll()
    .where(column, "in", values)
    .execute()) as T[];
  return result;
};

export const getRowsByValueInColumn = async <T extends object>(
  table: keyof Database,
  column: AnyTableColumn,
  value: string
) => {
  const result = await db
    .selectFrom(table)
    .selectAll()
    .where(sql`${value}`, "=", sql`ANY(${sql.table(column)})`)
    .execute();
  return result as T[];
};

export const getRowByValue = async <T extends object>(
  table: keyof Database,
  column: AnyTableColumn,
  value: string
) => {
  const result = await db
    .selectFrom(table)
    .selectAll()
    .where(column, "=", value)
    .executeTakeFirstOrThrow();
  return result as T;
};

export const getCount = async (table: keyof Database) => {
  const { count } = await db
    .selectFrom(table)
    .select(countAll<number>().as("count"))
    .executeTakeFirstOrThrow();
  return count;
};
