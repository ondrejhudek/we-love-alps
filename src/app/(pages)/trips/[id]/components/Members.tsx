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

const MembersComponent = ({ data }: { data: MemberProps[] }) => {
  const router = useRouter();

  const handleMemberClick = (id: string) => {
    router.push(`/members/${id}`);
  };

  return (
    <Flex wrap="wrap" m={-2}>
      {data.map(({ id, name }) => (
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
            onClick={() => handleMemberClick(id)}
          />
        </Tooltip>
      ))}
    </Flex>
  );
};

export default MembersComponent;
