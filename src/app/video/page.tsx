"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import {
  Heading,
  AspectRatio,
  Badge,
  Text,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardFooter,
  Link,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

import Header from "../components/Header";

import TRIPS from "../../data/trips";
import VIDEOS from "../../data/videos";

const Page = () => {
  const pathname = usePathname();
  const footerColor = useColorModeValue("gray.600", "gray.300");
  const footerColorAssign = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      <Header pathname={pathname} />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 3, md: 6 }}
      >
        {Object.keys(VIDEOS)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((id) => {
            const trip = TRIPS.find((trip) => id === trip.id);

            if (!trip) return null;

            return (
              <Card key={id}>
                {/* Header */}
                <CardHeader>
                  <Flex align="center" justify="space-between">
                    <Flex align="center">
                      {/* Year */}
                      <Badge
                        color="white"
                        bgColor="secondary.600"
                        fontSize="lg"
                        display="flex"
                        alignItems="center"
                        px={2}
                        borderRadius="md"
                      >
                        {trip.year}
                      </Badge>

                      {/* Title */}
                      <Heading as="h2" ml={2} fontSize="xl">
                        {trip.title}
                      </Heading>
                    </Flex>

                    {/* Open in a new window */}
                    <IconButton
                      as={Link}
                      href={`https://www.youtube.com/watch?v=${VIDEOS[id]}`}
                      target="_blank"
                      size="sm"
                      variant="ghost"
                      icon={<FaExternalLinkAlt />}
                      title="Open in a new tab"
                      aria-label="Open in a new tab"
                    />
                  </Flex>
                </CardHeader>

                {/* Youtube video */}
                <AspectRatio key={id} ratio={16 / 9}>
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEOS[id]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>

                {/* Footer */}
                <CardFooter>
                  <Text color={footerColor} fontSize="xs">
                    Video od{" "}
                    <Link
                      as={NextLink}
                      href="/members/stuchla"
                      color={footerColorAssign}
                      fontWeight={500}
                    >
                      @stuchla
                    </Link>
                  </Text>
                </CardFooter>
              </Card>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export default Page;
