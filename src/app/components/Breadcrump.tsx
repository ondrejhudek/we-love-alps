import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Breadcrump = ({
  pathname,
  name,
  subName,
}: {
  pathname: string;
  name: string;
  subName?: string;
}) => (
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

    <BreadcrumbItem isCurrentPage={!subName}>
      {subName ? (
        <BreadcrumbLink as={Link} href={pathname}>
          {name}
        </BreadcrumbLink>
      ) : (
        <BreadcrumbLink>{name}</BreadcrumbLink>
      )}
    </BreadcrumbItem>

    {subName && (
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{subName}</BreadcrumbLink>
      </BreadcrumbItem>
    )}
  </Breadcrumb>
);

export default Breadcrump;
