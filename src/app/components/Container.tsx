"use client";

import type { PropsWithChildren } from "react";
import {
  Card,
  CardProps,
  CardHeader,
  CardHeaderProps,
  CardBody,
  CardBodyProps,
  Center,
  Divider,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const Count = ({ number }: { number: number }) => (
  <Center
    boxSize={6}
    ml={2}
    rounded="full"
    color="white"
    bgColor="secondary.600"
    fontSize="xs"
    fontWeight={500}
  >
    {number}
  </Center>
);

const Container = ({
  title,
  count,
  props,
  headerProps,
  bodyProps,
  children,
}: PropsWithChildren<{
  title: string;
  count?: number;
  props?: CardProps;
  headerProps?: CardHeaderProps;
  bodyProps?: CardBodyProps;
}>) => {
  const dividerColor = useColorModeValue("gray.300", "gray.800");

  return (
    <Card mt={4} {...props} borderRadius={16}>
      <CardHeader {...headerProps}>
        <Heading as="h2" fontSize="xl" display="flex" alignItems="center">
          {title}
          {count && <Count number={count} />}
        </Heading>
      </CardHeader>

      <Divider borderColor={dividerColor} />

      <CardBody {...bodyProps}>{children}</CardBody>
    </Card>
  );
};

export default Container;
