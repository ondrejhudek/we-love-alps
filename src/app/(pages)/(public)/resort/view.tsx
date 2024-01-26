"use client";

import { memo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AspectRatio,
  Box,
  Card,
  CardFooter,
  Flex,
  Heading,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import Header from "@/app/components/Header";
import { FlagImage, ResortImage } from "@/app/components/Image";
import { Resort } from "@/app/utils/types";
import { COUNTRIES } from "@/app/utils/locales";

const ZOOM: number = 13;
const OPTIONS: google.maps.MapOptions = {
  clickableIcons: false,
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
  const searchParams = useSearchParams();
  const countryCode = searchParams.get("countryCode");
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCode ?? ""
  );

  const filteredData =
    countryCode && Object.keys(COUNTRIES).includes(countryCode)
      ? data.filter(({ country_code }) => country_code === countryCode)
      : data;

  const regionColor = useColorModeValue("gray.400", "gray.500");

  const handleClick = (id: string) => {
    router.push(`/resort/${id}`);
  };

  const handleSelect = (value: string) => {
    router.push(`/resort?countryCode=${value}`);
    setSelectedCountryCode(value);
  };

  return (
    <>
      <Header
        rightComponent={
          <Select
            size="sm"
            placeholder="Vyber zemi"
            borderRadius={6}
            value={selectedCountryCode}
            onChange={(e) => handleSelect(e.target.value)}
          >
            {Object.entries(COUNTRIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        }
      />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {filteredData.map(({ id, name, region, country_code, lat_lng }) => (
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
            <Box position="relative">
              <AspectRatio ratio={2.35 / 1}>
                <MapComponent latLng={lat_lng} />
              </AspectRatio>
              <Box
                position="absolute"
                top={0}
                left={0}
                width="full"
                height="full"
                _hover={{
                  cursor: "pointer",
                }}
              />
            </Box>

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
