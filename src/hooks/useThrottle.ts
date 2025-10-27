import { useCallback, useRef } from "react";

/**
 * Custom hook that throttles a function to execute at most once per specified delay
 * @param callback - The function to throttle
 * @param delay - The minimum time between function executions (in milliseconds)
 * @returns A throttled version of the callback function
 */
const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): T => {
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted.current;

      if (timeSinceLastExecution >= delay) {
        // Execute immediately if enough time has passed
        lastExecuted.current = now;
        callback(...args);
      } else {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Schedule execution for when the delay period is complete
        const remainingTime = delay - timeSinceLastExecution;
        timeoutRef.current = setTimeout(() => {
          lastExecuted.current = Date.now();
          callback(...args);
          timeoutRef.current = null;
        }, remainingTime);
      }
    },
    [callback, delay]
  );

  return throttledCallback as T;
};

export default useThrottle;
