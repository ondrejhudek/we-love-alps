"use client";

import { usePathname } from "next/navigation";
import {
  SimpleGrid,
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Icon,
  Link,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  StackDivider,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  FaHeart,
  FaHeartBroken,
  FaUserFriends,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

import Header from "../components/Header";

import MEMBERS from "../../data/members";
import TRIPS from "../../data/trips";
import RESORTS from "../../data/resorts";

const TRIP_CS: Record<number, string> = {
  1: "zájezd",
  2: "zájezdy",
  3: "zájezdy",
  4: "zájezdy",
  5: "zájezdů",
};

const RESORT_CS: Record<number, string> = {
  1: "středisko",
  2: "střediska",
  3: "střediska",
  4: "střediska",
  5: "středisek",
};

const Stat = ({ list, term }: { list: string[]; term: string }) => (
  <Tooltip
    label={
      <Box textAlign="center" py={1} px={2}>
        {list.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Box>
    }
    placement="top"
    hasArrow
  >
    <Badge
      variant="subtle"
      colorScheme="primary"
      my={1}
      py={1}
      px={4}
      rounded="full"
      fontWeight={500}
    >
      {list.length} {term}
    </Badge>
  </Tooltip>
);

const PersonalInfo = ({
  nickname,
  icon,
  iconColor,
  tooltip,
}: {
  nickname: string;
  icon: IconType;
  iconColor: string;
  tooltip: string;
}) => {
  const nicknameColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Tooltip label={tooltip}>
      <Flex align="center" justify="center" my={0.5}>
        <Icon as={icon} color={iconColor} mr={2} />
        <Text color={nicknameColor} fontSize="sm">
          @{nickname}
        </Text>
      </Flex>
    </Tooltip>
  );
};

const SocialButton = ({
  name,
  icon,
  color,
  link,
}: {
  name: string;
  icon: IconType;
  color: string;
  link: string;
}) => (
  <Flex
    as={Link}
    href={link}
    target="_blank"
    role="group"
    align="center"
    justify="center"
    flex="1"
    py={4}
    textAlign="center"
    fontSize="sm"
    fontWeight={500}
    _hover={{
      textDecoration: "none",
      color: "white",
      bgColor: color,
    }}
  >
    <Icon
      as={icon}
      boxSize={5}
      mr={2}
      color={color}
      _groupHover={{ color: "white" }}
    />
    {name}
  </Flex>
);

const Page = () => {
  const pathname = usePathname();
  const borderColor = useColorModeValue("gray.200", "gray.800");
  const partnerColor = useColorModeValue("red.500", "red.400");
  const exPartnerColor = useColorModeValue("red.800", "red.200");
  const siblingColor = useColorModeValue("orange.500", "orange.400");

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {MEMBERS.map(
          ({
            id,
            firstname,
            lastname,
            alias,
            nickname,
            facebook,
            instagram,
            currentPartner,
            exPartners,
            siblings,
          }) => {
            const name = `${firstname} ${lastname}`;
            const trips = TRIPS.filter((trip) => trip.members.includes(id));
            const tripNames = trips.map(
              ({ title, year }) => `${title} (${year})`
            );
            const resortNames = [
              ...new Set(trips.flatMap(({ resorts }) => resorts)),
            ].map(
              (resortId) =>
                RESORTS.find(({ id }) => id === resortId)?.name || ""
            );

            return (
              <Card key={id} id={alias} overflow="hidden">
                {/* Header */}
                <CardHeader pt={8}>
                  <Box textAlign="center">
                    <Avatar
                      src={`/images/members/${alias}.jpg`}
                      size="2xl"
                      mb={4}
                    />
                    <Heading fontSize="lg" fontWeight={500}>
                      {name}
                    </Heading>
                    <Text
                      mt={1}
                      color="gray.500"
                      fontSize="sm"
                      fontWeight={500}
                    >
                      @{nickname || alias}
                    </Text>
                  </Box>
                </CardHeader>

                {/* Body */}
                <CardBody pt={0}>
                  <Flex justify="space-evenly" py={2} wrap="wrap">
                    {/* Trips */}
                    <Stat
                      list={tripNames}
                      term={TRIP_CS[tripNames.length] || TRIP_CS[5]}
                    />

                    {/* Resorts */}
                    <Stat
                      list={resortNames}
                      term={RESORT_CS[tripNames.length] || RESORT_CS[5]}
                    />
                  </Flex>

                  {/* Current partner */}
                  {currentPartner && (
                    <PersonalInfo
                      nickname={currentPartner}
                      icon={FaHeart}
                      iconColor={partnerColor}
                      tooltip="Partner/ka"
                    />
                  )}

                  {/* Ex partner */}
                  {exPartners && exPartners.length > 0 && (
                    <>
                      {exPartners.map((exPartner) => (
                        <PersonalInfo
                          key={exPartner}
                          nickname={exPartner}
                          icon={FaHeartBroken}
                          iconColor={exPartnerColor}
                          tooltip="Ex-partner/ka"
                        />
                      ))}
                    </>
                  )}

                  {/* Siblings */}
                  {siblings && siblings.length > 0 && (
                    <>
                      {siblings.map((sibling) => (
                        <PersonalInfo
                          key={sibling}
                          nickname={sibling}
                          icon={FaUserFriends}
                          iconColor={siblingColor}
                          tooltip="Sourozenec"
                        />
                      ))}
                    </>
                  )}
                </CardBody>

                {/* Footer */}
                <CardFooter
                  p={0}
                  borderTopWidth={1}
                  borderStyle="solid"
                  borderColor={borderColor}
                >
                  <HStack
                    flex="1"
                    divider={<StackDivider borderColor={borderColor} />}
                    spacing={0}
                  >
                    {facebook && (
                      <SocialButton
                        name="Facebook"
                        icon={FaFacebook}
                        color="facebook.500"
                        link={`https://www.facebook.com/${facebook}`}
                      />
                    )}
                    {instagram && (
                      <SocialButton
                        name="Instagram"
                        icon={FaInstagram}
                        color="#E1306C"
                        link={`https://www.instagram.com/${instagram}`}
                      />
                    )}
                  </HStack>
                </CardFooter>
              </Card>
            );
          }
        )}
      </SimpleGrid>
    </>
  );
};

export default Page;
