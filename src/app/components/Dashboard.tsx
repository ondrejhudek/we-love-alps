"use client";

import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

const Dashboard = ({
  statMembers,
  statTrip,
  statResort,
  statPhoto,
  statVideo,
  widgetMostMembers,
  widgetMostCountries,
  widgetAllResortsMap,
  calendar,
}: {
  statMembers: React.ReactNode;
  statTrip: React.ReactNode;
  statResort: React.ReactNode;
  statPhoto: React.ReactNode;
  statVideo: React.ReactNode;
  widgetMostMembers: React.ReactNode;
  widgetMostCountries: React.ReactNode;
  widgetAllResortsMap: React.ReactNode;
  calendar: React.ReactNode;
}) => (
  <Flex gap={6}>
    <Box flex={1}>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 2, sm: 3, md: 3 }}
      >
        {statMembers}
        {statTrip}
        {statResort}
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 2, sm: 3, md: 3 }}
        mt={{ base: 2, sm: 3, md: 3 }}
      >
        {statPhoto}
        {statVideo}
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={3} my={12}>
        {/* Most frequent members */}
        {widgetMostMembers}

        {/* Most visited countries */}
        {widgetMostCountries}
      </SimpleGrid>

      {/* All resorts map */}
      <Box mt={12}>{widgetAllResortsMap}</Box>
    </Box>

    {/* Calendar */}
    <Box
      width="360px"
      maxHeight="1050px"
      overflowY="auto"
      py={5}
      px={7}
      bg="gray.200"
      borderRadius={16}
    >
      {calendar}
    </Box>
  </Flex>
);

export default Dashboard;
