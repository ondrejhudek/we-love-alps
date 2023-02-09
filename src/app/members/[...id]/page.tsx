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

import MEMBERS, { Member as MemberProps } from "@/data/members";

const Member = ({ data }: { data?: MemberProps }) => {
  if (!data)
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

  return <p>{data.name}</p>;
};

const Page = ({ params: { id } }: { params: { id: string[] } }) => {
  const member = MEMBERS.find((member) => member.id === id[0]);

  return (
    <>
      <Header pathname="/members" name={member?.name} />
      <Member data={member} />
    </>
  );
};

export default Page;
