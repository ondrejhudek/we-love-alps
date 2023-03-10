"use client";

import {
  AspectRatio,
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const Loading = () => (
  <SimpleGrid
    columns={{ base: 1, xs: 2, sm: 3, md: 4 }}
    spacing={{ base: 3, sm: 4, lg: 5 }}
  >
    {[...Array(11)].map((_, i) => (
      <Box key={`skeleton-${i}`}>
        <AspectRatio ratio={4 / 3}>
          <Skeleton borderRadius="lg" boxShadow="base" />
        </AspectRatio>
        <Box py={3} overflow="hidden">
          <SkeletonText noOfLines={1} skeletonHeight={5} width={36} my={1} />
          <SkeletonText noOfLines={1} skeletonHeight={3} width={8} />
        </Box>
      </Box>
    ))}
  </SimpleGrid>
);

export default Loading;
