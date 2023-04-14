"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

import Trip, { TripContentProps } from "./Trip";

const Year = ({ year, trips }: { year: string; trips: TripContentProps[] }) => (
  <Box key={year}>
    <Heading as="h2" fontSize="2xl" my={5}>
      {year}
    </Heading>

    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 3, sm: 4, lg: 5 }}
    >
      {trips
        .sort((a, b) => b.month - a.month)
        .map((trip) => (
          <Trip key={trip.id} data={trip} />
        ))}
    </SimpleGrid>
  </Box>
);

export default Year;
