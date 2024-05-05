import React, { memo, useEffect, useMemo, useState } from "react";
import "./Image.css";

type Props = {
  src: string;
  width?: string;
  maxWidth?: string;
  isRounded?: boolean;
};

type ImagePreloadResult = {
  isLoaded: boolean;
  isError: boolean;
  height?: number;
  width?: number;
};

const loadedImageSrcs: {
  [src: string]: {
    width: number;
    height: number;
  };
} = {};

function usePreloadImage(src: string): ImagePreloadResult {
  const [result, setResult] = useState<ImagePreloadResult>({
    isLoaded: loadedImageSrcs[src] != null,
    isError: false,
    height: loadedImageSrcs[src]?.height,
    width: loadedImageSrcs[src]?.width,
  });

  useEffect(() => {
    const isAlreadyLoaded = loadedImageSrcs[src] != null;

    if (isAlreadyLoaded) {
      return () => {};
    }

    const image = document.createElement("img");
    const onLoad = () => {
      loadedImageSrcs[src] = { height: image.height, width: image.width };

      setResult((state) => ({
        ...state,
        height: image.height,
        width: image.width,
        isLoaded: true,
      }));
    };
    const onError = () => {
      setResult((state) => ({ ...state, isError: true }));
    };

    image.addEventListener("load", onLoad);
    image.addEventListener("error", onError);
    image.src = src;

    return () => {
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);
    };
  }, [src]);

  return result;
}

const maybePixelString = (n?: number): string | undefined => {
  return n == null ? undefined : `${n}px`;
};

function Image({
  src,
  // By default, width is the smaller of the image's maximum native width or
  // the available space in the parent element.
  width,
  maxWidth = "100%",
  isRounded = false,
}: Props) {
  const {
    isLoaded,
    isError,
    width: nativeWidth,
    height,
  } = usePreloadImage(src);
  const [isImageShown, setIsImageShown] = useState<boolean>(isLoaded);
  const aspectRatio =
    height != null && nativeWidth != null ? height / nativeWidth : null;

  const style = useMemo(
    () => ({
      width: "100%",
      paddingBottom: aspectRatio == null ? undefined : `${aspectRatio * 100}%`,
      backgroundImage: isImageShown ? `url(${src})` : undefined,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: isRounded ? "0.5rem" : undefined,
    }),
    [src, isImageShown, aspectRatio, isRounded]
  );

  const classList = ["image-loading"];
  if (isImageShown) {
    classList.push("image-loaded");
  }
  if (isError) {
    classList.push("image-error");
  }

  return (
    <div
      style={{
        width: width ?? maybePixelString(nativeWidth),
        maxWidth,
      }}
    >
      <div
        onAnimationIteration={() => {
          if (isLoaded) {
            setIsImageShown(true);
          }
        }}
        className={classList.join(" ")}
        style={style}
      />
    </div>
  );
}

export default memo(Image);
