"use client";

import { Fragment } from "react";
import { Skeleton, SimpleGrid } from "@chakra-ui/react";

const Loading = () => (
  <SimpleGrid
    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
    spacing={{ base: 3, sm: 4, lg: 5 }}
  >
    {[...Array(8)].map((_, i) => (
      <Fragment key={`member-loading-${i}`}>
        <Skeleton height="327" />
      </Fragment>
    ))}
  </SimpleGrid>
);

export default Loading;
