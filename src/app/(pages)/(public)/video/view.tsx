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
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

import Header from "@/app/components/Header";
import { Video } from "@/app/utils/types";

export interface VideoViewProps extends Video {
  title: string;
  year: number;
}

const VideoFrame = ({ id }: { id: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton
      isLoaded={isLoaded}
      borderRadius={16}
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

const VideoComponent = ({
  youtubeId,
  title,
  year,
}: {
  youtubeId: string;
  title: string;
  year: number;
}) => {
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const linkHoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Box>
      {/* Video iframe */}
      <VideoFrame id={youtubeId} />

      <Flex justify="space-between" py={3}>
        <Box>
          {/* Title */}
          <Heading as="h2" display="flex" alignItems="center" fontSize="lg">
            {title}
          </Heading>
          {/* Year & Video by */}
          <Text color={subtitleColor} fontSize="xs">
            {year}&nbsp;&nbsp;·&nbsp;&nbsp;Video od{" "}
            <Link as={NextLink} href="/member/stuchla" fontWeight={500}>
              @stuchla
            </Link>
          </Text>
        </Box>

        {/* Open in a new tab */}
        <Tooltip label="Otevřít v novém okně">
          <IconButton
            as={Link}
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            size="sm"
            variant="ghost"
            icon={<HiArrowTopRightOnSquare />}
            fontSize="lg"
            aria-label="Otevřít v novém okně"
            _hover={{
              bgColor: linkHoverBg,
            }}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
};

const View = ({ data }: { data: VideoViewProps[] }) => (
  <>
    <Header />

    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3 }}
      spacing={{ base: 3, sm: 4, md: 5, lg: 6 }}
    >
      {data.map(({ youtube_id, title, year }) => (
        <VideoComponent
          key={youtube_id}
          youtubeId={youtube_id}
          title={title}
          year={year}
        />
      ))}
    </SimpleGrid>
  </>
);

export default View;
