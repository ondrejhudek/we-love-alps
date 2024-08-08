"use client";

import { useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Alert from "@/app/components/Alert";
import { AlbumThumbnailImage } from "@/app/components/Image";
import type { PhotoalbumImage } from "@/app/components/Image";
import { ImageProps } from "@/app/cloudinary/types";

const IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const nextImageUrl = (src: string, size: number) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;

export const PhotoalbumImages = ({ images }: { images: ImageProps[] }) => {
  const photos: PhotoalbumImage[] = images.map((image) => ({
    ...image,
    src: image.url,
  }));

  const slides = photos.map(({ src, width, height }) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    srcSet: IMAGE_SIZES.concat(...DEVICE_SIZES)
      .filter((size) => size <= width)
      .map((size) => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  const [index, setIndex] = useState(-1);
  const handleClick = (i: number) => setIndex(i);

  return (
    <>
      <RowsPhotoAlbum
        spacing={5}
        rowConstraints={{
          singleRowMaxHeight: 200,
        }}
        photos={photos}
        render={{
          image: AlbumThumbnailImage,
        }}
        onClick={({ index }) => handleClick(index)}
      />

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Zoom]}
        zoom={{
          scrollToZoom: true,
        }}
      />
    </>
  );
};

const Photoalbum = ({ images }: { images: ImageProps[] }) => {
  if (!images.length)
    return (
      <Alert
        status="warning"
        title="Žádné fotografie v albu."
        description="Běž zpět a vyber jiný."
        button={{
          path: "/photo",
          label: "Zpět na Fotky",
        }}
      />
    );

  return (
    <Card borderRadius={16}>
      <CardBody p={3}>
        <PhotoalbumImages images={images} />
      </CardBody>
    </Card>
  );
};

export default Photoalbum;
