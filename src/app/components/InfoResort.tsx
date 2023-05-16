"use client";

import { useState } from "react";
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

import { FlagImage, ResortImage } from "@/app/components/Image";
import { COUNTRIES } from "@/app/utils/locales";
import { Resort, Trip } from "@/app/utils/types";

const MapComponent = ({ id }: { id: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton isLoaded={isLoaded} borderRadius="none">
      <AspectRatio ratio={2.35 / 1} maxH="250px">
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

const Info = ({
  resortData,
  tripsData,
}: {
  resortData: Resort;
  tripsData: Trip[];
}) => (
  <Card borderTopWidth={4} borderStyle="solid" borderColor="secondary.600">
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
      <MapComponent id={resortData.map} />
    </CardBody>
  </Card>
);

export default Info;
