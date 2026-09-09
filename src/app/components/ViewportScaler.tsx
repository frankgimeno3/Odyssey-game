"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export default function ViewportScaler({
  children,
}: {
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isPrinter = pathname === "/printer" || pathname.startsWith("/printer/");

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
  }, [isPrinter]);

  if (isPrinter) {
    return <div className="fixed inset-0 overflow-auto bg-gray-100 print:static print:overflow-visible">{children}</div>;
  }

  return (
    <div className="viewport-frame">
      <div ref={canvasRef} className="viewport-canvas">
        {children}
      </div>
    </div>
  );
}
