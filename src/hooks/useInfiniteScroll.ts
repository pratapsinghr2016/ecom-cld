import { useCallback, useEffect } from "react";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  threshold?: number; // Distance from bottom in pixels to trigger load more
  isLoading?: boolean; // Prevent multiple simultaneous loads
  hasMore?: boolean; // Whether there's more content to load
}

/**
 * Custom hook to handle infinite scroll functionality using window scroll
 * @param onLoadMore - Function to call when user reaches the end
 * @param threshold - Distance from bottom in pixels to trigger load more (default: 100)
 * @param isLoading - Whether content is currently loading
 * @param hasMore - Whether there's more content to load
 */
export const useInfiniteScroll = ({
  onLoadMore,
  threshold = 100,
  isLoading = false,
  hasMore = true,
}: UseInfiniteScrollProps): void => {
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    // Calculate if user has scrolled near the bottom of the page
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const distanceFromBottom = documentHeight - scrollTop - windowHeight;

    // Trigger load more if within threshold distance from bottom
    if (distanceFromBottom <= threshold) {
      console.log("🚀 Infinite scroll triggered! Loading more content...");
      onLoadMore();
    }
  }, [onLoadMore, threshold, isLoading, hasMore]);

  useEffect(() => {
    // Add scroll event listener to window
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
};
export default useInfiniteScroll;
