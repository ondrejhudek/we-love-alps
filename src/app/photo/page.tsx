"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Header from "@/app/components/Header";
import { getImagePath, PHOTO_CS } from "@/app/components/utils";

import PHOTOS from "@/data/photos";
import TRIPS from "@/data/trips";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const handleClick = (id: string) => {
    router.push(`/photo/${id}`);
  };

  return (
    <>
      <Header pathname={pathname} />

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
              <AspectRatio
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
              </AspectRatio>

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
                  {PHOTO_CS[PHOTOS[key].length] || PHOTO_CS[5]}
                </Text>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default Page;
