"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Icon,
} from "@chakra-ui/react";
import { HiArrowLeft } from "react-icons/hi2";

import { NavLinkKey } from "@/app/utils/types";

const ALERTS: Partial<
  Record<
    NavLinkKey,
    { title: string; description: string; buttonLabel: string }
  >
> = {
  [NavLinkKey.Member]: {
    title: "Tento člen neexistuje!",
    description: "Běž zpět a vyber jiného.",
    buttonLabel: "Zpět na Členy",
  },
  [NavLinkKey.Trip]: {
    title: "Tento zájezd neexistuje!",
    description: "Běž zpět a vyber jiný.",
    buttonLabel: "Zpět na Zájezdy",
  },
  [NavLinkKey.Resort]: {
    title: "Tento resort neexistuje!",
    description: "Běž zpět a vyber jiný.",
    buttonLabel: "Zpět na Resorty",
  },
  [NavLinkKey.Photo]: {
    title: "Tato fotogalerie neexistuje!",
    description: "Běž zpět a vyber jinou.",
    buttonLabel: "Zpět na Fotky",
  },
};

const NotFound = () => {
  const pathname = usePathname();
  const alertKey = `/${pathname.split("/")[1]}` as NavLinkKey;
  const alert = ALERTS[alertKey];

  if (!alert) return <></>;

  return (
    <Alert
      status="error"
      py={5}
      px={6}
      alignItems="flex-start"
      borderRadius="lg"
    >
      <AlertIcon boxSize={8} mt={1} mr={3} />
      <Box>
        <AlertTitle fontSize="lg">HOVNO{alert.title}</AlertTitle>
        <AlertDescription>{alert.description}</AlertDescription>

        <Box mt={3}>
          <Button
            as={NextLink}
            href={alertKey}
            replace
            variant="outline"
            colorScheme="red"
            leftIcon={<Icon as={HiArrowLeft} fontSize="xs" />}
            fontWeight={500}
          >
            {alert.buttonLabel}
          </Button>
        </Box>
      </Box>
    </Alert>
  );
};

export default NotFound;
