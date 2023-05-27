"use client";

import { memo } from "react";
import {
  AspectRatio,
  Card,
  CardBody,
  Flex,
  List,
  ListItem,
  Show,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { FlagImage, ResortImage } from "@/app/components/Image";
import { COUNTRIES } from "@/app/utils/locales";
import { Resort, Trip } from "@/app/utils/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const ZOOM: number = 13;
const OPTIONS: google.maps.MapOptions = {
  controlSize: 26,
  mapTypeControlOptions: {
    mapTypeIds: ["roadmap", "hybrid"],
  },
  streetViewControl: false,
};

const MapComponent = memo(({ latLng }: { latLng: Resort["lat_lng"] }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
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

const Info = ({
  resortData,
  tripsData,
}: {
  resortData: Resort;
  tripsData: Trip[];
}) => (
  <Card
    borderTopWidth={4}
    borderStyle="solid"
    borderColor="secondary.600"
    borderRadius={16}
  >
    <CardBody>
      <Flex justify="space-between">
        <List spacing={3}>
          <ListItem fontWeight={500} display="flex" alignItems="center">
            <Text as="span" mr={2} color="gray.500" fontWeight={400}>
              Země /
            </Text>
            {COUNTRIES[resortData.country_code]}
            <FlagImage countryCode={resortData.country_code} ml={2} />
          </ListItem>

          <ListItem fontWeight={500}>
            <Text as="span" mr={2} color="gray.500" fontWeight={400}>
              Region /
            </Text>
            {resortData.region}
          </ListItem>

          <ListItem fontWeight={500} display="flex" alignItems="center">
            <Text as="span" mr={2} color="gray.500" fontWeight={400}>
              Navštívili jsme /
            </Text>
            {tripsData.map(({ year }) => year).join(", ")}
            <Text as="span" ml={1} fontWeight={400}>
              ({tripsData.length}x)
            </Text>
          </ListItem>
        </List>

        <Show above="sm">
          <ResortImage id={resortData.id} name={resortData.name} boxSize={24} />
        </Show>
      </Flex>
    </CardBody>

    <CardBody pt={0} px={0}>
      {/* Map */}
      <AspectRatio ratio={2.35 / 1} maxH="250px">
        <MapComponent latLng={resortData.lat_lng} />
      </AspectRatio>
    </CardBody>
  </Card>
);

export default Info;
