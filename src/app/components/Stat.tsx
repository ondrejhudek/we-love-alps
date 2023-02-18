import NextLink from "next/link";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  Link,
  Stat,
  StatLabel,
  StatNumber,
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

const MyStat = ({ title, value, icon, path, pathLabel, color }: StatProps) => {
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
      <Card
        // bgColor={useColorModeValue(`${color}.500`, `${color}.800`)}
        bg={`linear-gradient(210deg, ${bgFrom} 0%, ${bgTo} 100%)`}
      >
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
                  as={icon}
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
                  {value}
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
            href={path}
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
