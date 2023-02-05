"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Icon,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSkiing } from "react-icons/fa";

import COUNTRIES from "../../data/countries";
import MEMBERS from "../../data/members";
import RESORTS from "../../data/resorts";
import TRIPS, { Trip } from "../../data/trips";

const DOT_SIZE = 64;
const DOT_SIZE_PX = `${DOT_SIZE}px`;

const MONTHS = ["Leden", "Únor", "Březen", "Duben"];

const TooltipAvatar: typeof Avatar = (props: any) => (
  <Tooltip label={props.name}>
    <Avatar
      {...props}
      borderWidth={1}
      borderColor={useColorModeValue("white", "gray.900")}
      color={useColorModeValue("white", "gray.900")}
      bg={useColorModeValue("gray.400", "gray.500")}
    />
  </Tooltip>
);

const TimelineRow = ({
  trip: { id, title, year, month, resorts, countryCode, members, nonMembers },
  even,
  handleClick,
}: {
  trip: Trip;
  even: boolean;
  handleClick: (id: number) => void;
}) => (
  <Box key={id} py={6}>
    <Box
      pl={{ base: 24, sm: 28, md: even ? 8 : 14 }}
      pr={{ base: 4, sm: 6, md: even ? 14 : 8 }}
      pos="relative"
      left={{ base: "0%", md: even ? 0 : "50%" }}
      w={{ base: "100%", md: "50%" }}
      _after={{
        content: `"${year}"`,
        pos: "absolute",
        top: "0",
        right: even ? `-${DOT_SIZE / 2}px` : "auto",
        left: {
          base: "10px",
          sm: "20px",
          md: even ? "auto" : `-${DOT_SIZE / 2}px`,
        },
        w: DOT_SIZE_PX,
        h: DOT_SIZE_PX,
        color: useColorModeValue("white", "gray.900"),
        bgColor: useColorModeValue("secondary.600", "secondary.500"),
        lineHeight: DOT_SIZE_PX,
        textAlign: "center",
        fontSize: "sm",
        fontWeight: "600",
        borderRadius: "full",
        zIndex: 1,
      }}
    >
      <Card
        position="static"
        color="primary.900"
        bgColor={useColorModeValue("white", "gray.900")}
        borderBottom={5}
        borderStyle="solid"
        borderColor="transparent"
        overflow="auto"
        _before={{
          content: '" "',
          position: "absolute",
          top: "22px",
          left: { base: "86px", sm: "102px", md: even ? "auto" : "46px" },
          right: even ? "46px" : "auto",
          h: 0,
          width: 0,
          zIndex: 1,
          borderWidth: {
            base: "10px 10px 10px 0",
            md: even ? "10px 0 10px 10px" : "10px 10px 10px 0",
          },
          borderStyle: "solid",
          borderColor: {
            base: useColorModeValue(
              "transparent var(--chakra-colors-white) transparent transparent",
              "transparent var(--chakra-colors-gray-900) transparent transparent"
            ),
            md: useColorModeValue(
              even
                ? "transparent transparent transparent var(--chakra-colors-white)"
                : "transparent var(--chakra-colors-white) transparent transparent",
              even
                ? "transparent transparent transparent var(--chakra-colors-gray-900)"
                : "transparent var(--chakra-colors-gray-900) transparent transparent"
            ),
          },
        }}
        _hover={{
          cursor: "pointer",
          borderColor: useColorModeValue("secondary.600", "secondary.500"),
        }}
        onClick={() => handleClick(id)}
      >
        <CardBody py={6} px={8}>
          {/* Month */}
          <Text
            fontSize="xs"
            color={useColorModeValue("gray.400", "gray.600")}
            textTransform="uppercase"
          >
            {MONTHS[month - 1]}
          </Text>

          {/* Title */}
          <Heading
            as="h3"
            size="md"
            display="flex"
            mb={2}
            alignItems="center"
            textTransform="uppercase"
          >
            {title}
            <Box ml={2}>
              <Image
                src={`/images/flags/${countryCode.toLowerCase()}.png`}
                alt={COUNTRIES[countryCode]}
                width={20}
                height={20}
              />
            </Box>
          </Heading>

          {/* Resorts */}
          <Flex align="center">
            <Icon as={FaSkiing} color="secondary.600" fontSize="sm" mr={3} />

            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {resorts
                .map((id) =>
                  RESORTS.filter((resort) => resort.id === id).map(
                    (resort) => resort.name
                  )
                )
                .join(", ")}
            </Text>
          </Flex>

          {/* Members */}
          <AvatarGroup
            size="sm"
            spacing={-1.5}
            mt={3}
            max={members.length}
            color="white"
            fontSize="sm"
          >
            {members.map((id) =>
              MEMBERS.filter((member) => member.id === id).map(
                ({ id, firstname, lastname }) => (
                  <TooltipAvatar key={id} name={`${firstname} ${lastname}`} />
                )
              )
            )}

            {/* Non members */}
            {nonMembers &&
              nonMembers > 0 &&
              [...Array(nonMembers)].map((_, i) => (
                <Avatar key={`nonMember-${i}`} />
              ))}
          </AvatarGroup>
        </CardBody>
      </Card>
    </Box>
  </Box>
);

const Timeline = () => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/trips/${id}`);
  };

  return (
    <>
      <Box
        pos="relative"
        _after={{
          content: '""',
          pos: "absolute",
          top: 0,
          bottom: 0,
          left: { base: "42px", sm: "52px", md: "50%" },
          w: "2px",
          bgColor: useColorModeValue("gray.300", "gray.700"),
          ml: "-1px",
        }}
      >
        {TRIPS.map((trip, i) => (
          <Box key={trip.id}>
            <TimelineRow
              trip={trip}
              even={i % 2 === 0}
              handleClick={handleClick}
            />
          </Box>
        ))}
      </Box>

      <Heading
        my={8}
        mx={6}
        as="h4"
        fontSize="2xl"
        textAlign={{ md: "center" }}
        color={useColorModeValue("secondary.600", "secondary.500")}
      >
        Kam příště?
      </Heading>
    </>
  );
};

export default Timeline;
