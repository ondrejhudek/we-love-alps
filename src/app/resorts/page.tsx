"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Heading,
  SimpleGrid,
  Text,
  AspectRatio,
  Box,
  Flex,
  Badge,
} from "@chakra-ui/react";

import Card from "../components/Card";
import Header from "../components/Header";

import COUNTRIES from "../../data/countries";
import RESORTS from "../../data/resorts";
import TRIPS from "../../data/trips";

const Page = () => {
  const pathname = usePathname();

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {RESORTS.map(({ id, name, region, countryCode, map }) => {
          const trips = TRIPS.filter((trip) => trip.resorts.includes(id));

          return (
            <Card key={id}>
              <Flex align="center">
                <Box mr={2}>
                  <Image
                    src={`/images/flags/${countryCode.toLowerCase()}.png`}
                    alt={COUNTRIES[countryCode]}
                    width={26}
                    height={26}
                  />
                </Box>
                <Box>
                  {/* Region */}
                  <Text
                    color="tertiary.300"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    {region}
                  </Text>
                  {/* Name */}
                  <Heading as="h2" mt={-0.5} fontSize="lg">
                    {name}
                  </Heading>
                </Box>
              </Flex>

              {/* Map */}
              <AspectRatio ratio={2.35 / 1} my={4} mx={-5}>
                <iframe
                  src={`https://www.google.com/maps/embed?pb=${encodeURIComponent(
                    map
                  )}`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </AspectRatio>

              <Text fontSize="sm" fontWeight={500}>
                Celkem jsme navštívili{" "}
                <Text as="span" fontWeight={800}>
                  {trips.length}x
                </Text>
              </Text>

              <Box mt={2}>
                {trips.map(({ year }, i) => (
                  <Badge
                    key={year}
                    ml={i > 0 ? 1 : 0}
                    px={2}
                    py={1}
                    color="white"
                    bgColor="secondary.600"
                    borderRadius="md"
                  >
                    {year}
                  </Badge>
                ))}
              </Box>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default Page;
