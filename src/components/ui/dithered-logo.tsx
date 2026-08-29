"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  alpha: number;
}

export interface DitheredLogoProps {
  imageSrc: string;
  gridSize?: number;
  scale?: number;
  dotScale?: number;
  threshold?: number;
  particleColor?: string;
  className?: string;
  style?: CSSProperties;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function DitheredLogo({
  imageSrc,
  gridSize = 72,
  scale = 0.66,
  dotScale = 1,
  threshold = 86,
  particleColor = "currentColor",
  className,
  style,
}: DitheredLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999, down: false });
  const rafRef = useRef(0);
  const drawRef = useRef<() => void>(() => undefined);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr);
    ctx.fillStyle =
      particleColor === "currentColor" ? getComputedStyle(canvas).color : particleColor;

    let moving = false;
    for (const particle of particlesRef.current) {
      const dx = particle.x - pointerRef.current.x;
      const dy = particle.y - pointerRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = pointerRef.current.down ? 92 : 64;
      const force = distance < radius ? ((radius - distance) / radius) ** 2 * 20 : 0;
      const tx = force ? particle.x + (dx / Math.max(distance, 1)) * force : particle.ox;
      const ty = force ? particle.y + (dy / Math.max(distance, 1)) * force : particle.oy;

      particle.x += (tx - particle.x) * 0.15;
      particle.y += (ty - particle.y) * 0.15;

      if (Math.abs(particle.x - particle.ox) > 0.05 || Math.abs(particle.y - particle.oy) > 0.05) {
        moving = true;
      }

      ctx.globalAlpha = particle.alpha;
      const size = Math.max(1, 2.1 * dpr * dotScale);
      ctx.fillRect(particle.x * dpr, particle.y * dpr, size, size);
    }

    ctx.globalAlpha = 1;
    if (moving || pointerRef.current.x > -999) {
      rafRef.current = requestAnimationFrame(() => drawRef.current());
    }
  }, [dotScale, particleColor]);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  const rebuild = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));

    const image = await loadImage(imageSrc);
    const sampleCanvas = document.createElement("canvas");
    const aspect = image.naturalWidth / image.naturalHeight;
    sampleCanvas.width = aspect >= 1 ? gridSize : Math.round(gridSize * aspect);
    sampleCanvas.height = aspect >= 1 ? Math.round(gridSize / aspect) : gridSize;

    const ctx = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.drawImage(image, 0, 0, sampleCanvas.width, sampleCanvas.height);
    const pixels = ctx.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
    const dots: Particle[] = [];
    const step = 2;
    const logoSize = Math.min(rect.width, rect.height) * scale;
    const unit = logoSize / Math.max(sampleCanvas.width, sampleCanvas.height);
    const originX = (rect.width - sampleCanvas.width * unit) / 2;
    const originY = (rect.height - sampleCanvas.height * unit) / 2;

    for (let y = 0; y < sampleCanvas.height; y += step) {
      for (let x = 0; x < sampleCanvas.width; x += step) {
        const i = (y * sampleCanvas.width + x) * 4;
        const alpha = pixels[i + 3] ?? 0;
        const luma =
          0.299 * (pixels[i] ?? 0) +
          0.587 * (pixels[i + 1] ?? 0) +
          0.114 * (pixels[i + 2] ?? 0);

        if (alpha > 64 && luma < 255 - threshold) {
          const px = originX + x * unit;
          const py = originY + y * unit;
          dots.push({ x: px, y: py, ox: px, oy: py, alpha: 0.42 + Math.random() * 0.58 });
        }
      }
    }

    particlesRef.current = dots;
    draw();
  }, [draw, gridSize, imageSrc, scale, threshold]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
      rafRef.current = requestAnimationFrame(draw);
    };
    const leavePointer = () => {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
      rafRef.current = requestAnimationFrame(draw);
    };
    const downPointer = () => {
      pointerRef.current.down = true;
    };
    const upPointer = () => {
      pointerRef.current.down = false;
    };

    rebuild();
    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", updatePointer);
    canvas.addEventListener("pointerleave", leavePointer);
    canvas.addEventListener("pointerdown", downPointer);
    canvas.addEventListener("pointerup", upPointer);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerleave", leavePointer);
      canvas.removeEventListener("pointerdown", downPointer);
      canvas.removeEventListener("pointerup", upPointer);
    };
  }, [draw, rebuild]);

  return (
    <div className={cn("relative size-14 text-foreground", className)} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 block size-full touch-none" />
    </div>
  );
}

export default DitheredLogo;
