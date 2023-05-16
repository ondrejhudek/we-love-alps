"use client";

import { PropsWithChildren, useState } from "react";
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
} from "@chakra-ui/react";
import { FaRegCalendar } from "react-icons/fa";
import groupBy from "ramda/src/groupBy";

import { FlagImage } from "@/app/components/Image";
import { MONTHS_CS } from "@/app/utils/locales";
import { Member, Resort, Trip } from "@/app/utils/types";

const CALENDAR_EVENTS = 6;

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

export const CalendarWrapper = ({ children }: PropsWithChildren) => (
  <>
    <Heading mt={2} mb={6} size="md">
      Kalendář
    </Heading>

    <Box>{children}</Box>
  </>
);

const Year = ({
  year,
  trips,
  onClick,
}: {
  year: string;
  trips: TripViewProps[];
  onClick: (id: string) => void;
}) => (
  <>
    <Heading size="sm" fontWeight={500} color="gray.500">
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
          my={3}
          mx={-4}
          p={4}
          borderRadius={12}
          _hover={{
            cursor: "pointer",
            bgColor: "gray.300",
          }}
          onClick={() => onClick(id)}
        >
          <Flex alignItems="center">
            <Box width={10}>
              <Box position="relative">
                <Icon
                  as={FaRegCalendar}
                  position="absolute"
                  top="-7px"
                  boxSize={8}
                  color="gray.600"
                />
                <Text ml={3} fontWeight={500} color="gray.800">
                  {month}
                </Text>
              </Box>
            </Box>

            <Flex flex={1} justify="space-between" alignItems="center">
              <Box ml={3}>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  noOfLines={1}
                  title={resorts.map(({ name }) => name).join(", ")}
                >
                  {resorts.map(({ name }) => name).join(", ")}
                </Text>
                <Text fontWeight={600}>{title}</Text>
              </Box>
              <Box ml={1}>
                <FlagImage countryCode={country_code} boxSize={24} />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Tooltip>
    ))}
  </>
);

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
    router.push(`/trips/${id}`);
  };

  const handleLoadNext = () => {
    setLimit((prev) => prev + CALENDAR_EVENTS);
  };

  return (
    <>
      <SimpleGrid columns={1} spacingY={6}>
        {groupedKeys.slice(0, limit).map((year) => (
          <Year
            key={year}
            year={year}
            trips={groupedTrips[year]}
            onClick={handleClick}
          />
        ))}
      </SimpleGrid>

      {limit < trips.length && (
        <Box mt={2} textAlign="center">
          <Button
            size="sm"
            py={5}
            px={6}
            borderRadius="full"
            bgColor="gray.300"
            _hover={{
              bgColor: "gray.100",
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
