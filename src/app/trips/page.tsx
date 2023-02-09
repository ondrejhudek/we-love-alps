"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heading,
  SimpleGrid,
  Text,
  Box,
  Flex,
  Card,
  CardBody,
  Icon,
  useColorModeValue,
  Avatar,
  AvatarGroup,
  Tooltip,
} from "@chakra-ui/react";
import { FaSkiing } from "react-icons/fa";
import groupBy from "ramda/src/groupBy";

import Header from "@/app/components/Header";
import { MONTHS } from "@/app/components/utils";

import COUNTRIES from "@/data/countries";
import MEMBERS from "@/data/members";
import RESORTS from "@/data/resorts";
import TRIPS, { Trip } from "@/data/trips";

const TooltipAvatar: typeof Avatar = (props: any) => (
  <Tooltip label={props.name}>
    <Avatar
      {...props}
      borderWidth={1}
      color={useColorModeValue("white", "gray.900")}
      bg={useColorModeValue("gray.400", "gray.500")}
    />
  </Tooltip>
);

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const monthColor = useColorModeValue("gray.400", "gray.500");
  const resortColor = useColorModeValue("gray.600", "gray.400");

  const groupedTrips = groupBy<Trip>((trip) => trip.year.toString(), TRIPS);
  const groupedKeys = Object.keys(groupedTrips).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const handleClick = (id: string) => {
    router.push(`/trips/${id}`);
  };

  return (
    <>
      <Header pathname={pathname} />

      {groupedKeys.map((year) => (
        <Box key={year}>
          <Heading as="h2" fontSize="2xl" my={5}>
            {year}
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 3, sm: 4, lg: 5 }}
          >
            {groupedTrips[year]
              .sort((a, b) => b.month - a.month)
              .map(
                ({
                  id,
                  title,
                  countryCode,
                  month,
                  resorts,
                  members,
                  nonMembers,
                }) => (
                  <Card
                    key={id}
                    onClick={() => handleClick(id)}
                    _hover={{
                      cursor: "pointer",
                      boxShadow: "outline",
                    }}
                  >
                    <CardBody overflow="auto">
                      {/*  Month */}
                      <Text
                        color={monthColor}
                        fontSize="xs"
                        textTransform="uppercase"
                      >
                        {MONTHS[month - 1]}
                      </Text>

                      {/* Title */}
                      <Heading
                        as="h3"
                        size="md"
                        display="flex"
                        mb={2}
                        alignItems="center"
                        textTransform="uppercase"
                      >
                        {title}
                        <Box ml={2}>
                          <Image
                            src={`/images/flags/${countryCode.toLowerCase()}.png`}
                            alt={countryCode}
                            title={COUNTRIES[countryCode]}
                            width={20}
                            height={20}
                          />
                        </Box>
                      </Heading>

                      {/* Resorts */}
                      <Flex align="center">
                        <Icon
                          as={FaSkiing}
                          color="secondary.600"
                          fontSize="sm"
                          mr={3}
                        />

                        <Text fontSize="sm" color={resortColor}>
                          {resorts
                            .map((id) =>
                              RESORTS.filter((resort) => resort.id === id).map(
                                (resort) => resort.name
                              )
                            )
                            .join(", ")}
                        </Text>
                      </Flex>

                      {/* Members */}
                      <AvatarGroup
                        size="sm"
                        spacing={-1.5}
                        mt={3}
                        max={members.length}
                        color="white"
                        fontSize="sm"
                      >
                        {members.map((id) =>
                          MEMBERS.filter((member) => member.id === id).map(
                            ({ id, name }) => (
                              <TooltipAvatar key={id} name={name} />
                            )
                          )
                        )}

                        {/* Non members */}
                        {nonMembers &&
                          nonMembers > 0 &&
                          [...Array(nonMembers)].map((_, i) => (
                            <Avatar key={`nonMember-${i}`} />
                          ))}
                      </AvatarGroup>
                    </CardBody>
                  </Card>
                )
              )}
          </SimpleGrid>
        </Box>
      ))}
    </>
  );
};

export default Page;
