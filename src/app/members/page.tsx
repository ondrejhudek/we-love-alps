"use client";

import { usePathname } from "next/navigation";
import {
  SimpleGrid,
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Icon,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

import Header from "../components/Header";
import Card from "../components/Card";

import MEMBERS from "../../data/members";
import TRIPS from "../../data/trips";
import RESORTS from "../../data/resorts";

const Stat = ({ list, term }: { list: string[]; term: string }) => (
  <Tooltip
    label={
      <Box textAlign="center" py={1} px={2}>
        {list.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Box>
    }
    placement="top"
    hasArrow
  >
    <Flex
      direction="column"
      justify="center"
      boxSize={20}
      textAlign="center"
      color="white"
      bgColor="primary.600"
      rounded="full"
    >
      <Text as="span" fontSize="3xl" fontWeight="800" lineHeight={7}>
        {list.length}
      </Text>
      <Text fontSize="xs" fontWeight={500} color="gray.200">
        {term}
      </Text>
    </Flex>
  </Tooltip>
);

const Page = () => {
  const pathname = usePathname();

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
        {MEMBERS.map(
          ({ id, firstname, lastname, nickname, facebook, instagram }) => {
            const name = `${firstname} ${lastname}`;
            const trips = TRIPS.filter((trip) => trip.members.includes(id));
            const tripNames = trips.map(
              ({ title, year }) => `${title} (${year})`
            );
            const resortNames = [
              ...new Set(trips.flatMap(({ resorts }) => resorts)),
            ].map(
              (resortId) =>
                RESORTS.find(({ id }) => id === resortId)?.name || ""
            );

            return (
              <Card
                key={id}
                header={
                  <Box textAlign="center">
                    <Avatar
                      src={`/images/members/${nickname}.jpg`}
                      size="xl"
                      mb={4}
                    />
                    <Heading fontSize="xl">{name}</Heading>
                    <Text fontWeight={600} color={"gray.500"}>
                      @{nickname}
                    </Text>
                  </Box>
                }
                footer={
                  (facebook || instagram) && (
                    <Flex flex="1" justify="center">
                      {/* Facebook */}
                      {facebook && (
                        <Link
                          href={`https://www.facebook.com/${facebook}`}
                          target="_blank"
                        >
                          <Icon
                            as={FaFacebookSquare}
                            boxSize={8}
                            mr={1}
                            color="facebook.500"
                            _hover={{
                              color: "facebook.300",
                            }}
                          />
                        </Link>
                      )}
                      {/* Instagram */}
                      {instagram && (
                        <Link
                          href={`https://www.instagram.com/${instagram}`}
                          target="_blank"
                        >
                          <Icon
                            as={FaInstagramSquare}
                            boxSize={8}
                            ml={1}
                            color="#E1306C"
                            _hover={{
                              color: "#e96290",
                            }}
                          />
                        </Link>
                      )}
                    </Flex>
                  )
                }
              >
                <Flex justify="space-evenly">
                  {/* Trips */}
                  <Stat list={tripNames} term="zájezdů" />

                  {/* Resorts */}
                  <Stat list={resortNames} term="středisek" />
                </Flex>
              </Card>
            );
          }
        )}
      </SimpleGrid>
    </>
  );
};

export default Page;
