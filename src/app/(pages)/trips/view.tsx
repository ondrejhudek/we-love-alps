"use client";

import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarGroup,
  AvatarProps,
  Box,
  Card,
  CardBody,
  Flex,
  Icon,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSkiing } from "react-icons/fa";

import { FlagImage } from "@/app/components/Image";
import { MONTHS_CS } from "@/app/utils/locales";
import { Member, Resort, Trip } from "@/app/utils/types";

export interface TripViewProps extends Omit<Trip, "members" | "resorts"> {
  members: Member[];
  resorts: Resort[];
}

const TooltipAvatar: typeof Avatar = (props: AvatarProps) => (
  <Tooltip label={props.name}>
    <Avatar
      {...props}
      borderWidth={1}
      color={useColorModeValue("white", "gray.900")}
      bg={useColorModeValue("gray.400", "gray.500")}
    />
  </Tooltip>
);

const Trip = ({ data }: { data: TripViewProps }) => {
  const router = useRouter();
  const monthColor = useColorModeValue("gray.400", "gray.500");
  const resortColor = useColorModeValue("gray.600", "gray.400");

  const { id, title, country_code, month, resorts, members, non_members } =
    data;

  const handleClick = (id: string) => {
    router.push(`/trips/${id}`);
  };

  return (
    <Card
      key={id}
      onClick={() => handleClick(id)}
      _hover={{
        cursor: "pointer",
        boxShadow: "outline",
      }}
    >
      <CardBody overflow="auto">
        {/*  Month */}
        <Text color={monthColor} fontSize="xs" textTransform="uppercase">
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

          <Text fontSize="sm" color={resortColor}>
            {resorts.map(({ name }) => name).join(", ")}
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
          {members.map(({ id, name }) => (
            <TooltipAvatar key={id} name={name} />
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
  );
};

const View = ({ year, trips }: { year: string; trips: TripViewProps[] }) => (
  <Box key={year}>
    <Heading as="h2" fontSize="2xl" my={5}>
      {year}
    </Heading>

    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 3, sm: 4, lg: 5 }}
    >
      {trips
        .sort((a, b) => b.month - a.month)
        .map((trip) => (
          <Trip key={trip.id} data={trip} />
        ))}
    </SimpleGrid>
  </Box>
);

export default View;
