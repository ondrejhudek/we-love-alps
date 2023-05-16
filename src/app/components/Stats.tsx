"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Skeleton,
  SkeletonCircle,
  Stat,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlinePhoto,
  HiOutlineVideoCamera,
  HiArrowLongRight,
} from "react-icons/hi2";

import { TableWithPhoto } from "@/app/utils/types";

export interface StatProps {
  slug: TableWithPhoto;
  title: string;
  color: string;
}

const ICONS: Partial<Record<TableWithPhoto, IconType>> = {
  member: HiOutlineUsers,
  trip: HiOutlineCalendarDays,
  resort: HiOutlineMapPin,
  photo: HiOutlinePhoto,
  video: HiOutlineVideoCamera,
};

export const StatLoading = ({ color }: { color: string }) => {
  const bgFrom = useColorModeValue(
    `var(--chakra-colors-${color}-100)`,
    `var(--chakra-colors-${color}-600)`
  );
  const bgTo = useColorModeValue(
    `var(--chakra-colors-${color}-200)`,
    `var(--chakra-colors-${color}-700)`
  );

  return (
    <Card
      height="135px"
      bg={`linear-gradient(210deg, ${bgFrom} 0%, ${bgTo} 100%)`}
      borderRadius={22}
    >
      <CardBody p={6} position="relative">
        <Skeleton width={32} height={5} />
        <Flex mt={5} align="center">
          <SkeletonCircle size="12" mr={3} />
          <Skeleton width={8} height={8} />
        </Flex>
      </CardBody>
    </Card>
  );
};

export const MyStat = ({
  slug,
  title,
  color,
  count,
}: StatProps & { count: number }) => {
  const router = useRouter();

  const bgFrom = useColorModeValue(
    `var(--chakra-colors-${color}-500)`,
    `var(--chakra-colors-${color}-600)`
  );
  const bgTo = useColorModeValue(
    `var(--chakra-colors-${color}-600)`,
    `var(--chakra-colors-${color}-700)`
  );
  const bgHover = useColorModeValue(`${color}.600`, `${color}.700`);
  const iconColor = useColorModeValue(`${color}.700`, `${color}.800`);
  const iconBg = useColorModeValue(`${color}.300`, `${color}.400`);

  const handleClick = () => {
    router.push(`/${slug}`);
  };

  return (
    <Card
      bg={`linear-gradient(210deg, ${bgFrom} 0%, ${bgTo} 100%)`}
      borderRadius={22}
      role="group"
      _hover={{
        cursor: "pointer",
        bg: bgHover,
      }}
      onClick={handleClick}
    >
      <CardBody p={6} position="relative">
        <Icon
          as={HiArrowLongRight}
          position="absolute"
          top={6}
          right={6}
          boxSize={6}
          color="white"
          transition="var(--chakra-transition-primary)"
          _groupHover={{
            transform: "scale(1.5)",
          }}
        />

        <Stat>
          {/* Heading */}
          <Heading size="sm" color="white">
            {title}
          </Heading>

          {/* Body */}
          <Flex align="center" mt={5}>
            {/* Icon */}
            <Flex
              align="center"
              justify="center"
              boxSize={12}
              bgColor={iconBg}
              rounded="full"
              mr={3}
            >
              <Icon as={ICONS[slug]} boxSize={6} color={iconColor} />
            </Flex>
            <Box>
              {/* Value */}
              <StatNumber color="white" lineHeight={6} fontWeight={500}>
                {count}
              </StatNumber>
            </Box>
          </Flex>
        </Stat>
      </CardBody>
    </Card>
  );
};

export default MyStat;
