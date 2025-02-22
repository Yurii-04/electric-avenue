import { useEffect, useRef, useState } from 'react';

type useToggleVisibilityProps = {
  initialState?: boolean;
  onClose?: () => void;
}

export const useToggleVisibility = <
  T extends HTMLElement
>({ initialState = false, onClose }: useToggleVisibilityProps = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);


    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return { isOpen, setIsOpen, containerRef };
};