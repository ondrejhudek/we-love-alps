"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import countBy from "ramda/src/countBy";

import { FlagImage } from "@/app/components/Image";
import { COUNTRIES } from "@/app/utils/locales";
import { Trip } from "@/app/utils/types";

export const MostCountriesLoading = () => (
  <>
    {Array.from({ length: 3 }).map((_, i) => (
      <Flex key={`skeleton-${i}`} justify="space-between" align="center">
        <Flex align="center">
          <SkeletonCircle size="10" />
          <Skeleton width={32} height={5} ml={3} />
        </Flex>
        <Skeleton width={6} height={5} mr={1} />
      </Flex>
    ))}
  </>
);

export const MostCountriesWrapper = ({ children }: PropsWithChildren) => (
  <Box>
    <Heading mb={4} size="md">
      Nejčastěji jezdí
    </Heading>

    <SimpleGrid columns={1} spacingY={6} p={4} bg="gray.200" borderRadius={16}>
      {children}
    </SimpleGrid>
  </Box>
);

const MostCountries = ({ trips }: { trips: Trip[] }) => {
  const router = useRouter();
  const top3Countries = countBy((trip) => trip.country_code, trips);

  const handleClick = (countryCode: string) => {
    router.push(`/resort?country_code=${countryCode}`);
  };

  return (
    <>
      {Object.keys(top3Countries).map((countryCode) => (
        <Flex
          key={countryCode}
          justify="space-between"
          alignItems="center"
          m={-2}
          p={2}
          borderRadius={12}
          _hover={{ cursor: "pointer", bgColor: "gray.300" }}
          onClick={() => handleClick(countryCode)}
        >
          <Flex alignItems="center">
            <FlagImage countryCode={countryCode} boxSize={40} />
            <Text ml={3} fontWeight={500}>
              {COUNTRIES[countryCode]}
            </Text>
          </Flex>
          <Text pr={1} fontWeight={700}>
            {top3Countries[countryCode]}x
          </Text>
        </Flex>
      ))}
    </>
  );
};

export default MostCountries;
