"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import countBy from "ramda/src/countBy";

import { AvatarImage } from "@/app/components/Image";
import { Member, Trip } from "@/app/utils/types";

export const MostMembersLoading = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <Flex key={`skeleton-${i}`} justify="space-between" align="center">
        <Flex align="center">
          <SkeletonCircle size="10" />
          <Skeleton width={32} height={5} ml={3} />
        </Flex>
        <Skeleton width={6} height={5} mr={1} />
      </Flex>
    ))}
  </>
);

export const MostMembersWrapper = ({ children }: PropsWithChildren) => (
  <Box>
    <Heading mb={4} size="md">
      Nejčastěji jezdí
    </Heading>

    <SimpleGrid columns={1} spacingY={6} p={4} bg="gray.200" borderRadius={16}>
      {children}
    </SimpleGrid>
  </Box>
);

const MostMembers = ({
  members,
  trips,
}: {
  members: Member[];
  trips: Trip[];
}) => {
  const router = useRouter();
  const top3Members = Object.entries(
    countBy(
      (m) => m,
      trips.flatMap(({ members }) => members)
    )
  )
    .map(([key, value]) => ({
      id: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const handleClick = (id: string) => {
    router.push(`/member/${id}`);
  };

  return (
    <>
      {top3Members.map(({ id, count }) => {
        const member = members.find((m) => m.id === id);
        if (!member) return null;
        return (
          <Flex
            key={id}
            justify="space-between"
            align="center"
            m={-2}
            p={2}
            borderRadius={12}
            _hover={{ cursor: "pointer", bgColor: "gray.300" }}
            onClick={() => handleClick(id)}
          >
            <Flex align="center">
              <AvatarImage id={id} name={member.name} boxSize={10} />
              <Text ml={3} fontWeight={500}>
                {member.name}
              </Text>
            </Flex>
            <Text mr={1} fontWeight={700}>
              {count}x
            </Text>
          </Flex>
        );
      })}
    </>
  );
};

export default MostMembers;
