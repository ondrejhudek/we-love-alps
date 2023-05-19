import { AnyColumn as _AnyColumn } from "kysely";
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

export type Table = keyof DB;

export type AnyColumn = _AnyColumn<DB, Table>;

export interface OrderBy {
  column: AnyColumn;
  direction?: "asc" | "desc";
}

export type TableWithPhoto = Table | "photo";
