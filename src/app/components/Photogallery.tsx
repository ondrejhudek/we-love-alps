"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { GalleryThumbnailImage } from "@/app/components/Image";
import { GalleryFolderProps, ImageProps } from "@/app/cloudinary/types";
import { Trip } from "@/app/utils/types";
import { PHOTO_CS } from "@/app/utils/locales";

const GALLERY_SIZES: Record<string, number> = {
  "gallery/2024-dachstein": 17,
  "gallery/2023-passo-del-tonale": 15,
  "gallery/2022-kitzbuhel": 3,
  "gallery/2020-schladming": 2,
  "gallery/2019-kronplatz": 17,
  "gallery/2018-solden": 13,
  "gallery/2017-sella-ronda": 19,
  "gallery/2016-zell-am-see": 27,
  "gallery/2015-passo-del-tonale": 8,
  "gallery/2015-les-sybelles": 1,
  "gallery/2013-aprica": 36,
  "gallery/2011-tauplitz": 11,
  "gallery/2009-ponte-di-legno": 13,
  "gallery/2008-lienz": 5,
};

const GalleryFolder = ({
  thumbnail,
  total,
  trip,
  onClick,
}: {
  thumbnail?: ImageProps;
  total: number;
  trip: Trip;
  onClick: (id: string) => void;
}) => {
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      role="group"
      _hover={{
        cursor: "pointer",
      }}
      onClick={() => onClick(trip.id)}
    >
      {/* Album thumbnail */}
      {thumbnail && (
        <Box
          borderRadius={16}
          boxShadow="base"
          overflow="hidden"
          _groupHover={{
            boxShadow: "outline",
          }}
        >
          <GalleryThumbnailImage alt={trip.title} image={thumbnail} />
        </Box>
      )}

      <Box py={3}>
        {/* Title */}
        <Heading as="h2" display="flex" alignItems="baseline" fontSize="lg">
          {trip.title}
        </Heading>
        {/* Year & photo count */}
        <Text color={subtitleColor} fontSize="xs">
          {trip.year}&nbsp;&nbsp;·&nbsp;&nbsp;{total}{" "}
          {PHOTO_CS[total] || PHOTO_CS[5]}
        </Text>
      </Box>
    </Box>
  );
};

const Gallery = ({
  folders,
  tripsData,
}: {
  folders: GalleryFolderProps[];
  tripsData: Trip[];
}) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/photo/${id}`);
  };

  return (
    <SimpleGrid
      columns={{ base: 1, xs: 2, sm: 3, md: 4 }}
      spacing={{ base: 3, sm: 4, lg: 5 }}
    >
      {folders.map(({ path, thumbnailImage }) => {
        const trip = tripsData.find(({ id }) => `gallery/${id}` === path);
        if (!trip) return null;

        return (
          <GalleryFolder
            key={path}
            trip={trip}
            total={GALLERY_SIZES[path]}
            thumbnail={thumbnailImage}
            onClick={handleClick}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default Gallery;
