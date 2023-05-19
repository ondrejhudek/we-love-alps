import { NAV_LINKS_CS } from "./locales";
import { NavLinkKey } from "./types";

export const NAV_LINKS: Record<NavLinkKey, string> = {
  [NavLinkKey.Home]: NAV_LINKS_CS.home,
  [NavLinkKey.Member]: NAV_LINKS_CS.member,
  [NavLinkKey.Trip]: NAV_LINKS_CS.trip,
  [NavLinkKey.Resort]: NAV_LINKS_CS.resort,
  [NavLinkKey.Photo]: NAV_LINKS_CS.photo,
  [NavLinkKey.Video]: NAV_LINKS_CS.video,
};

export const NAV_LINK_KEYS = Object.keys(NAV_LINKS) as NavLinkKey[];
