"use client";

import { Fragment } from "react";
import { Skeleton, SimpleGrid } from "@chakra-ui/react";

const Loading = () => (
  <SimpleGrid
    columns={{ base: 1, sm: 2, md: 3 }}
    spacing={{ base: 3, sm: 4, lg: 5 }}
  >
    {[...Array(6)].map((_, i) => (
      <Fragment key={`resort-loading-${i}`}>
        <Skeleton height="272" />
      </Fragment>
    ))}
  </SimpleGrid>
);

export default Loading;
