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
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface StatProps {
  title: string;
  value: number;
  icon: IconType;
  path: string;
  pathLabel: string;
  color: string;
}

const MyStat = ({ title, value, icon, path, pathLabel, color }: StatProps) => (
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
              bgColor={useColorModeValue(`${color}.200`, `${color}.700`)}
              rounded="lg"
              mr={4}
            >
              <Icon
                as={icon}
                boxSize={6}
                color={useColorModeValue(`${color}.800`, `${color}.300`)}
              />
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
        bgColor={useColorModeValue("gray.50", "gray.900")}
        fontSize="sm"
        fontWeight={500}
        borderBottomRadius="var(--card-radius)"
      >
        <Link
          as={NextLink}
          href={path}
          color={useColorModeValue(`${color}.600`, `${color}.400`)}
          _hover={{ textDecoration: "underline" }}
        >
          {pathLabel}
        </Link>
      </CardFooter>
    </Card>
  </Box>
);

export default MyStat;
