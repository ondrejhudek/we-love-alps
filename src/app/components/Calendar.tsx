"use client";

import { type PropsWithChildren, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiCalendar } from "react-icons/hi2";
import groupBy from "ramda/src/groupBy";

import { FlagImage } from "@/app/components/Image";
import { MONTHS_CS } from "@/app/utils/locales";
import { Member, Resort, Trip } from "@/app/utils/types";

const CALENDAR_EVENTS = 5;

export interface TripViewProps extends Omit<Trip, "members" | "resorts"> {
  members: Member[];
  resorts: Resort[];
}

export const CalendarLoading = () => (
  <SimpleGrid columns={1} spacingY={6}>
    {[...Array(3)].map((_, i) => (
      <Box key={`skeleton-${i}`}>
        <Skeleton width={12} height={5} />

        <Flex justify="space-between" align="center" my={7}>
          <Flex align="center">
            <SkeletonCircle size="10" />
            <Box ml={4}>
              <Skeleton width={40} height={3} />
              <Skeleton width={28} height={4} mt={1} />
            </Box>
          </Flex>

          <SkeletonCircle size="6" />
        </Flex>
      </Box>
    ))}
  </SimpleGrid>
);

export const CalendarWrapper = ({ children }: PropsWithChildren) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      maxHeight={{ base: "auto", lg: "1058px" }}
      overflowY="auto"
      py={5}
      px={7}
      bgColor={bgColor}
      borderRadius={16}
    >
      <Heading mt={2} mb={8} size="md">
        Kalendář
      </Heading>

      <Box>{children}</Box>
    </Box>
  );
};

const Year = ({
  year,
  trips,
  onClick,
}: {
  year: string;
  trips: TripViewProps[];
  onClick: (id: string) => void;
}) => {
  const yearColor = useColorModeValue("gray.500", "gray.400");
  const resortsColor = useColorModeValue("gray.500", "gray.400");
  const calendarIconColor = useColorModeValue("gray.600", "gray.400");
  const calendarIconNumber = useColorModeValue("gray.800", "gray.200");
  const hoverBgColor = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      <Heading size="sm" fontWeight={500} color={yearColor}>
        {year}
      </Heading>

      {trips.map(({ id, month, title, resorts, country_code }) => (
        <Tooltip
          key={id}
          label={`${MONTHS_CS[month - 1]}, ${year}`}
          placement="top"
          offset={[0, -6]}
        >
          <Box
            mx={-4}
            p={4}
            borderRadius={12}
            _hover={{
              cursor: "pointer",
              bgColor: hoverBgColor,
            }}
            onClick={() => onClick(id)}
          >
            <Flex alignItems="center">
              <Box mt={2} width={10} position="relative">
                <Icon
                  as={HiCalendar}
                  position="absolute"
                  top="-14px"
                  boxSize={10}
                  color={calendarIconColor}
                />
                <Text
                  ml="16px"
                  fontSize="sm"
                  fontWeight={500}
                  color={calendarIconNumber}
                >
                  {month}
                </Text>
              </Box>

              <Flex flex={1} justify="space-between" alignItems="center">
                <Box ml={3}>
                  <Text
                    fontSize="sm"
                    color={resortsColor}
                    noOfLines={1}
                    title={resorts.map(({ name }) => name).join(", ")}
                  >
                    {resorts.map(({ name }) => name).join(", ")}
                  </Text>
                  <Text fontWeight={600}>{title}</Text>
                </Box>
                <Box ml={2}>
                  <FlagImage countryCode={country_code} boxSize={24} />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Tooltip>
      ))}
    </>
  );
};

const Calendar = ({
  trips,
  members,
  resorts,
}: {
  trips: Trip[];
  members: Member[];
  resorts: Resort[];
}) => {
  const router = useRouter();

  const [limit, setLimit] = useState(CALENDAR_EVENTS);

  const buttonBgColor = useColorModeValue("gray.300", "gray.600");
  const buttonHoverBgColor = useColorModeValue("gray.100", "gray.800");

  const groupedTrips = groupBy<TripViewProps>(
    (trip) => trip.year.toString(),
    trips.map((trip) => ({
      ...trip,
      members: trip.members.flatMap((memberAlias) =>
        members.filter(({ id }) => id === memberAlias)
      ),
      resorts: trip.resorts.flatMap((resortId) =>
        resorts.filter(({ id }) => id === resortId)
      ),
    }))
  );
  const groupedKeys = Object.keys(groupedTrips).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const handleClick = (id: string) => {
    router.push(`/trip/${id}`);
  };

  const handleLoadNext = () => {
    setLimit((prev) => prev + CALENDAR_EVENTS);
  };

  return (
    <>
      <SimpleGrid columns={1} spacingY={6}>
        {groupedKeys.slice(0, limit).map((year) => {
          const trips = groupedTrips[year];
          if (!trips) return null;
          return (
            <Year key={year} year={year} trips={trips} onClick={handleClick} />
          );
        })}
      </SimpleGrid>

      {limit < trips.length && (
        <Box mt={2} textAlign="center">
          <Button
            size="sm"
            py={5}
            px={6}
            borderRadius="full"
            bgColor={buttonBgColor}
            _hover={{
              bgColor: buttonHoverBgColor,
            }}
            onClick={handleLoadNext}
          >
            Načíst další
          </Button>
        </Box>
      )}
    </>
  );
};

export default Calendar;
