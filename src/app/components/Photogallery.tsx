"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { GalleryThumbnailImage } from "@/app/components/Image";
import { Trip } from "@/app/utils/types";
import { PHOTO_CS } from "@/app/utils/locales";

const GALLERY_SIZES: Record<string, number> = {
  "2023-passo-del-tonale": 15,
  "2022-kitzbuhel": 3,
  "2020-schladming": 2,
  "2019-kronplatz": 17,
  "2018-solden": 13,
  "2017-sella-ronda": 19,
  "2016-zell-am-see": 27,
  "2015-passo-del-tonale": 8,
  "2015-les-sybelles": 1,
  "2013-aprica": 36,
  "2011-tauplitz": 11,
  "2009-ponte-di-legno": 13,
  "2008-lienz": 5,
};

const GalleryFolder = ({
  id,
  title,
  year,
  total,
  onClick,
}: {
  id: string;
  title: string;
  year: number;
  total: number;
  onClick: (id: string) => void;
}) => {
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      role="group"
      _hover={{
        cursor: "pointer",
      }}
      onClick={() => onClick(id)}
    >
      {/* Album thumbnail */}
      <Box
        position="relative"
        height={220}
        borderRadius={16}
        boxShadow="base"
        overflow="hidden"
        _groupHover={{
          boxShadow: "outline",
        }}
      >
        <GalleryThumbnailImage filename={`${id}/img_1`} />
      </Box>

      <Box py={3}>
        {/* Title */}
        <Heading as="h2" display="flex" alignItems="baseline" fontSize="lg">
          {title}
        </Heading>
        {/* Year & photo count */}
        <Text color={subtitleColor} fontSize="xs">
          {year}&nbsp;&nbsp;·&nbsp;&nbsp;{total}{" "}
          {PHOTO_CS[total] || PHOTO_CS[5]}
        </Text>
      </Box>
    </Box>
  );
};

const Gallery = ({ tripsData }: { tripsData: Trip[] }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/photo/${id}`);
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, xs: 2, sm: 3, md: 4 }}
        spacing={{ base: 3, sm: 4, lg: 5 }}
      >
        {tripsData.map(({ id, title, year }) => (
          <GalleryFolder
            key={id}
            id={id}
            title={title}
            year={year}
            total={GALLERY_SIZES[id]}
            onClick={handleClick}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Gallery;
