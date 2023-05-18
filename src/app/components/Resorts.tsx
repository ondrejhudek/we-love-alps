"use client";

import { useRouter } from "next/navigation";
import { Flex, SkeletonCircle, Tooltip } from "@chakra-ui/react";

import { ResortImage } from "@/app/components/Image";
import { Resort } from "@/app/utils/types";

export const ResortsLoading = () => (
  <Flex wrap="wrap" m={-2}>
    <SkeletonCircle size="28" m={2} />
    <SkeletonCircle size="28" m={2} />
    <SkeletonCircle size="28" m={2} />
  </Flex>
);

const Resorts = ({ data }: { data: Resort[] }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/resort/${id}`);
  };

  return (
    <Flex wrap="wrap" m={-2}>
      {data.map(({ id, name }) => (
        <Tooltip key={id} label={name} shouldWrapChildren>
          <ResortImage
            id={id}
            name={name}
            asAvatar
            onClick={() => handleClick(id)}
          />
        </Tooltip>
      ))}
    </Flex>
  );
};

export default Resorts;
