import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Point = {
  x: number;
  y: number;
};

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Activity {
  date: Timestamp;
  distance_km: Numeric;
  garmin_id: Int8;
  id: Generated<number>;
  max_speed_km_h: Numeric;
  member_id: string;
  runs: number;
  trip_id: string;
}

export interface Member {
  current_partner: string | null;
  ex_partners: string[] | null;
  facebook: string | null;
  id: string;
  instagram: string | null;
  interest: string[];
  name: string;
  siblings: string[] | null;
}

export interface Resort {
  country_code: string;
  id: string;
  lat_lng: Point;
  name: string;
  region: string;
}

export interface Trip {
  accomodation_map: string | null;
  accomodation_name: string | null;
  country_code: string;
  id: string;
  members: string[];
  month: number;
  non_members: number | null;
  resorts: string[];
  title: string;
  year: number;
}

export interface Video {
  id: Generated<number>;
  trip_id: string;
  youtube_id: string;
}

export interface DB {
  activity: Activity;
  member: Member;
  resort: Resort;
  trip: Trip;
  video: Video;
}
