import {
  AnyColumn as _AnyColumn,
  AnyAliasedColumn as _AnyAliasedColumn,
} from "kysely";

import { DB, Generated, Member, Resort, Trip, Video } from "@/generated/types";

interface Activity {
  date: Date;
  distance_km: number;
  garmin_id: number;
  id: Generated<number>;
  max_speed_km_h: number;
  member_id: string;
  runs: number;
  trip_id: string;
  type: "ski" | "snowboard";
}

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

export type { Activity, DB, Member, Trip, Resort, Video };

export type TableName = keyof DB;

export type AnyColumn = _AnyColumn<DB, TableName>;

export type AnyAliasedColumn = _AnyAliasedColumn<DB, TableName>;

export type AnyTable = Activity | Member | Trip | Resort | Video;

export type AnyValue =
  | Activity[keyof Activity]
  | Member[keyof Member]
  | Trip[keyof Trip]
  | Resort[keyof Resort]
  | Video[keyof Video];

export interface OrderBy {
  column: AnyColumn;
  direction?: "asc" | "desc";
}

export type TableNameWithPhoto = TableName | "photo";

export type AnyEmptyTable = Member | Resort | Trip | Omit<Video, "id">;

export type StatKey = "member" | "trip" | "resort" | "photo" | "video";
