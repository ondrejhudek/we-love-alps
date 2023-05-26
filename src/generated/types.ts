import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Point = {
  x: number;
  y: number;
};

export interface Member {
  id: string;
  name: string;
  facebook: string | null;
  instagram: string | null;
  current_partner: string | null;
  ex_partners: string[] | null;
  siblings: string[] | null;
  interest: string[];
}

export interface Resort {
  id: string;
  name: string;
  country_code: string;
  region: string;
  lat_lng: Point;
  map: string;
}

export interface Trip {
  id: string;
  title: string;
  country_code: string;
  year: number;
  month: number;
  accomodation_name: string | null;
  accomodation_map: string | null;
  resorts: string[];
  members: string[];
  non_members: number | null;
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
