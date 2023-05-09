"use client";

import NextLink from "next/link";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { HiOutlineUsers, HiOutlineMapPin, HiOutlineMap } from "react-icons/hi2";

import { Table } from "@/app/utils/types";

export interface StatProps {
  slug: Table;
  title: string;
  pathLabel: string;
  color: string;
}

const ICONS: Partial<Record<Table, IconType>> = {
  member: HiOutlineUsers,
  trip: HiOutlineMap,
  resort: HiOutlineMapPin,
};

export const Stats = ({ children }: { children: React.ReactNode }) => (
  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, sm: 4, md: 6 }}>
    {children}
  </SimpleGrid>
);

export const StatLoading = ({ color }: { color: string }) => {
  const startColor = useColorModeValue(
    `var(--chakra-colors-${color}-200)`,
    `var(--chakra-colors-${color}-300)`
  );
  const endColor = useColorModeValue(
    `var(--chakra-colors-${color}-400)`,
    `var(--chakra-colors-${color}-500)`
  );

  return (
    <Skeleton
      width={8}
      height="6"
      startColor={startColor}
      endColor={endColor}
    />
  );
};

const MyStat = ({
  slug,
  title,
  pathLabel,
  color,
  children,
}: StatProps & { children: React.ReactNode }) => {
  const bgFrom = useColorModeValue(
    `var(--chakra-colors-${color}-500)`,
    `var(--chakra-colors-${color}-800)`
  );
  const bgTo = useColorModeValue(
    `var(--chakra-colors-${color}-600)`,
    `var(--chakra-colors-${color}-900)`
  );

  return (
    <Box>
      <Card bg={`linear-gradient(210deg, ${bgFrom} 0%, ${bgTo} 100%)`}>
        <CardBody>
          <Stat>
            <Flex align="center">
              {/* Icon */}
              <Flex
                align="center"
                justify="center"
                boxSize={12}
                bgColor={useColorModeValue("whiteAlpha.600", "whiteAlpha.400")}
                rounded="lg"
                mr={4}
              >
                <Icon
                  as={ICONS[slug]}
                  boxSize={6}
                  color={useColorModeValue(`${color}.800`, `${color}.900`)}
                />
              </Flex>
              <Box>
                {/* Title */}
                <StatLabel
                  color={useColorModeValue("whiteAlpha.600", "whiteAlpha.600")}
                >
                  {title}
                </StatLabel>
                {/* Value */}
                <StatNumber
                  color={useColorModeValue("white", "whiteAlpha.800")}
                  lineHeight={6}
                >
                  {children}
                </StatNumber>
              </Box>
            </Flex>
          </Stat>
        </CardBody>
        {/* Link */}
        <CardFooter
          py={4}
          bgColor={useColorModeValue("whiteAlpha.600", "whiteAlpha.400")}
          fontSize="sm"
          fontWeight={500}
          borderBottomRadius="var(--card-radius)"
        >
          <Link
            as={NextLink}
            href={`/${slug}`}
            color={useColorModeValue(`${color}.800`, `${color}.900`)}
            _hover={{ textDecoration: "underline" }}
          >
            {pathLabel}
          </Link>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default MyStat;
