import React from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyImage({src, scrollPosition, id}) {
  const router = useRouter();
  const redirect = () => router.push(`/search/${id}`);
  return (
    <LazyLoadImage
      alt="/images/noIMG.png"
      effect="blur"
      // fills out the parent container the Lazy Image is placed inside
      height={"100%"} 
      width={"100%"}
      src={src}
      onClick={redirect} 
      scrollPosition={scrollPosition}
      style={{
        borderRadius: 14,
        gridColumn: 1 / -1,
        // Resize image without compression
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
