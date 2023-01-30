"use client";

import { usePathname } from "next/navigation";
import {
  Heading,
  AspectRatio,
  Badge,
  Card,
  CardHeader,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

import Header from "../components/Header";

import TRIPS from "../../data/trips";
import VIDEOS from "../../data/videos";

const Page = () => {
  const pathname = usePathname();

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid columns={3} spacing={6}>
        {Object.keys(VIDEOS)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((tripId) => {
            const tripIdAsNum = parseInt(tripId);
            const trip = TRIPS.find((trip) => tripIdAsNum === trip.id);

            if (!trip) return null;

            return (
              <Card key={tripId} bgColor="gray.50">
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
                <AspectRatio key={tripId} ratio={16 / 9} overflow="hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEOS[tripIdAsNum]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      borderBottomLeftRadius: "var(--card-radius)",
                      borderBottomRightRadius: "var(--card-radius)",
                    }}
                  ></iframe>
                </AspectRatio>
              </Card>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export default Page;
