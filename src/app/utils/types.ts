import { Generated } from "kysely";

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

export interface MemberProps {
  id: Generated<number>;
  alias: string;
  name: string;
  facebook?: string;
  instagram?: string;
  current_partner?: string;
  ex_partners?: string[];
  siblings?: string[];
  interest: ("lyže" | "snowboard" | "skialpy")[];
}

export interface ResortProps {
  id: string;
  name: string;
  country_code: string;
  region: string;
  map: string;
}

export interface TripProps {
  id: string;
  title: string;
  country_code: string;
  year: number;
  month: number;
  accomodation_name?: string;
  accomodation_map?: string;
  resorts: string[];
  members: string[];
  non_members?: number;
}

export interface VideoProps {
  id: Generated<number>;
  trip_id: string;
  youtube_id: string;
}
