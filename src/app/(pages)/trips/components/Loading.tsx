"use client";

import { Fragment } from "react";
import { Skeleton, SimpleGrid } from "@chakra-ui/react";

const Loading = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <Fragment key={`trip-loading-${i}`}>
        <Skeleton width="28" height="30" my={5} />

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 3, sm: 4, lg: 5 }}
        >
          <Skeleton height="155" />
          <Skeleton height="155" />
        </SimpleGrid>
      </Fragment>
    ))}
  </>
);

export default Loading;
