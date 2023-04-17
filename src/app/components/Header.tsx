"use client";

import { usePathname } from "next/navigation";
import { Heading } from "@chakra-ui/react";

import { NAV_LINKS, LINK } from "@/app/utils";
import { NavLinkKey } from "@/app/utils/types";
import Breadcrump from "./Breadcrump";

const NOT_FOUND = "Nenalezeno";

const Header = ({ label }: { label?: string }) => {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(String)
    .map((part) => `/${part}` as NavLinkKey);
  const links: LINK[] = segments.map((segment, i) => ({
    path: segment,
    label: i === 0 ? NAV_LINKS[segment] : label || NOT_FOUND,
  }));

  console.log({ pathname, segments, links });

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
