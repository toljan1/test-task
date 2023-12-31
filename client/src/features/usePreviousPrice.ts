import { MutableRefObject, useEffect, useRef } from "react";

export const usePreviousPrice = (value: number): boolean => {
  const ref: MutableRefObject<number | undefined> = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  if (ref.current && ref.current > value) {
    return false;
  }
  return true;
};