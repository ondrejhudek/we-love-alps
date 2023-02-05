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

import Header from "../../components/Header";

import TRIPS, { Trip } from "../../../data/trips";

const Trip = ({ trip }: { trip?: Trip }) => {
  if (!trip)
    return (
      <>
        <Alert status="error" rounded="md">
          <AlertIcon />
          <AlertTitle>Tento zájezd neexistuje.</AlertTitle>
          <AlertDescription>Běž zpět a vyber jiný.</AlertDescription>
        </Alert>

        <Button
          as={Link}
          href="/trips"
          variant="outline"
          mt={4}
          leftIcon={<Icon as={FaArrowLeft} fontSize="xs" />}
          fontWeight={500}
        >
          Zpět na Zájezdy
        </Button>
      </>
    );

  return <p>{trip.title}</p>;
};

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const trip = TRIPS.find((trip) => trip.id === parseInt(id));

  return (
    <>
      <Header pathname="/trips" name={trip?.title} />
      <Trip trip={trip} />
    </>
  );
};

export default Page;
