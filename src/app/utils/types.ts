import { AnyColumn as _AnyColumn } from "kysely";
import { DB, Member, Resort, Trip, Video } from "@/generated/types";

export enum NavLinkKey {
  Home = "/",
  Members = "/members",
  Trips = "/trips",
  Resorts = "/resorts",
  Photo = "/photo",
  Video = "/video",
}

export type LINK = {
  path: string;
  label: string;
};

export type CountryProps = Record<string, string>;

export type { DB, Member, Resort, Trip, Video };

export type Table = keyof DB;

export type AnyColumn = _AnyColumn<DB, Table>;

export interface OrderBy {
  column: AnyColumn;
  direction?: "asc" | "desc";
}
