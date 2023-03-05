import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { CldImage } from "next-cloudinary";
import { SlideImage, ContainerRect } from "yet-another-react-lightbox";
import type { RenderPhotoProps } from "react-photo-album";
import { Box, BoxProps, Skeleton, useColorModeValue } from "@chakra-ui/react";

import { ImageProps } from "@/app/utils/cloudinary";
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
  return (
    <Box boxSize={`${boxSize}px`} ml={ml} mr={mr}>
      <Image
        src={`/images/flags/${countryCode.toLowerCase()}.png`}
        alt={countryCode}
        title={COUNTRIES[countryCode]}
        width={64}
        height={64}
        quality={100}
      />
    </Box>
  );
};

// export const FlagImage = ({
//   countryCode,
//   boxSize = 20,
//   ml,
//   mr,
// }: {
//   countryCode: string;
//   boxSize?: number;
//   ml?: number;
//   mr?: number;
// }) => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   return (
//     <Box boxSize={`${boxSize}px`} ml={ml} mr={mr}>
//       <Skeleton isLoaded={isLoaded} borderRadius="full">
//         <CldImage
//           src={`flags/${countryCode.toLowerCase()}`}
//           alt={countryCode}
//           title={COUNTRIES[countryCode]}
//           width={64}
//           height={64}
//           quality={100}
//           onLoadingComplete={() => {
//             setIsLoaded(true);
//           }}
//         />
//       </Skeleton>
//     </Box>
//   );
// };

export const AvatarImage = ({
  id,
  name,
  ...boxRest
}: {
  id: string;
  name: string;
} & BoxProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box borderRadius="full" overflow="hidden" {...boxRest}>
      <Skeleton isLoaded={isLoaded}>
        <CldImage
          src={`members/${id}`}
          alt={name}
          width={150}
          height={150}
          quality={100}
          onLoadingComplete={() => {
            setIsLoaded(true);
          }}
        />
      </Skeleton>
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
  const [isLoaded, setIsLoaded] = useState(false);

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
      <Skeleton isLoaded={isLoaded}>
        <CldImage
          src={`resorts/${id}`}
          alt={name}
          width={260}
          height={260}
          quality={100}
          onLoadingComplete={() => {
            setIsLoaded(true);
          }}
        />
      </Skeleton>
    </Box>
  );
};

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
        onLoadingComplete={() => {
          setIsLoaded(true);
        }}
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
          onLoadingComplete={() => {
            setIsLoaded(true);
          }}
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
