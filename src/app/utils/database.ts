import { sql, SelectQueryBuilder } from "kysely";
import { AllSelection } from "kysely/dist/cjs/parser/select-parser";
import { createKysely } from "@vercel/postgres-kysely";

import { DB, Table, OrderBy, AnyColumn } from "./types";

const db = createKysely<DB>();
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
  table: Table,
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
  table: Table,
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
  table: Table,
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
  table: Table,
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

export const getCount = async (table: Table) => {
  const { count } = await db
    .selectFrom(table)
    .select(countAll<number>().as("count"))
    .executeTakeFirstOrThrow();
  return count;
};
