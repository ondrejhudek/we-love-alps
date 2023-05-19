import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiChevronRight } from "react-icons/hi2";

const Breadcrump = ({
  links,
}: {
  links: { path: string; label: string }[];
}) => (
  <Breadcrumb
    spacing="8px"
    fontWeight="medium"
    fontSize="sm"
    color={useColorModeValue("gray.400", "gray.600")}
    separator={
      <Flex>
        <Icon as={HiChevronRight} color="gray.500" />
      </Flex>
    }
  >
    <BreadcrumbItem>
      <BreadcrumbLink as={Link} href="/">
        Domů
      </BreadcrumbLink>
    </BreadcrumbItem>

    {links.map(({ path, label }, i) => (
      <BreadcrumbItem key={path} isCurrentPage={links.length === i + 1}>
        <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
);

export default Breadcrump;
