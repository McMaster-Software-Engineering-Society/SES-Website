import React, { useMemo, useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import clsx from 'clsx';
import type { DomeGalleryProps, ImageItem } from './types';

// Helper to clamp values
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Compute radius basis given container size and basis mode
function getBasis(width: number, height: number, fitBasis: DomeGalleryProps['fitBasis'] = 'auto') {
  switch (fitBasis) {
    case 'width':
      return width;
    case 'height':
      return height;
    case 'min':
      return Math.min(width, height);
    case 'max':
      return Math.max(width, height);
    case 'auto':
    default:
      return Math.min(width, height);
  }
}

// Compute item positions on a semi-circular dome (top half)
function computeLayout(
  images: ImageItem[],
  container: { width: number; height: number },
  opts: Required<Pick<DomeGalleryProps, 'fit' | 'fitBasis' | 'minRadius' | 'maxRadius' | 'padFactor'>>
) {
  const { fit, fitBasis, minRadius, maxRadius, padFactor } = opts;
  const basis = getBasis(container.width, container.height, fitBasis);
  const padded = basis * clamp(padFactor, 0, 0.9);
  const radius = clamp(padded, minRadius, maxRadius);

  // Approximate item size s.t. `fit` items span the arc horizontally
  const itemSize = Math.max(40, Math.floor((2 * radius) / fit));
  const n = images.length;
  const startAngle = Math.PI; // 180deg (left)
  const endAngle = 0; // 0deg (right)
  const angleStep = n > 1 ? (endAngle - startAngle) / (n - 1) : 0;

  const centerX = container.width / 2;
  const centerY = radius + 8; // slight offset to keep inside container

  const items = images.map((img, i) => {
    const angle = startAngle + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY - radius * Math.sin(angle);
    // Depth for simple z layering (middle/front gets higher z)
    const depth = Math.sin(angle); // 0..1 over the arc
    const scale = 0.85 + 0.25 * depth; // slight scale for perspective
    return { img, x, y, angle, size: itemSize, depth, scale };
  });

  // Sort by y (or depth) so front-most renders last (higher z)
  const ordered = [...items].sort((a, b) => a.depth - b.depth);
  return { radius, itemSize, items, ordered, centerX, centerY };
}

export function DomeGallery({
  images = [],
  fit = 6,
  fitBasis = 'auto',
  minRadius = 140,
  maxRadius = 420,
  padFactor = 0.9,
  className,
  ariaLabel = 'Dome image gallery',
}: DomeGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState(0); // simple horizontal drag offset

  // Gesture handling: allow panning horizontally to nudge items
  useGesture(
    {
      onDrag: ({ offset: [ox] }) => setDrag(ox),
      onWheel: ({ offset: [, oy] }) => setDrag((d) => d + oy),
    },
    { target: containerRef, eventOptions: { passive: true } }
  );

  const layout = useMemo(() => {
    const bounds = containerRef.current?.getBoundingClientRect();
    const width = Math.floor(bounds?.width ?? 0);
    const height = Math.floor(bounds?.height ?? 0);
    return computeLayout(
      images,
      { width: Math.max(300, width), height: Math.max(220, height) },
      { fit, fitBasis, minRadius, maxRadius, padFactor }
    );
  }, [images, fit, fitBasis, minRadius, maxRadius, padFactor]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className={clsx(
        'relative w-full max-w-full overflow-hidden select-none',
        'rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur',
        'p-4 sm:p-6',
        className
      )}
      style={{ minHeight: Math.max(240, layout.radius + 40) }}
    >
      {/* Arc guide (optional visual) */}
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox={`0 0 ${Math.max(300, layout.centerX * 2)} ${Math.max(220, layout.centerY + layout.radius)}`}
        aria-hidden="true"
      >
        <path
          d={`M ${layout.centerX - layout.radius},${layout.centerY} A ${layout.radius},${layout.radius} 0 0 1 ${
            layout.centerX + layout.radius
          },${layout.centerY}`}
          fill="none"
          stroke="currentColor"
          opacity={0.08}
        />
      </svg>

      {/* Items */}
      <div className="relative">
        {layout.ordered.map((it, idx) => {
          const translateX = it.x - it.size / 2 + drag * 0.15; // gentle drag influence
          const translateY = it.y - it.size / 2;
          return (
            <div
              key={`${it.img.src}-${idx}`}
              className={clsx(
                'absolute shadow-md rounded-lg overflow-hidden',
                'transition-transform duration-300 ease-out will-change-transform'
              )}
              style={{
                width: it.size,
                height: it.size,
                transform: `translate(${translateX}px, ${translateY}px) scale(${it.scale})`,
                zIndex: 10 + Math.round(it.depth * 100),
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.img.src}
                alt={it.img.alt ?? ''}
                className="h-full w-full object-cover"
                draggable={false}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* Subtle hint */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500/70">
        Drag or scroll to pan
      </div>
    </div>
  );
}

export default DomeGallery;
