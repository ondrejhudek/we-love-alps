import { NAV_LINKS_CS } from "./locales";
import { NavLinkKey, Member, Resort, Trip, Video } from "./types";

export const NAV_LINKS: Record<NavLinkKey, string> = {
  [NavLinkKey.Home]: NAV_LINKS_CS.home,
  [NavLinkKey.Member]: NAV_LINKS_CS.member,
  [NavLinkKey.Trip]: NAV_LINKS_CS.trip,
  [NavLinkKey.Resort]: NAV_LINKS_CS.resort,
  [NavLinkKey.Photo]: NAV_LINKS_CS.photo,
  [NavLinkKey.Video]: NAV_LINKS_CS.video,
};

export const NAV_LINK_KEYS = Object.keys(NAV_LINKS) as NavLinkKey[];

const EMPTY_MEMBER: Member = {
  id: "",
  name: "",
  facebook: null,
  instagram: null,
  current_partner: null,
  ex_partners: [],
  siblings: [],
  interest: [],
};

const EMPTY_RESORT: Resort = {
  id: "",
  name: "",
  country_code: "",
  region: "",
  lat_lng: {
    x: 0,
    y: 0,
  },
};

const EMPTY_TRIP: Trip = {
  id: "",
  title: "",
  country_code: "",
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  accomodation_name: null,
  accomodation_map: null,
  resorts: [],
  members: [],
  non_members: 0,
};

const EMPTY_VIDEO: Omit<Video, "id"> = {
  trip_id: "",
  youtube_id: "",
};

export const EMPTY_ENTITY = {
  member: EMPTY_MEMBER,
  resort: EMPTY_RESORT,
  trip: EMPTY_TRIP,
  video: EMPTY_VIDEO,
};
