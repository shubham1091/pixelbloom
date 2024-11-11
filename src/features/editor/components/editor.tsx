"use client";
import { useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/use-editor";
import { loadFabric } from "../utils/loadFabric";

export const Editor = () => {
  const { init } = useEditor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canvas: fabric.Canvas | null = null;

    const initializeCanvas = async () => {
      try {
        if (!canvasRef.current || !containerRef.current) {
          throw new Error("Canvas or container refs not initialized");
        }

        const fabric = await loadFabric();
        if (!fabric) {
          throw new Error("Failed to load Fabric.js");
        }

        canvas = new fabric.Canvas(canvasRef.current, {
          controlsAboveOverlay: true,
          preserveObjectStacking: true,
        });

        await init({
          initialCanvas: canvas,
          initialContainer: containerRef.current,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize canvas");
      }
    };

    initializeCanvas();

    // Cleanup function
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [init]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div ref={containerRef} className="flex-1 h-full bg-muted">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
