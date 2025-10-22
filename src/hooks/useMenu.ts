import { useCallback, useEffect, useRef } from "react";

interface UseMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UseMenuReturn {
  getMenuRef: (
    isActive: boolean
  ) => React.RefObject<HTMLDivElement | null> | null;
}

/**
 * Custom hook to handle menu click-outside functionality
 * @param isOpen - Whether any menu is currently open
 * @param onClose - Function to call when clicking outside the menu
 * @returns Object containing getMenuRef helper function
 */
export const useMenu = ({ isOpen, onClose }: UseMenuProps): UseMenuReturn => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Helper function to conditionally return the ref
  const getMenuRef = useCallback((isActive: boolean) => {
    if (isActive) {
      return menuRef;
    }
    return null;
  }, []);

  return { getMenuRef };
};

export default useMenu;
