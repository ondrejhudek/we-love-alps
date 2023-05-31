"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  Code,
  Divider,
  Flex,
  IconButton,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HiOutlineArrowLongLeft,
  HiOutlineTableCells,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import is from "ramda/src/is";

import Breadcrump from "@/app/components/admin/Breadcrumb";
import { TableName, AnyTable, AnyColumn, AnyValue } from "@/app/utils/types";

type Layout = "table" | "card";
const LAYOUTS: Layout[] = ["table", "card"];
const ICONS: Record<Layout, JSX.Element> = {
  table: <HiOutlineTableCells />,
  card: <HiOutlineSquares2X2 />,
};

const LOCAL_STORAGE_KEY = "admin-table-layout";
const DEFAULT_LAYOUT = "table";

const renderId = (id: AnyTable["id"]) => {
  // Null, Undefined
  if (!id) return null;

  // String
  if (is(String, id) || is(Number, id)) {
    return id;
  }

  // Generated number
  return id.__select__;
};

const renderValue = (value: AnyValue) => {
  // Null, Undefined
  if (!value) return <Code>null</Code>;

  // Array
  if (is(Array, value)) return `[${value.join(", ")}]`;

  // Object
  if (is(Object, value)) return JSON.stringify(value, null, 2);

  // String, Number, Boolean
  return value;
};

const LayoutGroupButton = ({
  active,
  setActive,
}: {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}) => {
  const handleClick = (layout: Layout) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, layout);
    setActive(layout);
  };

  return (
    <ButtonGroup variant="outline" isAttached>
      {LAYOUTS.map((layout) => (
        <IconButton
          key={`layout-${layout}`}
          aria-label={layout}
          icon={ICONS[layout]}
          fontSize="xl"
          isActive={active === layout}
          onClick={() => handleClick(layout)}
        />
      ))}
    </ButtonGroup>
  );
};

const View = ({ table, data }: { table: TableName; data: AnyTable[] }) => {
  const router = useRouter();
  const columns = Object.keys(data[0]) as AnyColumn[];

  const [activeLayout, setActiveLayout] = useState(DEFAULT_LAYOUT);
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const tdBgColor = useColorModeValue("gray.100", "gray.900");
  const cardBgColor = useColorModeValue("gray.50", "gray.900");
  const cardBorderColor = useColorModeValue("gray.100", "gray.700");

  const handleClick = (id: string | number | null) => {
    if (!id) return;
    router.push(`/admin/${table}/${id}`);
  };

  useEffect(() => {
    setActiveLayout(localStorage.getItem(LOCAL_STORAGE_KEY) ?? DEFAULT_LAYOUT);
  }, []);

  return (
    <>
      {/* Header */}
      <Flex align="center" justify="space-between">
        <Box>
          <Breadcrump table={table} />
          <Heading as="h2" fontSize="2xl">
            <Text as="span" mr={1.5} color={labelColor} fontWeight={300}>
              table:
            </Text>
            {table}
            <Badge
              ml={2}
              py={1}
              px={1.5}
              fontSize="sm"
              fontWeight={500}
              borderRadius={6}
            >
              {data.length} rows
            </Badge>
          </Heading>
        </Box>

        <LayoutGroupButton active={activeLayout} setActive={setActiveLayout} />
      </Flex>

      <Divider my={4} />

      {/* Table */}
      {activeLayout === "table" && (
        <TableContainer m={-1} p={1}>
          <Table variant="striped" size="sm">
            {/* Table head */}
            <Thead>
              <Tr>
                {columns.map((column) => (
                  <Th key={`th-${column}`} pb={4}>
                    {column}
                  </Th>
                ))}
              </Tr>
            </Thead>
            {/* Table body */}
            <Tbody>
              {data.map((row) => (
                <Tr
                  key={`tr-${renderId(row.id)}`}
                  role="group"
                  onClick={() => handleClick(renderId(row.id))}
                  _hover={{ cursor: "pointer" }}
                >
                  {columns.map((column, i) => {
                    const value = row[column as keyof AnyTable] as AnyValue;
                    return (
                      <Td
                        key={`td-${column}-${value}`}
                        py={5}
                        _groupHover={{
                          bgColor: tdBgColor,
                        }}
                      >
                        <Text fontWeight={i === 0 ? 700 : 400}>
                          {renderValue(value)}
                        </Text>
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* Card */}
      {activeLayout === "card" && (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={{ base: 3, sm: 4 }}
          m={-1}
          p={1}
        >
          {data.map((row) => (
            <Card
              key={`card-${renderId(row.id)}`}
              bgColor={cardBgColor}
              boxShadow="none"
              borderStyle="solid"
              borderColor={cardBorderColor}
              borderWidth={1}
              borderRadius={8}
              onClick={() => handleClick(renderId(row.id))}
              _hover={{
                cursor: "pointer",
                boxShadow: "outline",
              }}
            >
              <CardHeader
                px={6}
                borderStyle="solid"
                borderColor={cardBorderColor}
                borderBottomWidth={1}
              >
                <Heading fontSize="md">
                  <Text as="span" mr={1.5} color={labelColor} fontWeight={400}>
                    id:
                  </Text>
                  {renderId(row.id)}
                </Heading>
              </CardHeader>
              <CardBody px={6}>
                <List>
                  {columns
                    .filter((column) => column !== "id")
                    .map((column) => (
                      <ListItem key={`text-${column}`} fontSize="sm">
                        <Text
                          as="span"
                          mr={1.5}
                          color={labelColor}
                          fontWeight={300}
                        >
                          {column}:
                        </Text>
                        {renderValue(row[column as keyof AnyTable] as AnyValue)}
                      </ListItem>
                    ))}
                </List>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}

      <Divider my={6} />

      {/* Footer */}
      <Button
        as={NextLink}
        href="/admin"
        variant="outline"
        size="lg"
        leftIcon={<HiOutlineArrowLongLeft />}
      >
        Back
      </Button>
    </>
  );
};

export default View;
