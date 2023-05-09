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

export type AnyTableColumn =
  | keyof Member
  | keyof Resort
  | keyof Trip
  | keyof Video;
