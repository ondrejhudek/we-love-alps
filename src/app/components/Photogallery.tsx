"use client";

import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { GalleryFolderProps, ImageProps } from "@/app/utils/cloudinary";
import { PHOTO_CS } from "@/app/utils/locales";

import TRIPS from "@/data/trips";

const GalleryFolder = ({
  path,
  thumbnail,
  total,
  onClick,
}: {
  path: string;
  thumbnail: ImageProps;
  total: number;
  onClick: (id: string) => void;
}) => {
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const trip = TRIPS.find(({ id }) => id === path);
  if (!trip) return null;

  return (
    <Box
      role="group"
      _hover={{
        cursor: "pointer",
      }}
      onClick={() => onClick(trip.id)}
    >
      {/* Album thumbnail */}
      <AspectRatio
        position="relative"
        borderRadius="lg"
        boxShadow="base"
        overflow="hidden"
        _groupHover={{
          boxShadow: "outline",
        }}
      >
        <CldImage
          src={thumbnail.public_id}
          alt={trip.title}
          fill
          sizes="300px"
          style={{ objectFit: "cover" }}
        />
      </AspectRatio>

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

const Gallery = ({ folders }: { folders: GalleryFolderProps[] }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/photo/${id}`);
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, xs: 2, sm: 3, md: 4 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {folders.map(({ path, total_count, resources }) => (
          <GalleryFolder
            key={path}
            path={path}
            total={total_count}
            thumbnail={resources[0]}
            onClick={handleClick}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Gallery;
