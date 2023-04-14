"use client";

import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarGroup,
  AvatarProps,
  Card,
  CardBody,
  Flex,
  Icon,
  Heading,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSkiing } from "react-icons/fa";

import { FlagImage } from "@/app/components/Image";
import { MONTHS_CS } from "@/app/utils/locales";
import { MemberProps, ResortProps, TripProps } from "@/app/utils/types";
export interface TripContentProps
  extends Omit<TripProps, "members" | "resorts"> {
  members: MemberProps[];
  resorts: ResortProps[];
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

const Trip = ({ data }: { data: TripContentProps }) => {
  const router = useRouter();
  const monthColor = useColorModeValue("gray.400", "gray.500");
  const resortColor = useColorModeValue("gray.600", "gray.400");

  const { id, title, countryCode, month, resorts, members, nonMembers } = data;

  console.log({ resorts });

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
          <FlagImage countryCode={countryCode} ml={2} />
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
          {nonMembers &&
            nonMembers > 0 &&
            [...Array(nonMembers)].map((_, i) => (
              <Avatar key={`nonMember-${i}`} />
            ))}
        </AvatarGroup>
      </CardBody>
    </Card>
  );
};

export default Trip;
