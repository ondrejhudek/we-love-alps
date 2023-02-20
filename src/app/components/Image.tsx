import Image, { StaticImageData } from "next/image";
import { Box } from "@chakra-ui/react";
import { ThumbnailImageProps } from "react-grid-gallery";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";

export const ThumbnailImage = (props: ThumbnailImageProps) => (
  <Box
    _hover={{
      cursor: "pointer",
      opacity: "0.85",
    }}
  >
    <Image
      src={props.imageProps.src}
      fill
      alt={props.imageProps.alt}
      sizes="180px"
      style={{ objectFit: "cover" }}
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
