"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Header from "@/app/components/Header";
import { getImagePath } from "@/app/components/utils";

import PHOTOS from "@/data/photos";
import TRIPS from "@/data/trips";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const yearColor = useColorModeValue("gray.600", "gray.300");
  const countColor = useColorModeValue("gray.600", "gray.400");
  const overlayBg = useColorModeValue("whiteAlpha.800", "blackAlpha.800");

  const handleClick = (id: string) => {
    router.push(`/photo/${id}`);
  };

  return (
    <>
      <Header pathname={pathname} />

      {/* <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {Object.keys(PHOTOS).map((key) => {
          const trip = TRIPS.find(({ id }) => id === key);
          if (!trip) return null;

          return (
            <Card
              key={key}
              _hover={{
                cursor: "pointer",
                boxShadow: "outline",
              }}
              onClick={() => handleClick(key)}
            >
              <CardBody
                display="block"
                flex="none"
                position="relative"
                height={48}
                overflow="hidden"
                borderTopRadius="var(--card-radius)"
              >
                <Image
                  src={getImagePath(key, "0.jpg")}
                  alt={trip.title}
                  fill
                  sizes="300px"
                  style={{ objectFit: "cover" }}
                />
              </CardBody>
              <CardFooter display="block" py={4}>
                <Heading
                  as="h2"
                  display="flex"
                  alignItems="baseline"
                  fontSize="md"
                >
                  {trip.title}

                  <Text color={yearColor} fontSize="sm" fontWeight={400} ml={1}>
                    · {trip.year}
                  </Text>
                </Heading>
                <Text color="gray.500" fontSize="xs">
                  {PHOTOS[key].length} fotek
                </Text>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid> */}

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {Object.keys(PHOTOS).map((key) => {
          const trip = TRIPS.find(({ id }) => id === key);
          if (!trip) return null;

          return (
            <Box key={key}>
              <AspectRatio
                borderRadius={4}
                boxShadow="base"
                overflow="hidden"
                _hover={{
                  cursor: "pointer",
                  boxShadow: "outline",
                }}
                onClick={() => handleClick(key)}
              >
                <Box position="relative">
                  <Image
                    src={getImagePath(key, "0.jpg")}
                    alt={trip.title}
                    fill
                    sizes="300px"
                    style={{ objectFit: "cover" }}
                  />
                </Box>

                {/* <Box
position="absolute"
bottom={0}
width="100%"
py={2}
px={3}
bgColor={overlayBg}
>
<Heading
  as="h2"
  display="flex"
  alignItems="baseline"
  fontSize="md"
>
  {trip.title}

  <Text
    color={yearColor}
    fontSize="sm"
    fontWeight={400}
    ml={1}
  >
    · {trip.year}
  </Text>
</Heading>
<Text color={countColor} fontSize="xs">
  {PHOTOS[key].length} fotek
</Text>
</Box> */}
              </AspectRatio>

              <Box py={2}>
                <Heading
                  as="h2"
                  display="flex"
                  alignItems="baseline"
                  fontSize="md"
                >
                  {trip.title}

                  <Text color={yearColor} fontSize="sm" fontWeight={400} ml={1}>
                    · {trip.year}
                  </Text>
                </Heading>
                <Text color={countColor} fontSize="xs">
                  {PHOTOS[key].length} fotek
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
