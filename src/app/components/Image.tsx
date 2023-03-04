import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { CldImage } from "next-cloudinary";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";
import { Box, Skeleton } from "@chakra-ui/react";
import type { RenderPhotoProps } from "react-photo-album";

import { ImageProps } from "@/app/utils/cloudinary";
import { TripProps } from "@/data/trips";

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
