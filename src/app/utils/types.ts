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
