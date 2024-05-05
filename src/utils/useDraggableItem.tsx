import React, { useRef, useState, useEffect } from "react";

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
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (isDragging && draggableItemRef.current) {
        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
        const deltaX = clientX - initialPosition.x;
        const deltaY = clientY - initialPosition.y;
        setPosition({
          x: position.x + deltaX,
          y: position.y + deltaY,
        });
        setInitialPosition({ x: clientX, y: clientY });
      }
    };

    const handleStart = (event: MouseEvent | TouchEvent) => {
      if (draggableItemRef.current) {
        setIsDragging(true);
        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
        setInitialPosition({ x: clientX, y: clientY });
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
  }, [isDragging, initialPosition, position]);

  return [draggableItemRef, position];
};

export default useDraggableItem;
