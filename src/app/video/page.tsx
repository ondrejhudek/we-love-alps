"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Link,
  IconButton,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

import Header from "@/app/components/Header";

import TRIPS from "@/data/trips";
import VIDEOS from "@/data/videos";

const Video = ({ id }: { id: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton
      isLoaded={isLoaded}
      borderRadius="lg"
      boxShadow="base"
      overflow="hidden"
    >
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </AspectRatio>
    </Skeleton>
  );
};

const Page = () => {
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const linkHoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <Header />

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 3, sm: 4, md: 5, lg: 6 }}
      >
        {Object.keys(VIDEOS)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((id) => {
            const trip = TRIPS.find((trip) => id === trip.id);
            if (!trip) return null;

            return (
              <Box key={id}>
                {/* Video iframe */}
                <Video id={VIDEOS[id]} />

                <Flex justify="space-between" py={3}>
                  <Box>
                    {/* Title */}
                    <Heading
                      as="h2"
                      display="flex"
                      alignItems="center"
                      fontSize="lg"
                    >
                      {trip.title}
                    </Heading>
                    {/* Year & Video by */}
                    <Text color={subtitleColor} fontSize="xs">
                      {trip.year}&nbsp;&nbsp;·&nbsp;&nbsp;Video od{" "}
                      <Link
                        as={NextLink}
                        href="/members/stuchla"
                        fontWeight={500}
                      >
                        @stuchla
                      </Link>
                    </Text>
                  </Box>

                  {/* Open in a new tab */}
                  <Tooltip label="Open in a new tab">
                    <IconButton
                      as={Link}
                      href={`https://www.youtube.com/watch?v=${VIDEOS[id]}`}
                      target="_blank"
                      size="sm"
                      variant="ghost"
                      icon={<FaExternalLinkAlt />}
                      aria-label="Open in a new tab"
                      _hover={{
                        bgColor: linkHoverBg,
                      }}
                    />
                  </Tooltip>
                </Flex>
              </Box>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export default Page;
