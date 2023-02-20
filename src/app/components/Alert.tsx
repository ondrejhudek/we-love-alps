"use client";

import Link from "next/link";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertStatus,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

const MyAlert = ({
  status = "error",
  title,
  description,
  button: { path, label },
}: {
  status?: AlertStatus;
  title: string;
  description: string;
  button: {
    path: string;
    label: string;
  };
}) => (
  <>
    <Alert status={status} rounded="md">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>

    <Button
      as={Link}
      href={path}
      variant="outline"
      mt={4}
      leftIcon={<Icon as={FaArrowLeft} fontSize="xs" />}
      fontWeight={500}
    >
      {label}
    </Button>
  </>
);

export default MyAlert;
