"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AspectRatio,
  Box,
  Card,
  CardFooter,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Header from "@/app/components/Header";
import { FlagImage, ResortImage } from "@/app/components/Image";
import { Resort } from "@/app/utils/types";

const MapComponent = ({ id }: { id: string }) => {
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

const View = ({ data }: { data: Resort[] }) => {
  const router = useRouter();
  const regionColor = useColorModeValue("gray.400", "gray.500");

  const handleClick = (id: string) => {
    router.push(`/resort/${id}`);
  };

  return (
    <>
      <Header />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {data.map(({ id, name, region, country_code, map }) => (
          <Card
            key={id}
            overflow="hidden"
            _hover={{
              cursor: "pointer",
              boxShadow: "outline",
            }}
            onClick={() => handleClick(id)}
          >
            {/* Map */}
            <MapComponent id={map} />

            <CardFooter>
              <Flex justify="space-between" width="full">
                <Flex align="center">
                  <FlagImage countryCode={country_code} boxSize={26} mr={2} />
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

                <ResortImage id={id} name={name} boxSize={14} rounded="full" />
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default View;
