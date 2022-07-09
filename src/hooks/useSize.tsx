import { useEffect, useState } from "react";

export interface IContentRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export default function useSize(ref: any) {
  const [size, setSize] = useState<IContentRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    if (ref.current == null) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize(entry.contentRect)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
