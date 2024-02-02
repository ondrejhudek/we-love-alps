"use client";

import Container from "@/app/components/Container";
import { PhotoalbumImages } from "@/app/components/Photoalbum2";
import { Blob } from "@/app/utils/types";

const PhotoComponent = ({ id, images }: { id: string; images: Blob[] }) => {
  if (!images.length) return null;

  return (
    <Container
      title="Foto"
      count={images.length}
      button={{
        label: "Všechny fotky",
        href: `/photo/${id}`,
      }}
    >
      <PhotoalbumImages images={images} />
    </Container>
  );
};

export default PhotoComponent;
