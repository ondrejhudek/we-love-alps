"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AspectRatio,
  Badge,
  Box,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Header from "@/app/components/Header";

import COUNTRIES from "@/data/countries";
import RESORTS from "@/data/resorts";
import TRIPS from "@/data/trips";

const Map = ({ id }: { id: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton isLoaded={isLoaded} borderRadius="none">
      <AspectRatio ratio={2.35 / 1}>
        <iframe
          src={`https://www.google.com/maps/embed?pb=${encodeURIComponent(id)}`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </AspectRatio>
    </Skeleton>
  );
};

const Page = () => {
  const router = useRouter();
  const regionColor = useColorModeValue("gray.400", "gray.500");
  const yearColor = useColorModeValue("white", "gray.900");
  const yearBgColor = useColorModeValue("secondary.600", "secondary.400");

  const handleClick = (id: string) => {
    router.push(`/resorts/${id}`);
  };

  return (
    <>
      <Header />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {RESORTS.map(({ id, name, region, countryCode, map }) => {
          const trips = TRIPS.filter((trip) => trip.resorts.includes(id));

          return (
            <Card
              key={id}
              _hover={{
                cursor: "pointer",
                boxShadow: "outline",
              }}
              onClick={() => handleClick(id)}
            >
              <CardHeader>
                <Flex align="center">
                  <Box mr={2}>
                    <Image
                      src={`/images/flags/${countryCode.toLowerCase()}.png`}
                      alt={COUNTRIES[countryCode]}
                      width={26}
                      height={26}
                    />
                  </Box>
                  <Box>
                    {/* Region */}
                    <Text
                      color={regionColor}
                      fontSize="xs"
                      textTransform="uppercase"
                    >
                      {region}
                    </Text>
                    {/* Name */}
                    <Heading as="h2" mt={-0.5} fontSize="lg">
                      {name}
                    </Heading>
                  </Box>
                </Flex>
              </CardHeader>

              {/* Map */}
              <Map id={map} />

              <CardFooter flexDirection="column">
                <Text fontSize="sm" fontWeight={500}>
                  Celkem jsme navštívili{" "}
                  <Text as="span" fontWeight={800}>
                    {trips.length}x
                  </Text>
                </Text>

                <Box mt={2}>
                  {trips.map(({ year }, i) => (
                    <Badge
                      key={year}
                      ml={i > 0 ? 1 : 0}
                      px={2}
                      py={1}
                      color={yearColor}
                      bgColor={yearBgColor}
                      borderRadius="md"
                    >
                      {year}
                    </Badge>
                  ))}
                </Box>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default Page;
