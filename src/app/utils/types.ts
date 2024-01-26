import {
  AnyColumn as _AnyColumn,
  AnyAliasedColumn as _AnyAliasedColumn,
} from "kysely";

import { DB, Member, Resort, Trip, Video } from "@/generated/types";

export enum NavLinkKey {
  Home = "/",
  Member = "/member",
  Trip = "/trip",
  Resort = "/resort",
  Photo = "/photo",
  Video = "/video",
}

export type Link = {
  path: string;
  label: string;
};

export type CountryProps = Record<string, string>;

export type { DB, Member, Trip, Resort, Video };

export type TableName = keyof DB;

export type AnyColumn = _AnyColumn<DB, TableName>;

export type AnyAliasedColumn = _AnyAliasedColumn<DB, TableName>;

export type AnyTable = Member | Trip | Resort | Video;

export type AnyValue =
  | Member[keyof Member]
  | Trip[keyof Trip]
  | Resort[keyof Resort]
  | Video[keyof Video];

export interface OrderBy {
  column: AnyColumn;
  direction?: "asc" | "desc";
}

export type TableNameWithPhoto = TableName | "photo";

export interface Blob {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: Date;
}
