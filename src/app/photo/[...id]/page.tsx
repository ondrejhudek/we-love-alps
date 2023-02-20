"use client";

import * as React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Alert from "@/app/components/Alert";
import Header from "@/app/components/Header";
import { ThumbnailImage, LightboxImage } from "@/app/components/Image";
import { getImagePath } from "@/app/components/utils";

import PHOTOS from "@/data/photos";
import TRIPS, { TripProps } from "@/data/trips";

const Photos = ({ data }: { data?: TripProps }) => {
  const [index, setIndex] = React.useState(-1);
  const handleClick = (i: number) => setIndex(i);

  if (!data)
    return (
      <Alert
        title="Toto fotogalerie neexistuje."
        description="Běž zpět a vyber jiný."
        button={{
          path: "/photo",
          label: "Zpět na Fotky",
        }}
      />
    );

  const { id } = data;

  if (!PHOTOS.hasOwnProperty(id))
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

  const photos = PHOTOS[id].map((photo) => ({
    ...photo,
    src: getImagePath(id, photo.src),
  }));

  return (
    <Card>
      <CardBody p={3}>
        <Gallery
          images={photos}
          enableImageSelection={false}
          thumbnailImageComponent={ThumbnailImage}
          onClick={(i) => handleClick(i)}
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

const Page = ({ params: { id } }: { params: { id: string[] } }) => {
  const trip = TRIPS.find((trip) => trip.id === id[0]);

  return (
    <>
      <Header pathname="/photo" name={trip?.title} />
      <Photos data={trip} />
    </>
  );
};

export default Page;
