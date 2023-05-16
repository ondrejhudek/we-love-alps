"use client";

import React, { useEffect, useRef } from "react";
import { AspectRatio, Box, Heading } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib25kcmVqaHVkZWsiLCJhIjoiY2xobnFqcjZvMWloZjNsb3hncjg4MXFlZiJ9.u1bqCWGHqRdmY3JObjfKIg";

const points = {
  features: [
    {
      type: "Feature",
      properties: {
        title: "Schladming",
        description: "A northside park that is home to the Lincoln Park Zoo",
      },
      geometry: {
        coordinates: [12.554729, 55.70651],
        type: "Point",
      },
      place_name: "Schladming, Styria, Austria",
    },
    {
      type: "Feature",
      properties: {
        title: "Kitzbühel",
        description: "A northside park that is home to the Lincoln Park Zoo",
      },
      geometry: {
        coordinates: [13.686788, 47.394042],
        type: "Point",
      },
      place_name: "Schladming, Styria, Austria",
    },
  ],
  type: "FeatureCollection",
};

const Mapbox = () => {
  const mapContainer = useRef(null);

  const popup = new mapboxgl.Popup().setText("Description");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [13.686788, 47.394042],
      zoom: 5,
    });

    // Create default markers
    points.features.map((feature) =>
      new mapboxgl.Marker()
        .setPopup(popup)
        .setLngLat(feature.geometry.coordinates as [number, number])
        .addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  });

  return (
    <AspectRatio ratio={2.35 / 1} minHeight="300px">
      <div ref={mapContainer} />
    </AspectRatio>
  );
};

const AllResortsMap = () => (
  <>
    <Heading size="md" mb={4}>
      Navštívená střediska
    </Heading>

    <Box
      borderWidth={8}
      borderColor="gray.200"
      borderRadius={16}
      overflow="hidden"
    >
      <Mapbox />
    </Box>
  </>
);

export default AllResortsMap;
