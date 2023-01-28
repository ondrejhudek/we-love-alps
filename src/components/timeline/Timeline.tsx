import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Image,
  Tooltip,
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
      borderColor="gray.100"
      color="white"
      bg="tertiary.300"
    />
  </Tooltip>
);

const TimelineRow = ({
  trip: { id, title, year, month, resorts, countryCode, members, nonMembers },
  i,
}: {
  trip: Trip;
  i: number;
}) => {
  const even = i % 2 === 0;

  return (
    <Box key={id} py={6}>
      <Box
        px={14}
        pos="relative"
        left={even ? 0 : "50%"}
        w="50%"
        _after={{
          content: `"${year}"`,
          pos: "absolute",
          top: "0",
          right: even ? `-${DOT_SIZE / 2}px` : "auto",
          left: even ? "auto" : `-${DOT_SIZE / 2}px`,
          w: DOT_SIZE_PX,
          h: DOT_SIZE_PX,
          color: "white",
          bgColor: "secondary.600",
          lineHeight: DOT_SIZE_PX,
          textAlign: "center",
          fontSize: "sm",
          fontWeight: "600",
          borderRadius: "full",
          zIndex: 1,
        }}
      >
        <Box
          py={6}
          px={8}
          color="primary.900"
          bgColor="gray.100"
          borderRadius="lg"
          borderBottom={4}
          borderStyle="solid"
          borderColor="transparent"
          boxShadow="sm"
          _before={{
            content: '" "',
            position: "absolute",
            top: "22px",
            left: even ? "auto" : "46px",
            right: even ? "46px" : "auto",
            h: 0,
            width: 0,
            zIndex: 1,
            borderWidth: even ? "10px 0 10px 10px" : "10px 10px 10px 0",
            borderStyle: "solid",
            borderColor: even
              ? "transparent transparent transparent var(--chakra-colors-gray-100)"
              : "transparent var(--chakra-colors-gray-100) transparent transparent",
          }}
          _hover={{
            cursor: "pointer",
            borderColor: "secondary.600",
          }}
        >
          {/* Month */}
          <Text fontSize="xs" color="gray.400" textTransform="uppercase">
            {MONTHS[month]}
          </Text>

          {/* Title */}
          <Heading
            as="h3"
            size="md"
            textTransform="uppercase"
            mb={2}
            display="flex"
            alignItems="center"
          >
            {title}
            <Image
              src={`images/flags/${countryCode}.png`}
              alt={COUNTRIES[countryCode]}
              boxSize={5}
              ml={2}
            />
          </Heading>

          {/* Resorts */}
          <Flex align="center">
            <Icon as={FaSkiing} color="secondary.600" fontSize="sm" mr={3} />

            <Text fontSize="sm">
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
                ({ firstname, lastname }) => (
                  <TooltipAvatar name={`${firstname} ${lastname}`} />
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
        </Box>
      </Box>
    </Box>
  );
};

const Timeline = () => (
  <Box>
    <Box
      pos="relative"
      maxW="container.lg"
      my={10}
      mx="auto"
      _after={{
        content: '""',
        pos: "absolute",
        top: 0,
        bottom: 0,
        left: "50%",
        w: "2px",
        bgColor: "tertiary.100",
        ml: "-1px",
      }}
    >
      {TRIPS.map((trip, i) => (
        <Box key={trip.id}>
          <TimelineRow trip={trip} i={i} />
        </Box>
      ))}
    </Box>
    <Heading
      my={8}
      as="h4"
      fontSize="2xl"
      textAlign="center"
      color="primary.800"
    >
      Kam příště?
    </Heading>
  </Box>
);

export default Timeline;
