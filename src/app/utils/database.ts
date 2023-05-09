import { sql } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

import { DB, Table, AnyTableColumn } from "./types";

const db = createKysely<DB>();
const { countAll } = db.fn;

export const getRows = async <T extends object>(table: Table) => {
  const result = (await db.selectFrom(table).selectAll().execute()) as T[];
  return result;
};

export const getRowsByValues = async <T extends object>(
  table: Table,
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
  table: Table,
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
  table: Table,
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

export const getCount = async (table: Table) => {
  const { count } = await db
    .selectFrom(table)
    .select(countAll<number>().as("count"))
    .executeTakeFirstOrThrow();
  return count;
};
