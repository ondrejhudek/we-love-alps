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
import { HiArrowLeft } from "react-icons/hi2";

const MyAlert = ({
  status = "error",
  title,
  description,
  button,
}: {
  status?: AlertStatus;
  title: string;
  description?: string;
  button?: {
    path: string;
    label: string;
  };
}) => (
  <>
    <Alert status={status} rounded="md">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>

    {button && (
      <Button
        as={Link}
        href={button.path}
        variant="outline"
        mt={4}
        leftIcon={<Icon as={HiArrowLeft} fontSize="sm" />}
        fontWeight={500}
      >
        {button.label}
      </Button>
    )}
  </>
);

export default MyAlert;
