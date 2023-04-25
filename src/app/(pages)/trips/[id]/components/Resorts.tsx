"use client";

import { useRouter } from "next/navigation";
import { Flex, SkeletonCircle, Tooltip } from "@chakra-ui/react";

import { ResortImage } from "@/app/components/Image";
import { ResortProps } from "@/app/utils/types";

export const ResortsLoading = () => <SkeletonCircle size="28" />;

const Resorts = ({ data }: { data: ResortProps[] }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/resorts/${id}`);
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
