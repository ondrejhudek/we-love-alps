"use client";

import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSkiing } from "react-icons/fa";

import { FlagImage } from "@/app/components/Image";
import { MONTHS_CS } from "@/app/utils/locales";
import { Member, Resort, Trip } from "@/app/utils/types";

const DOT_SIZE = 64;
const DOT_SIZE_PX = `${DOT_SIZE}px`;

const TooltipAvatar: typeof Avatar = (props: any) => (
  <Tooltip label={props.name}>
    <Avatar
      {...props}
      borderWidth={1}
      color={useColorModeValue("white", "gray.900")}
      bg={useColorModeValue("gray.400", "gray.500")}
    />
  </Tooltip>
);

const TimelineRow = ({
  trip: { id, title, year, month, country_code, non_members },
  tripMembers,
  tripResorts,
  even,
  onClick,
}: {
  trip: Trip;
  tripMembers: Member[];
  tripResorts: Resort[];
  even: boolean;
  onClick: (id: string) => void;
}) => (
  <Box key={id} py={6}>
    <Box
      pos="relative"
      pl={{ base: 24, sm: 28, md: even ? 8 : 14 }}
      pr={{ base: 4, sm: 6, md: even ? 14 : 8 }}
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
        position="relative"
        color="primary.900"
        borderBottom={5}
        borderStyle="solid"
        borderColor="transparent"
        transition="var(--chakra-transition-primary)"
        _before={{
          content: '" "',
          position: "absolute",
          top: "22px",
          left: { base: "-10px", md: even ? "auto" : "-10px" },
          right: { md: even ? "-10px" : "auto" },
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
              "transparent var(--chakra-colors-gray-700) transparent transparent"
            ),
            md: useColorModeValue(
              even
                ? "transparent transparent transparent var(--chakra-colors-white)"
                : "transparent var(--chakra-colors-white) transparent transparent",
              even
                ? "transparent transparent transparent var(--chakra-colors-gray-700)"
                : "transparent var(--chakra-colors-gray-700) transparent transparent"
            ),
          },
        }}
        _hover={{
          cursor: "pointer",
          borderColor: useColorModeValue("secondary.600", "secondary.500"),
          transform: {
            base: "translateX(-6px)",
            md: `translateX(${even ? "6px" : "-6px"})`,
          },
        }}
        onClick={() => onClick(id)}
      >
        <CardBody py={6} px={8} overflow="auto">
          {/* Month */}
          <Text
            fontSize="xs"
            color={useColorModeValue("gray.400", "gray.500")}
            textTransform="uppercase"
          >
            {MONTHS_CS[month - 1]}
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
            <FlagImage countryCode={country_code} ml={2} />
          </Heading>

          {/* Resorts */}
          <Flex align="center">
            <Icon as={FaSkiing} color="secondary.600" fontSize="sm" mr={3} />

            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {tripResorts.map(({ name }) => name).join(", ")}
            </Text>
          </Flex>

          {/* Members */}
          <AvatarGroup
            size="sm"
            spacing={-1.5}
            mt={3}
            max={tripMembers.length}
            color="white"
            fontSize="sm"
          >
            {tripMembers.map(({ alias, name }) => (
              <TooltipAvatar key={alias} name={name} />
            ))}

            {/* Non members */}
            {non_members &&
              non_members > 0 &&
              [...Array(non_members)].map((_, i) => (
                <Avatar key={`nonMember-${i}`} />
              ))}
          </AvatarGroup>
        </CardBody>
      </Card>
    </Box>
  </Box>
);

const Timeline = ({
  tripsData,
  membersData,
  resortsData,
}: {
  tripsData: Trip[];
  membersData: Member[];
  resortsData: Resort[];
}) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/trips/${id}`);
  };

  return (
    <>
      <Divider my={{ base: 6, md: 10 }} />

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
        {tripsData.map((trip, i) => {
          const members = trip.members.flatMap((alias) =>
            membersData.filter((member) => member.alias === alias)
          );
          const resorts = trip.resorts.flatMap((id) =>
            resortsData.filter((resort) => resort.id === id)
          );

          return (
            <Box key={trip.id}>
              <TimelineRow
                trip={trip}
                tripMembers={members}
                tripResorts={resorts}
                even={i % 2 === 0}
                onClick={handleClick}
              />
            </Box>
          );
        })}
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
