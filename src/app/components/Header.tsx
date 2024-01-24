"use client";

import { usePathname } from "next/navigation";
import { Badge, Flex, Heading } from "@chakra-ui/react";

import { NAV_LINKS } from "@/app/utils";
import { Link, NavLinkKey } from "@/app/utils/types";
import Breadcrump from "./Breadcrumb";

const NOT_FOUND = "Nenalezeno";

const Header = ({ label, badge }: { label?: string; badge?: string }) => {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(String)
    .map((part) => `/${part}` as NavLinkKey);
  const links: Link[] = segments.map((segment, i) => ({
    path: segment,
    label: i === 0 ? NAV_LINKS[segment] : label ?? NOT_FOUND,
  }));

  return (
    <>
      {/* Breadcrump */}
      <Breadcrump links={links} />

      {/* Heading */}
      <Flex alignItems="center" mt={1} mb={{ base: 2, sm: 4, md: 6 }}>
        <Heading as="h1">{links[links.length - 1].label}</Heading>
        {badge && <Badge ml={2.5}>{badge}</Badge>}
      </Flex>
    </>
  );
};

export default Header;
