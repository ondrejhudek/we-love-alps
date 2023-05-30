"use client";

import { TableMetadata } from "kysely";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Code,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiOutlineWrench } from "react-icons/hi2";

const normalizeDataType = (value: string) => {
  if (value === "_text") return "text[]";
  return value;
};

const View = ({
  member,
  trip,
  resort,
  video,
  schema,
}: {
  member: number;
  trip: number;
  resort: number;
  video: number;
  schema: TableMetadata[];
}) => {
  const counts = {
    member,
    trip,
    resort,
    video,
  };
  const entries = Object.entries(counts);

  const cardBgColor = useColorModeValue("gray.50", "gray.900");
  const cardBorderColor = useColorModeValue("gray.100", "gray.700");
  const labelColor = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={4} m={-1} p={1}>
        {entries.map(([key, value]) => {
          const tableSchema = schema.find((table) => table.name === key);

          return (
            <Card
              key={`table-${value}`}
              bgColor={cardBgColor}
              boxShadow="none"
              borderStyle="solid"
              borderColor={cardBorderColor}
              borderWidth={1}
              borderRadius={8}
            >
              {/* Header */}
              <CardHeader
                px={6}
                borderStyle="solid"
                borderColor={cardBorderColor}
                borderBottomWidth={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading as="h3" fontSize="xl">
                  <Text as="span" mr={1.5} color={labelColor} fontWeight={400}>
                    table:
                  </Text>
                  {key}
                </Heading>

                <Badge size="sm" py={0.5} px={3} borderRadius={6}>
                  {value} rows
                </Badge>
              </CardHeader>

              {/* Body */}
              {tableSchema && (
                <CardBody>
                  <List>
                    {tableSchema.columns.map(
                      ({ name, dataType, isAutoIncrementing, isNullable }) => (
                        <ListItem key={`column-${name}`} py="1px" fontSize="sm">
                          <Text
                            as="span"
                            mr={1.5}
                            color={labelColor}
                            fontWeight={300}
                          >
                            {name}:
                          </Text>
                          {normalizeDataType(dataType)}
                          {isAutoIncrementing && (
                            <Code ml={1}>isAutoIncrementing</Code>
                          )}
                          {isNullable && <Code ml={1}>isNullable</Code>}
                        </ListItem>
                      )
                    )}
                  </List>
                </CardBody>
              )}

              {/* Footer */}
              <CardFooter
                borderStyle="solid"
                borderColor={cardBorderColor}
                borderTopWidth={1}
              >
                <Button
                  as={Link}
                  href={`/admin/${key}`}
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  leftIcon={<HiOutlineWrench />}
                >
                  Manage
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default View;
