import Image, { StaticImageData } from "next/image";
import { CldImage } from "next-cloudinary";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";
import { Box } from "@chakra-ui/react";
import type { RenderPhotoProps } from "react-photo-album";

import { ImageProps } from "@/app/utils/cloudinary";

// const THUMBNAIL_HEIGHT = 180;

export const NextJsImage: React.FC<RenderPhotoProps<ImageProps>> = ({
  photo,
  imageProps: { width, height, className, onClick },
  wrapperStyle,
  layout,
}) => {
  console.log({
    photo,
    imageProps: { width, height, className, onClick },
    wrapperStyle,
    layout,
  });
  return (
    <Box key={photo.asset_id} style={wrapperStyle}>
      <Box
        display="block"
        position="relative"
        width="full"
        height="full"
        _hover={{
          cursor: "pointer",
          opacity: "0.85",
        }}
      >
        <CldImage
          src={photo.public_id}
          alt={photo.public_id}
          width={layout.width}
          height={layout.height}
          // fill
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // sizes="50vw"
          // priority
          // fill
          // className={className}
          onClick={onClick}
        />
      </Box>
    </Box>
  );
};

// export const CldThumbnailImage = (image: ThumbnailImageProps) => {
//   console.log("image", image);
//   return (
//     <Box
//       // position="relative"
//       // height={`${THUMBNAIL_HEIGHT}px`}
//       _hover={{
//         cursor: "pointer",
//         opacity: "0.85",
//       }}
//     >
//       <CldImage
//         src={image.imageProps.src}
//         alt={image.imageProps.alt}
//         priority
//         width={THUMBNAIL_HEIGHT}
//         height={THUMBNAIL_HEIGHT}
//         // fill
//         // sizes={THUMBNAIL_HEIGHT}
//         style={{ objectFit: "cover" }}
//       />
//     </Box>
//   );
// };

// export const ThumbnailImage = (props: ThumbnailImageProps) => (
//   <Box
//     _hover={{
//       cursor: "pointer",
//       opacity: "0.85",
//     }}
//   >
//     <Image
//       src={props.imageProps.src}
//       fill
//       alt={props.imageProps.alt}
//       sizes="180px"
//       style={{ objectFit: "cover" }}
//     />
//   </Box>
// );

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
