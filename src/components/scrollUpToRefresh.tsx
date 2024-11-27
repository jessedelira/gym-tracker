import React, { useEffect, useState } from "react";

interface ScrollUpRefreshProps {
  onRefresh: () => Promise<void>; // A callback function that returns a Promise
}

const ScrollUpRefresh: React.FC<ScrollUpRefreshProps> = ({ onRefresh }) => {
  const [startY, setStartY] = useState<number>(0); // Starting Y position
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        if (e.touches[0]) {
          setStartY(e.touches[0].pageY);
        }
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;

      const currentY = e.touches[0]?.pageY ?? 0;
      const pullDistance = currentY - startY;

      if (pullDistance > 50) { // Example threshold for visual feedback
        document.body.style.transform = `translateY(${pullDistance / 2}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (isPulling) {
        setIsPulling(false);
        document.body.style.transform = ""; // Reset the transform

        if (startY && window.scrollY === 0) {
          setIsRefreshing(true);

          // Trigger refresh action
          void onRefresh()
            .finally(() => setIsRefreshing(false));
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startY, isPulling, onRefresh]);

  return (
    <div>
      {isRefreshing && <div className="refresh-indicator">Refreshing...</div>}
    </div>
  );
};

export default ScrollUpRefresh;
