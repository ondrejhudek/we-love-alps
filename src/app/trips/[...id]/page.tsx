"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex,
  Heading,
  Icon,
  Img,
  Tooltip,
  Link,
  List,
  ListItem,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

import { MONTHS_CS } from "@/app/utils/locales";
import Alert from "@/app/components/Alert";
import Header from "@/app/components/Header";
import { FlagImage } from "@/app/components/Image";

import COUNTRIES from "@/data/countries";
import MEMBERS from "@/data/members";
import RESORTS from "@/data/resorts";
import TRIPS, { TripProps } from "@/data/trips";
import VIDEOS from "@/data/videos";

const Video = ({ id }: { id: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton isLoaded={isLoaded} borderRadius="none">
      <AspectRatio key={id} ratio={2} maxH="500px">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </AspectRatio>
    </Skeleton>
  );
};

const Trip = ({ data }: { data?: TripProps }) => {
  const router = useRouter();

  const dividerColor = useColorModeValue("gray.300", "gray.800");
  const resortBgColor = useColorModeValue("gray.100", "gray.800");

  const handleMemberClick = (id: string) => {
    router.push(`/members/${id}`);
  };

  const handleResortClick = (id: string) => {
    router.push(`/resorts/${id}`);
  };

  if (!data)
    return (
      <Alert
        title="Tento zájezd neexistuje."
        description="Běž zpět a vyber jiný."
        button={{
          path: "/trips",
          label: "Zpět na Zájezdy",
        }}
      />
    );

  const video = VIDEOS[data.id];

  return (
    <>
      {/* Info */}
      <Card borderTopWidth={4} borderStyle="solid" borderColor="secondary.600">
        <CardBody>
          <List spacing={3}>
            <ListItem fontWeight={500}>
              <Text as="span" mr={2} color="gray.500" fontWeight={400}>
                Kdy /
              </Text>
              {MONTHS_CS[data.month]}, {data.year}
            </ListItem>

            <ListItem fontWeight={500} display="flex" alignItems="center">
              <Text as="span" mr={2} color="gray.500" fontWeight={400}>
                Kde /
              </Text>
              {data.title}, {COUNTRIES[data.countryCode]}
              <FlagImage countryCode={data.countryCode} />
            </ListItem>

            {data.accomodation && (
              <ListItem fontWeight={500}>
                <Text as="span" mr={2} color="gray.500" fontWeight={400}>
                  Ubytování /
                </Text>
                {data.accomodation.name}
                {data.accomodation.map && (
                  <Tooltip label="Otevřít ubýtování na Google Maps">
                    <Link
                      href={`https://goo.gl/maps/${data.accomodation.map}`}
                      target="_blank"
                    >
                      <Icon
                        as={FaExternalLinkAlt}
                        boxSize={3}
                        ml={2}
                        color="primary.600"
                      />
                    </Link>
                  </Tooltip>
                )}
              </ListItem>
            )}
          </List>
        </CardBody>
      </Card>

      {/* Resorts */}
      <Card mt={4}>
        <CardHeader>
          <Heading as="h2" fontSize="xl">
            Střediska
          </Heading>
        </CardHeader>
        <Divider borderColor={dividerColor} />
        <CardBody>
          <Flex wrap="wrap" m={-2}>
            {data.resorts.map((resortId) => {
              const resort = RESORTS.find((resort) => resort.id === resortId);
              if (!resort) return;
              const { id, name } = resort;

              return (
                <Tooltip key={id} label={name}>
                  <Img
                    src={`/images/resorts/${id}.png`}
                    alt={name}
                    m={2}
                    width={28}
                    height={28}
                    rounded="full"
                    objectFit="contain"
                    borderWidth={1}
                    borderStyle="solid"
                    borderColor={resortBgColor}
                    boxShadow="base"
                    _hover={{
                      cursor: "pointer",
                      boxShadow: "outline",
                    }}
                    onClick={() => handleResortClick(id)}
                  />
                </Tooltip>
              );
            })}
          </Flex>
        </CardBody>
      </Card>

      {/* Members */}
      <Card mt={4}>
        <CardHeader>
          <Heading as="h2" fontSize="xl">
            Zúčastnili se
          </Heading>
        </CardHeader>
        <Divider borderColor={dividerColor} />
        <CardBody>
          <Flex wrap="wrap" m={-2}>
            {data.members.map((memberId) => {
              const member = MEMBERS.find((member) => member.id === memberId);
              if (!member) return;
              const { id, name } = member;

              return (
                <Tooltip key={id} label={name}>
                  <Avatar
                    src={`/images/members/${id}.jpg`}
                    size="xl"
                    m={2}
                    boxShadow="md"
                    _hover={{
                      cursor: "pointer",
                      boxShadow: "outline",
                    }}
                    onClick={() => handleMemberClick(id)}
                  />
                </Tooltip>
              );
            })}
          </Flex>
        </CardBody>
      </Card>

      {/* Video */}
      {video && (
        <Card mt={4}>
          <CardHeader>
            <Heading as="h2" fontSize="xl">
              Video
            </Heading>
          </CardHeader>
          <CardBody pt={0} px={0}>
            <Video id={video} />
          </CardBody>
        </Card>
      )}
    </>
  );
};

const Page = ({ params: { id } }: { params: { id: string[] } }) => {
  const trip = TRIPS.find((trip) => trip.id === id[0]);

  return (
    <>
      <Header name={trip?.title} />
      <Trip data={trip} />
    </>
  );
};

export default Page;
