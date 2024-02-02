"use client";

import { useState } from "react";
import { Card, CardBody, Flex } from "@chakra-ui/react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Alert from "@/app/components/Alert";
import { LightboxImage, AlbumImage } from "@/app/components/Image";
import { Blob } from "@/app/utils/types";

export const PhotoalbumImages = ({ images }: { images: Blob[] }) => {
  const slides = images.map(({ url, pathname }) => ({
    src: url,
    alt: pathname,
  }));

  const [index, setIndex] = useState(-1);
  const handleClick = (i: number) => setIndex(i);

  return (
    <>
      <Flex gap={1.5}>
        {images.map(({ url, pathname }, i) => (
          <AlbumImage
            key={pathname}
            pathname={pathname}
            src={url}
            onClick={() => handleClick(i)}
          />
        ))}
      </Flex>

      <Lightbox
        index={index}
        slides={slides}
        render={{ slide: LightboxImage }}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
};

const Photoalbum = ({ images }: { images: Blob[] }) => {
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
