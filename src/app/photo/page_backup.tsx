"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// import { buildUrl } from "cloudinary-build-url";
// import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
// import { thumbnail } from "@cloudinary/url-gen/actions/resize";
// import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

// import { CldImage } from "next-cloudinary";

import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Header from "@/app/components/Header";
// import { getImagePath, PHOTO_CS } from "@/app/components/utils";

import PHOTOS from "@/data/photos";
import TRIPS from "@/data/trips";

const CLOUD_NAME = "ddnasijv8";
const API_KEY = "654692679597748";
const API_SECRET = "MkutsvsFPXRZqpJD81PW2xrmp20";

const getData = async () => {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(API_KEY + ":" + API_SECRET),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  console.log("res", res);
  return res.json();
};

export default async function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const data = await getData();
  console.log("data", data);

  // const url = buildUrl(
  //   "v1676814271/2023-passo-del-tonale/IMG_0422_kp6cwy.jpg",
  //   {
  //     cloud: {
  //       cloudName: "ddnasijv8",
  //     },
  //     transformations: {
  //       resize: {
  //         width: 500,
  //       },
  //     },
  //   }
  // );

  // const urlBlurred = buildUrl(
  //   "v1676814271/2023-passo-del-tonale/IMG_0422_kp6cwy.jpg",
  //   {
  //     cloud: {
  //       cloudName: "ddnasijv8",
  //     },
  //     transformations: {
  //       resize: {
  //         width: 375,
  //         height: 500,
  //       },
  //       effect: { name: "blur:100" },
  //       quality: 5,
  //     },
  //   }
  // );

  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: "ddnasijv8",
  //   },
  // });

  // const hovno = cld.image("2023-passo-del-tonale/IMG_0422_kp6cwy.jpg"); // Apply the transformation.
  // hovno
  //   .resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))) // Crop the image, focusing on the face.
  //   .roundCorners(byRadius(20)); // Round the corners.

  const handleClick = (id: string) => {
    router.push(`/photo/${id}`);
  };

  return (
    <>
      {/* <Header pathname={pathname} /> */}

      <SimpleGrid
        columns={{ base: 1, xs: 2, sm: 3, md: 4 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {Object.keys(PHOTOS).map((key) => {
          const trip = TRIPS.find(({ id }) => id === key);
          if (!trip || PHOTOS[key].length === 0) return null;

          return (
            <Box
              key={key}
              role="group"
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => handleClick(key)}
            >
              {/* Album thumbnail */}
              {/* <AspectRatio
                position="relative"
                borderRadius="lg"
                boxShadow="base"
                overflow="hidden"
                _groupHover={{
                  boxShadow: "outline",
                }}
              >
                <Image
                  src={getImagePath(key, "0.jpg")}
                  alt={trip.title}
                  fill
                  sizes="300px"
                  style={{ objectFit: "cover" }}
                />
              </AspectRatio> */}

              <Box py={3}>
                {/* Title */}
                <Heading
                  as="h2"
                  display="flex"
                  alignItems="baseline"
                  fontSize="lg"
                >
                  {trip.title}
                </Heading>
                {/* Year & photo count */}
                <Text color={subtitleColor} fontSize="xs">
                  {trip.year}&nbsp;&nbsp;·&nbsp;&nbsp;{PHOTOS[key].length}{" "}
                  {/* {PHOTO_CS[PHOTOS[key].length] || PHOTO_CS[5]} */}
                </Text>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>

      {data.total_count}

      {data.resources.map((r: any) => (
        <p key={r.asset_id}>{r.public_id}</p>
      ))}

      {/* <Box width="375px" height="500px">
        <Box
          position="relative"
          height={0}
          pt={`${(500 / 375) * 100}%`}
          bgImage={`url(${urlBlurred})`}
          bgPosition="center center"
          bgSize="100%"
        >
          <Box position="absolute" top={0} left={0}>
            <Image
              src={url}
              alt="Galaxy"
              width={375}
              height={500}
              unoptimized={true}
            />
          </Box>
        </Box>
      </Box> */}

      {/* <AdvancedImage cldImg={hovno} /> */}

      {/* <p>CldImage</p>
      <CldImage
        width="375"
        height="500"
        src="2023-passo-del-tonale/IMG_0422_kp6cwy.jpg"
        alt="Description of my image"
      /> */}
    </>
  );
}

// export default Page;
