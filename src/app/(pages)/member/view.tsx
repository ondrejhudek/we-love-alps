"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  StackDivider,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaInstagram, FaFacebook } from "react-icons/fa";

import Header from "@/app/components/Header";
import { AvatarImage } from "@/app/components/Image";
import { Member } from "@/app/utils/types";

const SocialButton = ({
  name,
  icon,
  color,
  link,
}: {
  name: string;
  icon: IconType;
  color: string;
  link: string;
}) => (
  <Flex
    as={Link}
    href={link}
    target="_blank"
    role="group"
    align="center"
    justify="center"
    flex="1"
    py={4}
    textAlign="center"
    fontSize="sm"
    fontWeight={500}
    _hover={{
      textDecoration: "none",
      color: "white",
      bgColor: color,
    }}
  >
    <Icon
      as={icon}
      boxSize={5}
      mr={2}
      color={color}
      _groupHover={{ color: "white" }}
    />
    {name}
  </Flex>
);

const View = ({ data }: { data: Member[] }) => {
  const router = useRouter();
  const borderColor = useColorModeValue("gray.200", "gray.800");

  const handleClick = (id: string) => {
    router.push(`/member/${id}`);
  };

  useEffect(() => {
    router.prefetch("/member/[id]");
  }, [router]);

  return (
    <>
      <Header />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {data.map(({ id, name, facebook, instagram }) => (
          <Card
            key={id}
            borderRadius={16}
            overflow="hidden"
            onClick={() => handleClick(id)}
            _hover={{
              cursor: "pointer",
              boxShadow: "outline",
            }}
          >
            {/* Header */}
            <CardBody py={10}>
              <Box textAlign="center">
                <AvatarImage
                  id={id}
                  name={name}
                  boxSize={32}
                  marginInlineStart="auto"
                  marginInlineEnd="auto"
                  mb={4}
                />
                <Heading fontSize="xl" fontWeight={500}>
                  {name}
                </Heading>
                <Text mt={1} color="gray.500" fontSize="sm" fontWeight={500}>
                  @{id}
                </Text>
              </Box>
            </CardBody>

            {/* Footer */}
            <CardFooter
              p={0}
              borderTopWidth={1}
              borderStyle="solid"
              borderColor={borderColor}
            >
              <HStack
                flex="1"
                divider={<StackDivider borderColor={borderColor} />}
                spacing={0}
              >
                {facebook && (
                  <SocialButton
                    name="Facebook"
                    icon={FaFacebook}
                    color="facebook.500"
                    link={`https://www.facebook.com/${facebook}`}
                  />
                )}
                {instagram && (
                  <SocialButton
                    name="Instagram"
                    icon={FaInstagram}
                    color="instagram.500"
                    link={`https://www.instagram.com/${instagram}`}
                  />
                )}
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default View;
