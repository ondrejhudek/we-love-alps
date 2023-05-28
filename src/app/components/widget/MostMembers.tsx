"use client";

import { useRouter } from "next/navigation";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import countBy from "ramda/src/countBy";

import { AvatarImage } from "@/app/components/Image";
import { Member, Trip } from "@/app/utils/types";

const MostMembers = ({
  members,
  trips,
}: {
  members: Member[];
  trips: Trip[];
}) => {
  const router = useRouter();

  const hoverBgColor = useColorModeValue("gray.300", "gray.600");

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
    .filter(({ id }) => members.find((member) => member.id === id))
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
            _hover={{ cursor: "pointer", bgColor: hoverBgColor }}
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
