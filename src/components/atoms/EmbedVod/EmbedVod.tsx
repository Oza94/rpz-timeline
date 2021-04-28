import React, { ReactNode } from "react";

interface Props {
  url: string;
  className?: string;
}

function EmbedVOD({ url, className = "" }: Props) {
  const videoId = url.split("/")[4];

  if (!videoId) {
    return null;
  }

  return (
    <iframe
      title="VOD"
      src={`https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}&autoplay=false`}
      allowFullScreen
      width="100%"
      style={{ border: "none" }}
    ></iframe>
  );
}

export default EmbedVOD;
