"use client";

import { useEffect, useRef } from "react";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export default function ViewportScaler({
  children,
}: {
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resizeCanvas = () => {
      const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT,
      );

      canvas.style.setProperty("--viewport-scale", String(scale));
      canvas.dataset.ready = "true";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="viewport-frame">
      <div ref={canvasRef} className="viewport-canvas">
        {children}
      </div>
    </div>
  );
}
