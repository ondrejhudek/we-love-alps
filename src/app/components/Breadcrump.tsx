import Link from "next/link";
import * as React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Breadcrump = ({ name }: { name: string }) => (
  <Breadcrumb
    spacing="8px"
    fontWeight="medium"
    fontSize="sm"
    color="tertiary.400"
    separator={<ChevronRightIcon color="gray.500" />}
  >
    <BreadcrumbItem>
      <BreadcrumbLink as={Link} href="/">
        Domů
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink>{name}</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

export default Breadcrump;
