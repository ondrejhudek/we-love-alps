import NextLink from "next/link";
import {
  Box,
  Flex,
  Card,
  CardBody,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Link,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface StatProps {
  title: string;
  value: number;
  icon: IconType;
  path: string;
  pathLabel: string;
}

const MyStat = ({ title, value, icon, path, pathLabel }: StatProps) => (
  <Box>
    <Card>
      <CardBody>
        <Stat>
          <Flex align="center">
            {/* Icon */}
            <Flex
              align="center"
              justify="center"
              boxSize={12}
              bgColor="primary.600"
              rounded="lg"
              mr={4}
            >
              <Icon as={icon} boxSize={6} color="white" />
            </Flex>
            <Box>
              {/* Title */}
              <StatLabel color="gray.500">{title}</StatLabel>
              {/* Value */}
              <StatNumber lineHeight={6}>{value}</StatNumber>
            </Box>
          </Flex>
        </Stat>
      </CardBody>
      {/* Link */}
      <CardFooter
        py={4}
        bgColor="gray.50"
        fontSize="sm"
        fontWeight={500}
        borderBottomRadius="var(--card-radius)"
      >
        <Link
          as={NextLink}
          href={path}
          color="primary.600"
          _hover={{ textDecoration: "underline" }}
        >
          {pathLabel}
        </Link>
      </CardFooter>
    </Card>
  </Box>
);

export default MyStat;
