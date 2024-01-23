"use client";

import Container from "@/app/components/Container";
import { PhotoalbumImages } from "@/app/components/Photoalbum";
import { ImageProps } from "@/app/cloudinary/types";

const PhotoComponent = ({
  id,
  images,
}: {
  id: string;
  images: ImageProps[];
}) => {
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
      <PhotoalbumImages images={images.slice(0, 5)} />
    </Container>
  );
};

export default PhotoComponent;
