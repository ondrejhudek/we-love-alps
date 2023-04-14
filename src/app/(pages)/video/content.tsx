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

import { VideoProps } from "@/app/utils/types";

export interface VideoContentProps extends VideoProps {
  title: string;
  year: number;
}

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

const Content = ({ data }: { data: VideoContentProps[] }) => {
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const linkHoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3 }}
      spacing={{ base: 3, sm: 4, md: 5, lg: 6 }}
    >
      {data.map(({ tripId, youtubeId, title, year }) => (
        <Box key={tripId}>
          {/* Video iframe */}
          <Video id={youtubeId} />

          <Flex justify="space-between" py={3}>
            <Box>
              {/* Title */}
              <Heading as="h2" display="flex" alignItems="center" fontSize="lg">
                {title}
              </Heading>
              {/* Year & Video by */}
              <Text color={subtitleColor} fontSize="xs">
                {year}&nbsp;&nbsp;·&nbsp;&nbsp;Video od{" "}
                <Link as={NextLink} href="/members/stuchla" fontWeight={500}>
                  @stuchla
                </Link>
              </Text>
            </Box>

            {/* Open in a new tab */}
            <Tooltip label="Open in a new tab">
              <IconButton
                as={Link}
                href={`https://www.youtube.com/watch?v=${youtubeId}`}
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
      ))}
    </SimpleGrid>
  );
};

export default Content;
