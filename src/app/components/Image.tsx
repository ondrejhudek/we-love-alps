import Image, { StaticImageData } from "next/image";
import { CldImage } from "next-cloudinary";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";
import { Box } from "@chakra-ui/react";
import type { RenderPhotoProps } from "react-photo-album";

import { ImageProps } from "@/app/utils/cloudinary";
import { TripProps } from "@/data/trips";

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
    width={640}
    height={Math.ceil(640 / image.aspect_ratio)}
    crop="fill"
    rawTransformations={["c_fill,w_320,ar_4:3"]}
    priority
    style={{ objectFit: "cover" }}
  />
);

export const AlbumThumbnailImage: React.FC<RenderPhotoProps<ImageProps>> = ({
  photo,
  imageProps: { onClick },
  wrapperStyle,
  layout,
}) => (
  <Box
    key={photo.asset_id}
    style={wrapperStyle}
    _hover={{
      cursor: "pointer",
      opacity: "0.85",
    }}
  >
    <CldImage
      src={photo.public_id}
      alt={photo.public_id}
      width={Math.ceil(layout.width)}
      height={Math.ceil(layout.height)}
      crop="scale"
      priority
      onClick={onClick}
    />
  </Box>
);

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
