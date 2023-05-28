"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Code,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiOutlineWrench } from "react-icons/hi2";

const View = (counts: {
  member: number;
  trip: number;
  resort: number;
  video: number;
}) => {
  const { data: session } = useSession();
  const entries = Object.entries(counts);

  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <SimpleGrid columns={entries.length} gap={4}>
        {entries.map(([key, value]) => (
          <Card key={value} borderRadius={16} bgColor={bgColor}>
            <CardBody py={6} px={7}>
              <Heading as="h3" fontSize="xl" mb={1}>
                <Text as="span" fontWeight={300}>
                  table:
                </Text>{" "}
                {key}
              </Heading>

              <Text mb={6}>
                <Badge size="sm" py={0.5} px={3} borderRadius="full">
                  {value} rows
                </Badge>
              </Text>

              <Button
                as={Link}
                href={`/admin/${key}`}
                variant="outline"
                colorScheme="red"
                size="sm"
                leftIcon={<HiOutlineWrench />}
              >
                Manage
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Code
        colorScheme="secondary"
        display="block"
        whiteSpace="pre-wrap"
        borderRadius={16}
        p={10}
        my={4}
      >
        {JSON.stringify(session, null, 2)}
      </Code>

      {/* Sign out */}
      <Button
        colorScheme="secondary"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    </>
  );
};

export default View;
