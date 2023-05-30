"use client";

import { memo } from "react";
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
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import Header from "@/app/components/Header";
import { FlagImage, ResortImage } from "@/app/components/Image";
import { Resort } from "@/app/utils/types";

const ZOOM: number = 13;
const OPTIONS: google.maps.MapOptions = {
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  gestureHandling: "none",
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
};

const MapComponent = memo(({ latLng }: { latLng: Resort["lat_lng"] }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  if (!isLoaded) return <Skeleton />;

  return (
    <GoogleMap
      center={{
        lat: latLng.x,
        lng: latLng.y,
      }}
      zoom={ZOOM}
      options={OPTIONS}
    />
  );
});

MapComponent.displayName = "MapComponent";

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
        {data.map(({ id, name, region, country_code, lat_lng }) => (
          <Card
            key={id}
            borderRadius={16}
            overflow="hidden"
            _hover={{
              cursor: "pointer",
              boxShadow: "outline",
            }}
            onClick={() => handleClick(id)}
          >
            {/* Map */}
            <AspectRatio ratio={2.35 / 1}>
              <MapComponent latLng={lat_lng} />
            </AspectRatio>

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
