import NextLink from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiChevronRight } from "react-icons/hi2";

const MyBreadcrumb = ({
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
      <BreadcrumbLink as={NextLink} href="/">
        Domů
      </BreadcrumbLink>
    </BreadcrumbItem>

    {links.map(({ path, label }, i) => {
      const isCurrentPage = links.length === i + 1;
      return (
        <BreadcrumbItem key={path} isCurrentPage={isCurrentPage}>
          <BreadcrumbLink
            as={isCurrentPage ? "span" : NextLink}
            href={isCurrentPage ? "#" : path}
          >
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    })}
  </Breadcrumb>
);

export default MyBreadcrumb;
