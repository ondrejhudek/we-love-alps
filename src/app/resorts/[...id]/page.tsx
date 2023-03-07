"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AspectRatio,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Show,
  Skeleton,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

import Alert from "@/app/components/Alert";
import Header from "@/app/components/Header";
import { AvatarImage, FlagImage, ResortImage } from "@/app/components/Image";

import COUNTRIES from "@/data/countries";
import MEMBERS from "@/data/members";
import RESORTS, { ResortProps } from "@/data/resorts";
import TRIPS from "@/data/trips";

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

const Resort = ({ data }: { data?: ResortProps }) => {
  const router = useRouter();

  const yearColor = useColorModeValue("white", "gray.900");
  const yearBgColor = useColorModeValue("secondary.600", "secondary.400");
  const dividerColor = useColorModeValue("gray.300", "gray.800");

  if (!data)
    return (
      <Alert
        title="Toto středisko neexistuje."
        description="Běž zpět a vyber jiný."
        button={{
          path: "/resorts",
          label: "Zpět na Střediska",
        }}
      />
    );

  const trips = TRIPS.filter((trip) => trip.resorts.includes(data.id));
  const members = [...new Set(trips.flatMap((trip) => trip.members))];

  const handleMemberClick = (id: string) => {
    router.push(`/members/${id}`);
  };

  return (
    <>
      {/* Info */}
      <Card borderTopWidth={4} borderStyle="solid" borderColor="secondary.600">
        <CardBody>
          <Flex justify="space-between">
            <List spacing={3}>
              <ListItem fontWeight={500} display="flex" alignItems="center">
                <Text as="span" mr={2} color="gray.500" fontWeight={400}>
                  Země /
                </Text>
                {COUNTRIES[data.countryCode]}
                <FlagImage countryCode={data.countryCode} ml={2} />
              </ListItem>

              <ListItem fontWeight={500}>
                <Text as="span" mr={2} color="gray.500" fontWeight={400}>
                  Region /
                </Text>
                {data.region}
              </ListItem>

              <ListItem fontWeight={500} display="flex" alignItems="center">
                <Text as="span" mr={2} color="gray.500" fontWeight={400}>
                  Navštívili jsme /
                </Text>
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
                <Text as="span" ml={2} fontWeight={500}>
                  ({trips.length}x)
                </Text>
              </ListItem>
            </List>

            <Show above="sm">
              <ResortImage id={data.id} name={data.name} boxSize={24} />
            </Show>
          </Flex>
        </CardBody>

        <CardBody pt={0} px={0}>
          {/* Map */}
          <Map id={data.map} />
        </CardBody>
      </Card>

      {/* Members */}
      <Card mt={4}>
        <CardHeader>
          <Heading as="h2" fontSize="xl">
            Navšívili
          </Heading>
        </CardHeader>
        <Divider borderColor={dividerColor} />
        <CardBody>
          <Flex wrap="wrap" m={-2}>
            {members.map((memberId) => {
              const member = MEMBERS.find((member) => member.id === memberId);
              if (!member) return;
              const { id, name } = member;

              return (
                <Tooltip key={id} label={name} shouldWrapChildren>
                  <AvatarImage
                    id={id}
                    name={name}
                    boxSize={24}
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
    </>
  );
};

const Page = ({ params: { id } }: { params: { id: string[] } }) => {
  const resort = RESORTS.find((resort) => resort.id === id[0]);

  return (
    <>
      <Header name={resort?.name} />
      <Resort data={resort} />
    </>
  );
};

export default Page;
