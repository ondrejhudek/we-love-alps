import Image from "next/image";
import { CldImage } from "next-cloudinary";
import type {
  RenderImageProps,
  RenderImageContext,
  Photo,
} from "react-photo-album";
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

import { ImageProps } from "@/app/cloudinary/types";
import { COUNTRIES } from "@/app/utils/locales";

export type PhotoalbumImage = Photo & ImageProps;

const VERCEL_BLOB_URL =
  "https://laicmrkbwfhogqcl.public.blob.vercel-storage.com";

/**
 * Images of flags.
 * Served from Vercel Blob Storage.
 */
export const FlagImage = ({
  countryCode,
  boxSize = 20,
  ml,
  mr,
}: {
  countryCode: string;
  boxSize?: number;
  ml?: number;
  mr?: number;
}) => (
  <Box boxSize={`${boxSize}px`} ml={ml} mr={mr}>
    <Image
      src={`${VERCEL_BLOB_URL}/flags/${countryCode.toLowerCase()}.png`}
      alt={countryCode}
      title={COUNTRIES[countryCode]}
      width={64}
      height={64}
      quality={100}
    />
  </Box>
);

/**
 * Images of member avatars.
 * Served from Vercel Blob Storage.
 */
export const AvatarImage = ({
  id,
  name,
  ...boxRest
}: {
  id: string;
  name: string;
} & BoxProps) => (
  <Box borderRadius="full" overflow="hidden" {...boxRest}>
    <Image
      src={`${VERCEL_BLOB_URL}/members/${id}.jpg`}
      alt={name}
      width={150}
      height={150}
      quality={100}
    />
  </Box>
);

/**
 * Images of resort logos.
 * Served from Vercel Blob Storage.
 */
export const ResortImage = ({
  id,
  name,
  asAvatar,
  ...boxRest
}: {
  id: string;
  name: string;
  asAvatar?: boolean;
} & BoxProps) => {
  const resortBgColor = useColorModeValue("gray.100", "gray.800");

  const AS_AVATAR_PROPS: BoxProps = {
    m: 2,
    boxSize: 28,
    rounded: "full",
    objectFit: "contain",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: resortBgColor,
    boxShadow: "base",
  };

  const ON_CLICK_PROPS: BoxProps = {
    _hover: { cursor: "pointer", boxShadow: "outline" },
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      {...(asAvatar && AS_AVATAR_PROPS)}
      {...(boxRest.onClick && ON_CLICK_PROPS)}
      {...boxRest}
    >
      <Image
        src={`${VERCEL_BLOB_URL}/resorts/${id}.png`}
        alt={name}
        width={260}
        height={260}
        quality={100}
      />
    </Box>
  );
};

/**
 * Images of photogallery thumbnails.
 * Served from Cloudinary.
 */
export const GalleryThumbnailImage = ({
  alt,
  image,
}: {
  alt: string;
  image: ImageProps;
}) => (
  <CldImage
    src={image.public_id}
    alt={alt}
    width={480}
    height={360}
    sizes="(max-width: 22em) 50vw, (max-width: 30em) 50vw, (max-width: 48em) 33vw, 25vw"
    crop="fill"
    gravity="center"
    priority
    placeholder="blur"
    blurDataURL={image.blurDataUrl}
  />
);

/**
 * Images of one photoalbum thumbnails.
 * Served from Cloudinary.
 */

export const AlbumThumbnailImage = (
  _: RenderImageProps,
  { photo, height, width }: RenderImageContext<PhotoalbumImage>
) => (
  <Box
    key={photo.public_id}
    _hover={{
      opacity: "0.85",
    }}
  >
    <CldImage
      src={photo.public_id}
      alt={photo.public_id}
      height={height}
      width={width}
      crop="fill"
      gravity="center"
      priority
      placeholder="blur"
      blurDataURL={photo.blurDataUrl}
    />
  </Box>
);
