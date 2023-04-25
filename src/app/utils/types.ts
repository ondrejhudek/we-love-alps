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
  id: string;
  name: string;
  nickname?: string;
  facebook?: string;
  instagram?: string;
  currentPartner?: string;
  exPartners?: string[];
  siblings?: string[];
  interest: ("lyže" | "snowboard" | "skialpy")[];
}

export interface ResortProps {
  id: string;
  name: string;
  countryCode: string;
  region: string;
  map: string;
}

export interface TripProps {
  id: string;
  title: string;
  resorts: string[];
  countryCode: string;
  year: number;
  month: number;
  accomodation?: {
    name: string;
    map?: string;
  };
  members: string[];
  nonMembers?: number;
  photos?: number;
}

export interface VideoProps {
  tripId: string;
  youtubeId: string;
}
