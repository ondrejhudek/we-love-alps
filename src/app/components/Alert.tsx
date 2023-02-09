"use client";

import Link from "next/link";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

const AlertError = ({
  title,
  description,
  button: { path, label },
}: {
  title: string;
  description: string;
  button: {
    path: string;
    label: string;
  };
}) => (
  <>
    <Alert status="error" rounded="md">
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

export default AlertError;
