'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Swarm, SHAPES, type ShapeName } from '@/lib/swarm';
import { cn } from '@/lib/utils';

interface SectionSwarmProps {
  shape: ShapeName;
  /** position and size of the swarm box; set `hidden lg:block` etc. to limit breakpoints */
  className?: string;
  accentShare?: number;
  density?: number;
}

/**
 * A particle swarm that rebuilds into `shape` every time its section scrolls
 * into view, and scatters away from the cursor anywhere in that section.
 * Decorative only: hidden from assistive tech and never takes pointer events.
 */
export function SectionSwarm({ shape, className, accentShare, density }: SectionSwarmProps) {
  const reduce = useReducedMotion() ?? false;
  const boxRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;

    const swarm = new Swarm(canvas, { shape: SHAPES[shape], reduced: reduce, accentShare, density });

    const readTheme = () => {
      const root = getComputedStyle(document.documentElement);
      swarm.setColors(
        root.getPropertyValue('--brand').trim() || '#1653f0',
        root.getPropertyValue('--accent').trim() || '#14c8d4',
        getComputedStyle(document.body).fontFamily
      );
    };
    const fit = () => {
      const r = box.getBoundingClientRect();
      swarm.resize(r.width, r.height);
    };
    readTheme();
    fit();
    // the wordmark is rasterised from the web font, so re-sample once it has loaded
    document.fonts.ready.then(readTheme);

    const ro = new ResizeObserver(fit);
    ro.observe(box);
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Rebuild on the way in; scatter (unseen) on the way out, so the next visit rebuilds again.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          swarm.setVisible(true);
          swarm.rebuild();
        } else {
          swarm.setVisible(false);
          swarm.scatter();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(box);

    // Listen on the whole section so the cursor can push particles from anywhere nearby.
    const host = (box.closest('section, footer') as HTMLElement | null) ?? box.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const reach = 160;
      if (x < -reach || y < -reach || x > r.width + reach || y > r.height + reach) swarm.pointerLeave();
      else swarm.pointer(x, y);
    };
    const onLeave = () => swarm.pointerLeave();
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointercancel', onLeave);

    return () => {
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointercancel', onLeave);
      swarm.destroy();
    };
  }, [shape, reduce, accentShare, density]);

  return (
    <div ref={boxRef} aria-hidden className={cn('pointer-events-none', className)}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
