import Image, { StaticImageData } from "next/image";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox/core";
import type { RenderPhotoProps } from "react-photo-album";
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

import { COUNTRIES } from "@/app/utils/locales";

const VERCEL_BLOB_URL =
  "https://laicmrkbwfhogqcl.public.blob.vercel-storage.com";

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

export const GalleryThumbnailImage = ({ filename }: { filename: string }) => (
  <Image
    src={`${VERCEL_BLOB_URL}/photogallery/${filename}.jpg`}
    alt={filename}
    fill
    sizes="(max-width: 22em) 50vw, (max-width: 30em) 50vw, (max-width: 48em) 33vw, 25vw"
    priority
    style={{
      objectFit: "cover",
    }}
  />
);

export const AlbumImage = ({
  src,
  pathname,
  onClick,
}: {
  src: string;
  pathname: string;
  onClick: () => void;
}) => (
  <Box
    width={240}
    height={180}
    position="relative"
    _hover={{
      cursor: "zoom-in",
      boxShadow: "outline",
    }}
    onClick={onClick}
  >
    <Image
      src={src}
      alt={pathname}
      fill
      style={{
        objectFit: "cover",
      }}
    />
  </Box>
);

export const AlbumThumbnailImage: React.FC<RenderPhotoProps> = ({
  photo,
  imageProps: { onClick },
  wrapperStyle,
  layout,
}) => (
  <Box
    key={photo.src}
    position="relative"
    style={{ ...wrapperStyle, cursor: "zoom-in" }}
    _hover={{
      opacity: "0.85",
    }}
  >
    <Image
      src={photo.src}
      alt={photo.alt ?? photo.src}
      fill
      sizes="100vw"
      priority
      onClick={onClick}
    />
  </Box>
);

export const LightboxImage = ({
  slide,
  rect,
}: {
  slide: SlideImage;
  rect: ContainerRect;
}) => {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!slide.width || !slide.height) return null;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height)
      )
    : rect.height;

  return (
    <Box position="relative" width={width} height={height}>
      <Image
        src={slide as StaticImageData}
        alt="lightbox"
        fill
        loading="eager"
        style={{ objectFit: cover ? "cover" : "contain" }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </Box>
  );
};
