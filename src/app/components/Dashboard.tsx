"use client";

import { Box, Grid, SimpleGrid } from "@chakra-ui/react";

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
  <Grid
    templateColumns={{
      base: "1fr",
      md: "1fr minmax(auto, 300px)",
      lg2: "1fr minmax(auto, 340px)",
      xl: "1fr minmax(auto, 360px)",
    }}
    templateRows="auto"
    gap={{ base: 10, md: 4, lg: 5, xl: 6 }}
  >
    <Box>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 2, sm: 3 }}>
        {statMembers}
        {statTrip}
        {statResort}
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 2, sm: 3, md: 3 }}
        mt={{ base: 2, sm: 3, md: 3 }}
      >
        {statPhoto}
        {statVideo}
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={3}
        spacingY={{ base: 12, lg: 0 }}
        my={12}
      >
        {/* Most frequent members */}
        {widgetMostMembers}

        {/* Most visited countries */}
        {widgetMostCountries}
      </SimpleGrid>

      {/* All resorts map */}
      <Box mt={12}>{widgetAllResortsMap}</Box>
    </Box>

    {/* Calendar */}
    <Box>{calendar}</Box>
  </Grid>
);

export default Dashboard;
