"use client";

import { Skeleton, SimpleGrid } from "@chakra-ui/react";

const Loading = () => (
  <>
    {[...Array(3)].map(() => (
      <>
        <Skeleton width="28" height="30" my={5} />

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 3, sm: 4, lg: 5 }}
        >
          <Skeleton height="155" />
        </SimpleGrid>
      </>
    ))}
  </>
);

export default Loading;
