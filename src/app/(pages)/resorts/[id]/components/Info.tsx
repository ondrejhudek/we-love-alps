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
import { COUNTRIES } from "@/app/utils";
import { ResortProps, TripProps } from "@/app/utils/types";

const Map = ({ id }: { id: string }) => {
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
  resortData: ResortProps;
  tripsData: TripProps[];
}) => (
  <Card borderTopWidth={4} borderStyle="solid" borderColor="secondary.600">
    <CardBody>
      <Flex justify="space-between">
        <List spacing={3}>
          <ListItem fontWeight={500} display="flex" alignItems="center">
            <Text as="span" mr={2} color="gray.500" fontWeight={400}>
              Země /
            </Text>
            {COUNTRIES[resortData.countryCode]}
            <FlagImage countryCode={resortData.countryCode} ml={2} />
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
      <Map id={resortData.map} />
    </CardBody>
  </Card>
);

export default Info;
