import { useState, useEffect, useRef } from "react";

const useCountdown = (initialSeconds: number): number => {
  const [remainingTime, setRemainingTime] = useState<number>(initialSeconds);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (remainingTime > 0) {
      timeoutRef.current = window.setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        window.clearInterval(timeoutRef.current);
      }
    };
  }, [remainingTime]);

  return remainingTime;
};

export default useCountdown;
