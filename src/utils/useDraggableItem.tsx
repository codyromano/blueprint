import React from "react";

import { useRef, useState, useEffect, MouseEvent } from "react";

interface Position {
  x: number;
  y: number;
}

const useDraggableItem = (): [React.RefObject<HTMLDivElement>, Position] => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const draggableItemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [initialPosition, setInitialPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && draggableItemRef.current) {
        const deltaX = event.clientX - initialPosition.x;
        const deltaY = event.clientY - initialPosition.y;
        setPosition({
          x: position.x + deltaX,
          y: position.y + deltaY,
        });
        setInitialPosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (draggableItemRef.current) {
        setIsDragging(true);
        setInitialPosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    draggableItemRef?.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      draggableItemRef?.current?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, initialPosition, position]);

  return [draggableItemRef, position];
};

export default useDraggableItem;
