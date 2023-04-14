"use client";

import { AspectRatio, Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

const Loading = () => (
  <SimpleGrid
    columns={{ base: 1, sm: 2, md: 3 }}
    spacing={{ base: 3, sm: 4, md: 5, lg: 6 }}
  >
    {[...Array(3)].map((_, i) => (
      <Box key={`video-loading-${i}`}>
        <Skeleton>
          <AspectRatio ratio={16 / 9}>
            <div>Loading</div>
          </AspectRatio>
        </Skeleton>

        <Skeleton width="32" height="5" mt={3} />
        <Flex mt={1}>
          <Skeleton width="8" height="3" mr={1} />
          <Skeleton width="28" height="3" />
        </Flex>
      </Box>
    ))}
  </SimpleGrid>
);

export default Loading;
