"use client";

import { useRouter } from "next/navigation";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import countBy from "ramda/src/countBy";

import { FlagImage } from "@/app/components/Image";
import { COUNTRIES } from "@/app/utils/locales";
import { Trip } from "@/app/utils/types";

const MostCountries = ({ trips }: { trips: Trip[] }) => {
  const router = useRouter();

  const hoverBgColor = useColorModeValue("gray.300", "gray.600");

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
          _hover={{ cursor: "pointer", bgColor: hoverBgColor }}
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
