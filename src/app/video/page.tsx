"use client";

import { usePathname } from "next/navigation";
import {
  Heading,
  AspectRatio,
  Badge,
  Text,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardFooter,
  useColorModeValue,
} from "@chakra-ui/react";

import Header from "../components/Header";

import TRIPS from "../../data/trips";
import VIDEOS from "../../data/videos";

const Page = () => {
  const pathname = usePathname();
  const footerColor = useColorModeValue("gray.600", "gray.300");
  const footerColorAssign = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 3, md: 6 }}
      >
        {Object.keys(VIDEOS)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((tripId) => {
            const tripIdAsNum = parseInt(tripId);
            const trip = TRIPS.find((trip) => tripIdAsNum === trip.id);

            if (!trip) return null;

            return (
              <Card key={tripId}>
                {/* Header */}
                <CardHeader>
                  <Flex align="center">
                    {/* Year */}
                    <Badge
                      color="white"
                      bgColor="secondary.600"
                      fontSize="lg"
                      display="flex"
                      alignItems="center"
                      px={2}
                      borderRadius="md"
                    >
                      {trip.year}
                    </Badge>

                    {/* Title */}
                    <Heading as="h2" ml={2} fontSize="xl">
                      {trip.title}
                    </Heading>
                  </Flex>
                </CardHeader>

                {/* Youtube video */}
                <AspectRatio key={tripId} ratio={16 / 9}>
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEOS[tripIdAsNum]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>

                {/* Footer */}
                <CardFooter>
                  <Text color={footerColor} fontSize="xs">
                    Video od{" "}
                    <Text as="span" color={footerColorAssign} fontWeight={500}>
                      @stuchla
                    </Text>
                  </Text>
                </CardFooter>
              </Card>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export default Page;
