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

const Page = () => {
  const pathname = usePathname();

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid columns={4} spacing={4}>
        {MEMBERS.map(
          ({ id, firstname, lastname, nickname, facebook, instagram }) => {
            const name = `${firstname} ${lastname}`;
            const trips = TRIPS.filter((trip) => trip.members.includes(id));

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
                <Box>
                  <Tooltip
                    label={
                      <Box textAlign="center" py={1} px={2}>
                        {trips.map(({ id, title }) => (
                          <Text key={id}>{title}</Text>
                        ))}
                      </Box>
                    }
                    placement="top"
                    hasArrow
                  >
                    <Text>Celkem se zůčastnil {trips.length} zájezdů.</Text>
                  </Tooltip>
                </Box>
              </Card>
            );
          }
        )}
      </SimpleGrid>
    </>
  );
};

export default Page;
