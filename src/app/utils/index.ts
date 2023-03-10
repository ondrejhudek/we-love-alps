import { NAV_LINKS_CS } from "./locales";
import { NavLinkKey } from "./types";

export const NAV_LINKS: Record<NavLinkKey, string> = {
  [NavLinkKey.Home]: NAV_LINKS_CS.home,
  [NavLinkKey.Members]: NAV_LINKS_CS.members,
  [NavLinkKey.Trips]: NAV_LINKS_CS.trips,
  [NavLinkKey.Resorts]: NAV_LINKS_CS.resorts,
  [NavLinkKey.Photo]: NAV_LINKS_CS.photo,
  [NavLinkKey.Video]: NAV_LINKS_CS.video,
};

export type LINK = {
  path: string;
  label: string;
};

export const NAV_LINK_KEYS = Object.keys(NAV_LINKS) as NavLinkKey[];
