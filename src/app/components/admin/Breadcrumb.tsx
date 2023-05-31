"use client";

import NextLink from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineHome, HiChevronRight } from "react-icons/hi2";

import { TableName } from "@/app/utils/types";

const MyBreadcrumb = ({ table, id }: { table: TableName; id?: string }) => (
  <Breadcrumb
    fontSize="sm"
    separator={
      <Flex>
        <Icon as={HiChevronRight} color="gray.500" />
      </Flex>
    }
  >
    {/* Home link */}
    <BreadcrumbItem>
      <BreadcrumbLink as={NextLink} href="/admin">
        <Flex>
          <Icon as={HiOutlineHome} />
        </Flex>
      </BreadcrumbLink>
    </BreadcrumbItem>

    {/* Table link */}
    <BreadcrumbItem isCurrentPage={!!id}>
      <BreadcrumbLink
        as={id ? "span" : NextLink}
        href={id ? "#" : `/admin/${table}`}
      >
        {table}
      </BreadcrumbLink>
    </BreadcrumbItem>

    {/* ID link */}
    {id && (
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">{id}</BreadcrumbLink>
      </BreadcrumbItem>
    )}
  </Breadcrumb>
);

export default MyBreadcrumb;
