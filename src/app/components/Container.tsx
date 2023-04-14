"use client";

import {
  Card,
  CardProps,
  CardHeader,
  CardHeaderProps,
  CardBody,
  CardBodyProps,
  Divider,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const Container = ({
  title,
  props,
  headerProps,
  bodyProps,
  children,
}: {
  title: string;
  props?: CardProps;
  headerProps?: CardHeaderProps;
  bodyProps?: CardBodyProps;
  children: React.ReactNode;
}) => {
  const dividerColor = useColorModeValue("gray.300", "gray.800");

  return (
    <Card mt={4} {...props}>
      <CardHeader {...headerProps}>
        <Heading as="h2" fontSize="xl">
          {title}
        </Heading>
      </CardHeader>

      <Divider borderColor={dividerColor} />

      <CardBody {...bodyProps}>{children}</CardBody>
    </Card>
  );
};

export default Container;
