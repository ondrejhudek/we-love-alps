"use client";

import { useState } from "react";
import { AspectRatio, Skeleton } from "@chakra-ui/react";

import { VideoProps } from "@/app/utils/types";

export const VideoLoading = () => (
  <Skeleton>
    <AspectRatio ratio={2} maxH="500px">
      <div>Loading</div>
    </AspectRatio>
  </Skeleton>
);

const VideoComponent = ({ data }: { data: VideoProps[] }) => {
  const id = data[0].youtubeId;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
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
  );
};

export default VideoComponent;
