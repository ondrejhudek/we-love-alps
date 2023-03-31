import Image, { StaticImageData } from "next/image";
import { CldImage } from "next-cloudinary";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox/core";
import type { RenderPhotoProps } from "react-photo-album";
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

import { getBlurredUrl } from "@/app/cloudinary/generateBlurPlaceholder";
import { ImageProps } from "@/app/cloudinary/types";
import COUNTRIES from "@/data/countries";
import { TripProps } from "@/data/trips";

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
}) => {
  const publicId = `flags/${countryCode.toLowerCase()}`;
  const urlBlurred = getBlurredUrl(
    publicId,
    "w_20,h_20,r_20,e_blur:1000,q_auto,f_webp"
  );

  return (
    <Box
      boxSize={`${boxSize}px`}
      ml={ml}
      mr={mr}
      bgImage={`url(${urlBlurred})`}
      bgPosition="center"
      bgSize="contain"
    >
      <CldImage
        src={publicId}
        alt={countryCode}
        title={COUNTRIES[countryCode]}
        width={64}
        height={64}
        quality={100}
      />
    </Box>
  );
};

export const AvatarImage = ({
  id,
  name,
  ...boxRest
}: {
  id: string;
  name: string;
} & BoxProps) => {
  const publicId = `members/${id}`;
  const urlBlurred = getBlurredUrl(
    publicId,
    "w_100,h_100,e_blur:1000,q_auto,f_webp"
  );

  return (
    <Box
      borderRadius="full"
      overflow="hidden"
      bgImage={`url(${urlBlurred})`}
      bgPosition="center"
      bgSize="contain"
      {...boxRest}
    >
      <CldImage
        src={publicId}
        alt={name}
        width={150}
        height={150}
        quality={100}
      />
    </Box>
  );
};

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
  const publicId = `resorts/${id}`;
  const urlBlurred = getBlurredUrl(
    publicId,
    "w_100,h_100,e_blur:1000,q_auto,f_webp"
  );

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
      bgImage={`url(${urlBlurred})`}
      bgPosition="center"
      bgSize="contain"
      {...(asAvatar && AS_AVATAR_PROPS)}
      {...(boxRest.onClick && ON_CLICK_PROPS)}
      {...boxRest}
    >
      <CldImage
        src={publicId}
        alt={name}
        width={260}
        height={260}
        quality={100}
      />
    </Box>
  );
};

export const GalleryThumbnailImage = ({
  trip,
  image,
}: {
  trip: TripProps;
  image: ImageProps;
}) => (
  <CldImage
    src={image.public_id}
    alt={trip.title}
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

export const AlbumThumbnailImage: React.FC<
  RenderPhotoProps<ImageProps & { src: string }>
> = ({ photo, imageProps: { onClick }, wrapperStyle, layout }) => (
  <Box
    key={photo.public_id}
    style={{ ...wrapperStyle, cursor: "zoom-in" }}
    _hover={{
      opacity: "0.85",
    }}
  >
    <CldImage
      src={photo.public_id}
      alt={photo.public_id}
      width={Math.ceil(layout.width)}
      height={Math.ceil(layout.height)}
      crop="fill"
      gravity="center"
      priority
      placeholder="blur"
      blurDataURL={photo.blurDataUrl}
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
