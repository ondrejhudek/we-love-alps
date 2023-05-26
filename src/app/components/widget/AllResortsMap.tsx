"use client";

import { memo, useState } from "react";
import NextLink from "next/link";
import { AspectRatio, Box, Link, Text } from "@chakra-ui/react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { Resort } from "@/app/utils/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const CENTER = {
  lat: 46.8,
  lng: 10.5,
};
const ZOOM = 6;
const OPTIONS = {
  streetViewControl: false,
  controlSize: 26,
};

const MapComponent = memo(({ resorts }: { resorts: Resort[] }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [infoWindowResort, setInfoWindowResort] = useState<Resort>();

  const handleMarkerClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng?.toJSON();
    if (!latLng) return;

    const resort = resorts.find(
      ({ lat_lng }) => lat_lng.x === latLng.lat && lat_lng.y === latLng.lng
    );
    if (!resort) return;
    setInfoWindowResort(resort);
  };

  const handleInfoWindowClose = () => {
    setInfoWindowResort(undefined);
  };

  return isLoaded ? (
    <GoogleMap center={CENTER} zoom={ZOOM} options={OPTIONS}>
      <>
        {resorts.map(({ id, lat_lng }) => (
          <Marker
            key={id}
            position={{
              lat: lat_lng.x,
              lng: lat_lng.y,
            }}
            onClick={handleMarkerClick}
          />
        ))}

        {infoWindowResort && (
          <InfoWindow
            position={{
              lat: infoWindowResort.lat_lng!.x,
              lng: infoWindowResort.lat_lng!.y,
            }}
            options={{
              pixelOffset: new window.google.maps.Size(0, -36),
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <Box mr={2}>
              <Text color="gray.700" fontSize="sm" fontWeight={700}>
                {infoWindowResort.name}
              </Text>
              <Text color="gray.600" fontSize="xs">
                {infoWindowResort.region}
              </Text>

              <Text mt={2}>
                <Link
                  as={NextLink}
                  href={`/resort/${infoWindowResort.id}`}
                  color="secondary.600"
                  fontSize="xs"
                  fontWeight="500"
                >
                  Detail
                </Link>
              </Text>
            </Box>
          </InfoWindow>
        )}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
});

MapComponent.displayName = "MapComponent";

const AllResortsMap = ({ resorts }: { resorts: Resort[] }) => (
  <AspectRatio ratio={2.35 / 1} minHeight="300px">
    <MapComponent resorts={resorts} />
  </AspectRatio>
);

export default AllResortsMap;
