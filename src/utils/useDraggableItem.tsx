import React, { useRef, useState, useEffect } from "react";

export interface Position {
  x: number;
  y: number;
  vw: number;
  vh: number;
}

function pixelsToViewportUnits(x: number, y: number): { vw: number; vh: number } {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const vw = (x / viewportWidth) * 100;
  const vh = (y / viewportHeight) * 100;

  return { vw, vh };
}

function getInitialPosition(element: HTMLDivElement): Position {
  const styles = window.getComputedStyle(element);
  const left = parseInt(styles.left);
  const top = parseInt(styles.top);

  return {
    x: left,
    y: top,
    ...(pixelsToViewportUnits(left, top))
  };
}

const useDraggableItem = (): [React.RefObject<HTMLDivElement>, Position | null] => {
  const draggableItemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(null);


  useEffect(() => {
    if (draggableItemRef.current != null) {
      setPosition(getInitialPosition(draggableItemRef.current));
    }
  }, [draggableItemRef]);

  /*
  const [initialPosition, setInitialPosition] = useState<Position>({
    x: 0,
    y: 0,
    vw: 0,
    vh: 0,
  });
  */

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      if (isDragging && draggableItemRef.current) {
        const {width: styleWidth, height: styleHeight} = window.getComputedStyle(draggableItemRef.current);
        const styleWidthHalf = parseInt(styleWidth);
        const styleHeightHalf = parseInt(styleHeight) / 1.5;

        // @ts-ignore
        // console.log(styleWidthHalf, styleHeightHalf, event.clientX, event.clientY);

        const clientX = ("touches" in event ? event.touches[0].clientX : event.clientX) - styleWidthHalf;
        const clientY = "touches" in event ? event.touches[0].clientY : event.clientY - styleHeightHalf;

       // const deltaX = clientX - initialPosition.x;
       // const deltaY = clientY - initialPosition.y;

        // console.log(`Furniture.domPosition = ` + JSON.stringify(domPosition));

        // const viewportUnits = pixelsToViewportUnits(clientX, clientY);

        setPosition({
          // x: position.x + deltaX,
          // y: position.y + deltaY,
          // TODO: Remove  pixel values, no longer used
          x: clientX,
          y: clientY,
          ...pixelsToViewportUnits(clientX, clientY)
          // vh: deltaY + viewportUnits.vh - styleHeightHalf,
          // vw: deltaX + viewportUnits.vw - styleWidthHalf
        });      }
    };

    const handleStart = (event: MouseEvent | TouchEvent) => {
      // event.preventDefault();
      
      if (draggableItemRef.current) {
        setIsDragging(true);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);
    }

    draggableItemRef.current?.addEventListener("mousedown", handleStart);
    draggableItemRef.current?.addEventListener("touchstart", handleStart);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
      draggableItemRef.current?.removeEventListener("mousedown", handleStart);
      draggableItemRef.current?.removeEventListener("touchstart", handleStart);
    };
  }, [isDragging, /*initialPosition,*/ position]);

  return [draggableItemRef, position];
};

export default useDraggableItem;
