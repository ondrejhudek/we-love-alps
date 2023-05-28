"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Divider,
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
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import is from "ramda/src/is";

import { TableName, AnyTable, AnyColumn, AnyValue } from "@/app/utils/types";

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
  if (!value) return null;

  // Array
  if (is(Array, value)) return value.join(", ");

  // Object
  if (is(Object, value)) return Object.values(value).join(", ");

  // String, Number, Boolean
  return value;
};

const View = ({ table, data }: { table: TableName; data: AnyTable[] }) => {
  const router = useRouter();
  console.log({ table, data });
  const columns = Object.keys(data[0]) as AnyColumn[];

  const hoverBgColor = useColorModeValue("gray.300", "gray.600");

  const handleClick = (id: string | number | null) => {
    if (!id) return;
    router.push(`/admin/${table}/${id}`);
  };

  return (
    <>
      <TableContainer
        p={6}
        borderStyle="solid"
        borderColor="gray.700"
        borderWidth={1}
        borderRadius={16}
      >
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={`th-${column}`} pb={4}>
                  {column}
                </Th>
              ))}
            </Tr>
          </Thead>
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
                      py={4}
                      _groupHover={{ bgColor: hoverBgColor }}
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

      <Divider my={6} />

      <Button
        as={Link}
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
