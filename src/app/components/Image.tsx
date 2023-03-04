import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { CldImage } from "next-cloudinary";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";
import { Avatar, AvatarProps, Box, Skeleton } from "@chakra-ui/react";
import type { RenderPhotoProps } from "react-photo-album";

import { getBasePath, ImageProps } from "@/app/utils/cloudinary";
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
}) => (
  <Box boxSize={`${boxSize}px`} ml={ml} mr={mr}>
    <CldImage
      src={`flags/${countryCode.toLowerCase()}`}
      alt={countryCode}
      title={COUNTRIES[countryCode]}
      width={64}
      height={64}
      quality={100}
    />
  </Box>
);

export const AvatarImage = ({
  memberId,
  ...rest
}: {
  memberId: string;
} & AvatarProps) => (
  <Avatar
    src={`${getBasePath(
      "image/upload"
    )}/f_auto,q_100,h_150,w_150/v1/members/${memberId}`}
    {...rest}
  ></Avatar>
);

export const GalleryThumbnailImage = ({
  trip,
  image,
}: {
  trip: TripProps;
  image: ImageProps;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton isLoaded={isLoaded}>
      <CldImage
        src={image.public_id}
        alt={trip.title}
        width={480}
        height={360}
        sizes="(max-width: 22em) 50vw, (max-width: 30em) 50vw, (max-width: 48em) 33vw, 25vw"
        crop="fill"
        gravity="center"
        priority
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </Skeleton>
  );
};

export const AlbumThumbnailImage: React.FC<
  RenderPhotoProps<ImageProps & { src: string }>
> = ({ photo, imageProps: { onClick }, wrapperStyle, layout }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box
      key={photo.asset_id}
      style={{ ...wrapperStyle }}
      _hover={{
        cursor: "pointer",
        opacity: "0.85",
      }}
    >
      <Skeleton isLoaded={isLoaded}>
        <CldImage
          src={photo.public_id}
          alt={photo.public_id}
          width={Math.ceil(layout.width)}
          height={Math.ceil(layout.height)}
          crop="fill"
          gravity="center"
          priority
          onLoadingComplete={() => setIsLoaded(true)}
          onClick={onClick}
        />
      </Skeleton>
    </Box>
  );
};

export const LightboxImage = (
  image: SlideImage,
  _: number,
  rect: ContainerRect
): React.ReactNode => {
  if (!image.width || !image.height) return null;

  const width = Math.round(
    Math.min(rect.width, (rect.height / image.height) * image.width)
  );
  const height = Math.round(
    Math.min(rect.height, (rect.width / image.width) * image.height)
  );

  return (
    <Box position="relative" width={width} height={height}>
      <Image
        src={image as StaticImageData}
        alt="lightbox"
        fill
        loading="eager"
        sizes={
          typeof window !== "undefined"
            ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
            : `${width}px`
        }
      />
    </Box>
  );
};
