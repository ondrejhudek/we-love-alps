"use client";

import { useRouter } from "next/navigation";
import { Flex, SkeletonCircle, Tooltip } from "@chakra-ui/react";

import { AvatarImage } from "@/app/components/Image";
import { Member } from "@/app/utils/types";

export const MembersLoading = () => (
  <Flex wrap="wrap" m={-2}>
    <SkeletonCircle size="24" m={2} />
    <SkeletonCircle size="24" m={2} />
    <SkeletonCircle size="24" m={2} />
  </Flex>
);

const Members = ({ data }: { data: Member[] }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/member/${id}`);
  };

  return (
    <Flex wrap="wrap" m={-2}>
      {data
        // Sort folder asc by name
        .sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        })
        .map(({ id, name }) => (
          <Tooltip key={id} label={name} shouldWrapChildren>
            <AvatarImage
              id={id}
              name={name}
              boxSize={24}
              m={2}
              boxShadow="md"
              _hover={{
                cursor: "pointer",
                boxShadow: "outline",
              }}
              onClick={() => handleClick(id)}
            />
          </Tooltip>
        ))}
    </Flex>
  );
};

export default Members;
