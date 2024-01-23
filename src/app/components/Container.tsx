"use client";

import NextLink from "next/link";
import type { PropsWithChildren } from "react";
import {
  Button,
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
  button,
  props,
  headerProps,
  bodyProps,
  children,
}: PropsWithChildren<{
  title: string;
  count?: number;
  button?: {
    label: string;
    href: string;
  };
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
          {button && (
            <Button
              as={NextLink}
              href={button.href}
              variant="ghost"
              colorScheme="secondary"
              size="sm"
              ml="auto"
              my={-1}
              fontWeight={500}
            >
              {button.label}
            </Button>
          )}
        </Heading>
      </CardHeader>

      <Divider borderColor={dividerColor} />

      <CardBody {...bodyProps}>{children}</CardBody>
    </Card>
  );
};

export default Container;
