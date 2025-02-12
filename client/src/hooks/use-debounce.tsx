import { useRef, useEffect } from 'react';

type TimerType = ReturnType<typeof setTimeout>
type CallbackType<T> = (...args: T[]) => void

export const useDebounce = <T, >(
  callback: CallbackType<T>,
  delay = 500,
): CallbackType<T> => {
  const timer = useRef<TimerType>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (...args: T[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
