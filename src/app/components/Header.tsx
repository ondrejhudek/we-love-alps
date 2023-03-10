"use client";

import { usePathname } from "next/navigation";
import { Heading } from "@chakra-ui/react";

import { NAV_LINKS, LINK } from "@/app/utils";
import { NavLinkKey } from "@/app/utils/types";
import Breadcrump from "./Breadcrump";

import MEMBERS from "@/data/members";
import RESORTS from "@/data/resorts";
import TRIPS from "@/data/trips";

const NOT_FOUND = "Nenalezeno";

const findMember = (segment: string) => {
  const member = MEMBERS.find((member) => member.id === segment.substring(1));
  return member?.name || NOT_FOUND;
};

const findResort = (segment: string) => {
  const resort = RESORTS.find((resort) => resort.id === segment.substring(1));
  return resort?.name || NOT_FOUND;
};

const findTrip = (segment: string) => {
  const trip = TRIPS.find((trip) => trip.id === segment.substring(1));
  return trip?.title || NOT_FOUND;
};

const getLabel = (firstLevelSegment: NavLinkKey, leafSegment: string) => {
  switch (firstLevelSegment) {
    case NavLinkKey.Members:
      return findMember(leafSegment);
    case NavLinkKey.Resorts:
      return findResort(leafSegment);
    case NavLinkKey.Trips:
    case NavLinkKey.Photo:
      return findTrip(leafSegment);
    default:
      return "";
  }
};

const Header = () => {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(String)
    .map((part) => `/${part}` as NavLinkKey);
  const links: LINK[] = segments.map((segment, i) => ({
    path: segment,
    label: i === 0 ? NAV_LINKS[segment] : getLabel(segments[0], segment),
  }));

  return (
    <>
      {/* Breadcrump */}
      <Breadcrump links={links} />

      {/* Heading */}
      <Heading as="h1" mt={1} mb={{ base: 2, sm: 4, md: 6 }}>
        {links[links.length - 1].label}
      </Heading>
    </>
  );
};

export default Header;
