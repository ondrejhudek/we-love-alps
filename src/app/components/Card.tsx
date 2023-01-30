import {
  Box,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const MyCard = ({
  children,
  header,
  footer,
  bodyPadding,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bodyPadding?: number;
}) => (
  <Card
    bg={useColorModeValue("white", "gray.900")}
    rounded="lg"
    borderWidth={1}
    borderStyle="solid"
    borderColor="gray.100"
    boxShadow="xl"
  >
    {header && <CardHeader>{header}</CardHeader>}
    <CardBody p={bodyPadding}>{children}</CardBody>
    {footer && <CardFooter>{footer}</CardFooter>}
  </Card>
);

export default MyCard;
