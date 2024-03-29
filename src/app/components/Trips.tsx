"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { FlagImage } from "@/app/components/Image";
import { Trip } from "@/app/utils/types";

const Trips = ({ data }: { data: Trip[] }) => {
  const router = useRouter();

  const tripBgColor = useColorModeValue("gray.50", "gray.800");

  const handleClick = (id: string) => {
    router.push(`/trip/${id}`);
  };

  return (
    <Flex wrap="wrap" m={-2}>
      {data.map(({ id, title, year, country_code }) => (
        <Card
          key={id}
          m={2}
          width={{ base: "100%", sm: 56 }}
          bgColor={tripBgColor}
          borderRadius="lg"
          _hover={{
            cursor: "pointer",
            boxShadow: "outline",
          }}
          onClick={() => handleClick(id)}
        >
          <CardBody py={4} display="flex" alignItems="center">
            <FlagImage countryCode={country_code} boxSize={28} mr={3} />
            <Box>
              <Text color="gray.500" fontSize="sm" lineHeight="none">
                {year}
              </Text>
              <Text fontSize="md" fontWeight={600}>
                {title}
              </Text>
            </Box>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
};

export default Trips;
