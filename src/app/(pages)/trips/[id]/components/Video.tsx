"use client";

import { useState } from "react";
import { AspectRatio, Skeleton } from "@chakra-ui/react";

import Container from "@/app/components/Container";
import { VideoProps } from "@/app/utils/types";

const Video = ({ data }: { data: VideoProps[] }) => {
  const id = data[0].youtubeId;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Container title="Video" bodyProps={{ pt: 0, px: 0 }}>
      <Skeleton isLoaded={isLoaded} borderRadius="none">
        <AspectRatio key={id} ratio={2} maxH="500px">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </AspectRatio>
      </Skeleton>
    </Container>
  );
};

export default Video;
