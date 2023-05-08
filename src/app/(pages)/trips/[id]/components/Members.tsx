"use client";

import { useRouter } from "next/navigation";
import { Flex, SkeletonCircle, Tooltip } from "@chakra-ui/react";

import { AvatarImage } from "@/app/components/Image";
import { MemberProps } from "@/app/utils/types";

export const MembersLoading = () => (
  <Flex wrap="wrap" m={-2}>
    <SkeletonCircle size="24" m={2} />
    <SkeletonCircle size="24" m={2} />
    <SkeletonCircle size="24" m={2} />
  </Flex>
);

const Members = ({ data }: { data: MemberProps[] }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/members/${id}`);
  };

  return (
    <Flex wrap="wrap" m={-2}>
      {data.map(({ alias, name }) => (
        <Tooltip key={alias} label={name} shouldWrapChildren>
          <AvatarImage
            id={alias}
            name={name}
            boxSize={24}
            m={2}
            boxShadow="md"
            _hover={{
              cursor: "pointer",
              boxShadow: "outline",
            }}
            onClick={() => handleClick(alias)}
          />
        </Tooltip>
      ))}
    </Flex>
  );
};

export default Members;
