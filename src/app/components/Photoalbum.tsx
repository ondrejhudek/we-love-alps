"use client";

import { useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Alert from "@/app/components/Alert";
import { AlbumThumbnailImage, LightboxImage } from "@/app/components/Image";
import { ImageProps } from "@/app/cloudinary/types";

const Album = ({ images }: { images: ImageProps[] }) => {
  const [index, setIndex] = useState(-1);
  const handleClick = (i: number) => setIndex(i);

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

  const photos = images.map((image) => ({
    ...image,
    src: image.url,
  }));

  return (
    <Card>
      <CardBody p={3}>
        <PhotoAlbum
          layout="rows"
          spacing={5}
          targetRowHeight={180}
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
      </CardBody>
    </Card>
  );
};

export default Album;
