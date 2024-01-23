"use client";

import { useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Alert from "@/app/components/Alert";
import { AlbumThumbnailImage, LightboxImage } from "@/app/components/Image";
import { ImageProps } from "@/app/cloudinary/types";

export const PhotoalbumImages = ({ images }: { images: ImageProps[] }) => {
  const photos = images.map((image) => ({
    ...image,
    src: image.url,
  }));

  const [index, setIndex] = useState(-1);
  const handleClick = (i: number) => setIndex(i);

  return (
    <>
      <PhotoAlbum
        layout="rows"
        spacing={5}
        rowConstraints={{
          singleRowMaxHeight: 200,
        }}
        photos={photos}
        renderPhoto={AlbumThumbnailImage}
        onClick={({ index }) => handleClick(index)}
      />

      <Lightbox
        index={index}
        slides={photos}
        render={{ slide: LightboxImage }}
        open={index >= 0}
        close={() => setIndex(-1)}
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
