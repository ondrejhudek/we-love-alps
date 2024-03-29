"use server";

import { sql, SelectQueryBuilder, UpdateObject, InsertObject } from "kysely";
import { AllSelection } from "kysely/dist/cjs/parser/select-parser";
import { createKysely } from "@vercel/postgres-kysely";

import {
  DB,
  TableName,
  OrderBy,
  AnyColumn,
  AnyTable,
  AnyEmptyTable,
} from "./types";
import { PointPlugin } from "./kysely";

const db = createKysely<DB>({}, { plugins: [new PointPlugin()] });
const { countAll } = db.fn;

const addOrderBy = (
  query: SelectQueryBuilder<DB, keyof DB, AllSelection<DB, keyof DB>>,
  orderBy?: OrderBy[]
) => {
  if (!orderBy?.length) return query;
  orderBy.forEach(({ column, direction }) => {
    query = query.orderBy(column, direction);
  });
  return query;
};

const addLimit = (
  query: SelectQueryBuilder<DB, keyof DB, AllSelection<DB, keyof DB>>,
  limit?: number
) => {
  if (!limit) return query;
  query = query.limit(limit);
  return query;
};

const addOffset = (
  query: SelectQueryBuilder<DB, keyof DB, AllSelection<DB, keyof DB>>,
  offset?: number
) => {
  if (!offset) return query;
  query = query.limit(offset);
  return query;
};

export const getRows = async <T extends object>(
  table: TableName,
  orderBy?: OrderBy[],
  limit?: number,
  offset?: number
) => {
  let query = db.selectFrom(table).selectAll();
  query = addOrderBy(query, orderBy);
  query = addLimit(query, limit);
  query = addOffset(query, offset);
  const result = await query.execute();
  return result as T[];
};

export const getRowsByValues = async <T extends object>(
  table: TableName,
  column: AnyColumn,
  values: string[],
  orderBy?: OrderBy[],
  limit?: number,
  offset?: number
) => {
  let query = db.selectFrom(table).selectAll().where(column, "in", values);
  query = addOrderBy(query, orderBy);
  query = addLimit(query, limit);
  query = addOffset(query, offset);
  const result = await query.execute();
  return result as T[];
};

export const getRowsByValueInColumn = async <T extends object>(
  table: TableName,
  column: AnyColumn,
  value: string,
  orderBy?: OrderBy[],
  limit?: number,
  offset?: number
) => {
  let query = db
    .selectFrom(table)
    .selectAll()
    .where(sql`${value}`, "=", sql`ANY(${sql.table(column)})`);
  query = addOrderBy(query, orderBy);
  query = addLimit(query, limit);
  query = addOffset(query, offset);
  const result = await query.execute();
  return result as T[];
};

export const getRowByValue = async <T extends object>(
  table: TableName,
  column: AnyColumn,
  value: string
) => {
  const result = await db
    .selectFrom(table)
    .selectAll()
    .where(column, "=", value)
    .executeTakeFirstOrThrow();
  return result as T;
};

export const getCount = async (table: TableName) => {
  const { count } = await db
    .selectFrom(table)
    .select(countAll<number>().as("count"))
    .executeTakeFirstOrThrow();
  return count;
};

export const createRow = async (table: TableName, data: AnyEmptyTable) => {
  const result = await db
    .insertInto(table)
    .values(data as InsertObject<DB, keyof DB>)
    .returning("id")
    .executeTakeFirstOrThrow();
  return result;
};

export const updateRow = async (
  table: TableName,
  id: string,
  data: AnyTable
) => {
  const result = await db
    .updateTable(table)
    .set(data as UpdateObject<DB, keyof DB>)
    .where("id", "=", id)
    .returning("id")
    .executeTakeFirstOrThrow();
  return result;
};

export const deleteRow = async (table: TableName, id: string) => {
  const result = await db
    .deleteFrom(table)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
  return result.numDeletedRows === BigInt(1);
};

export const getSchema = async () => {
  const result = await db.introspection.getTables();
  return result;
};
