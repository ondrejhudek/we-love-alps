import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type InterestEnum = "lyže" | "skialpy" | "snowboard";

export interface Member {
  id: Generated<number>;
  alias: string;
  name: string;
  facebook: string | null;
  instagram: string | null;
  current_partner: string | null;
  ex_partners: string[] | null;
  siblings: string[] | null;
  interest: InterestEnum[];
}

export interface Resort {
  id: string;
  name: string;
  country_code: string;
  region: string;
  map: string;
}

export interface Trip {
  id: string;
  title: string;
  country_code: string;
  year: number;
  month: number;
  resorts: string[];
  members: string[];
  non_members: number | null;
  accomodation_name: string | null;
  accomodation_map: string | null;
}

export interface Video {
  id: Generated<number>;
  trip_id: string;
  youtube_id: string;
}

export interface DB {
  member: Member;
  resort: Resort;
  trip: Trip;
  video: Video;
}
