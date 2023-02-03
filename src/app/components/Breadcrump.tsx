import Link from "next/link";
import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Breadcrump = ({ name }: { name: string }) => (
  <Breadcrumb
    spacing="8px"
    fontWeight="medium"
    fontSize="sm"
    color={useColorModeValue("gray.400", "gray.600")}
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
