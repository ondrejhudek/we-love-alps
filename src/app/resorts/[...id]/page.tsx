"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Img,
  Heading,
  List,
  ListItem,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

import Alert from "@/app/components/Alert";
import Header from "@/app/components/Header";

import COUNTRIES from "@/data/countries";
import MEMBERS from "@/data/members";
import RESORTS, { ResortProps } from "@/data/resorts";
import TRIPS from "@/data/trips";

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
      <Card>
        <CardBody>
          <Flex justify="space-between">
            <List spacing={3}>
              <ListItem fontWeight={500} display="flex" alignItems="center">
                <Text as="span" mr={2} color="gray.500" fontWeight={400}>
                  Země /
                </Text>
                {COUNTRIES[data.countryCode]}
                <Box ml={2}>
                  <Image
                    src={`/images/flags/${data.countryCode.toLowerCase()}.png`}
                    alt={data.countryCode}
                    title={COUNTRIES[data.countryCode]}
                    width={20}
                    height={20}
                  />
                </Box>
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
                <Text as="span" ml={2} fontWeight={400}>
                  ({trips.length}x)
                </Text>
              </ListItem>
            </List>

            <Img
              src={`/images/resorts/${data.id}.png`}
              alt={data.name}
              width={24}
              height={24}
            />
          </Flex>
        </CardBody>

        <CardBody pt={0} px={0}>
          {/* Map */}
          <AspectRatio ratio={2.35 / 1} maxH="250px">
            <iframe
              src={`https://www.google.com/maps/embed?pb=${encodeURIComponent(
                data.map
              )}`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </AspectRatio>
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
                <Tooltip key={id} label={name}>
                  <Avatar
                    name={name}
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
    </>
  );
};

const Page = ({ params: { id } }: { params: { id: string[] } }) => {
  const resort = RESORTS.find((resort) => resort.id === id[0]);

  return (
    <>
      <Header pathname="/resorts" name={resort?.name} />
      <Resort data={resort} />
    </>
  );
};

export default Page;
