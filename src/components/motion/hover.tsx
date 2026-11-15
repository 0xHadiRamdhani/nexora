'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';

/*
  Hover effects only react to a real mouse (pointerType === 'mouse'),
  so touch screens never get stuck in a half-hovered state, and they
  switch off for people who ask for reduced motion.
*/

const isMouse = (e: React.PointerEvent) => e.pointerType === 'mouse';

/** Letters roll up one by one and are replaced by a copy from below. Parent needs `group`. */
export function RollText({ children, className }: { children: string; className?: string }) {
  const chars = Array.from(children);
  const row = (hidden: boolean) =>
    chars.map((c, i) => (
      <span
        key={i}
        aria-hidden={hidden || undefined}
        className={cn(
          'inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          hidden ? 'translate-y-full group-hover:translate-y-0' : 'group-hover:-translate-y-full'
        )}
        style={{ transitionDelay: `${i * 18}ms` }}
      >
        {c === ' ' ? ' ' : c}
      </span>
    ));

  return (
    <span className={cn('relative inline-flex overflow-hidden', className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="inline-flex">{row(false)}</span>
      <span aria-hidden className="absolute inset-0 inline-flex">{row(true)}</span>
    </span>
  );
}

/** Pulls its child toward the cursor while hovered, then springs back. */
export function Magnetic({ children, strength = 0.25, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.3 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !isMouse(e) || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={cn('inline-flex', className)}>
      {children}
    </motion.div>
  );
}

type CtaProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  children: string;
  wrapperClassName?: string;
};

/**
 * Pill link: magnetic pull, a fill that rises from the bottom,
 * and the label rolling to a fresh copy.
 */
export function CtaLink({ variant = 'primary', size = 'lg', className, wrapperClassName, children, ...props }: CtaProps) {
  const primary = variant === 'primary';
  return (
    <Magnetic className={wrapperClassName}>
      <a
        {...props}
        className={cn(
          'group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full font-bold transition-[color,border-color,box-shadow] duration-300',
          size === 'lg' ? 'h-13 px-8 text-base' : 'h-10 px-5 text-sm',
          primary
            ? 'bg-accent text-accent-foreground hover:text-background hover:shadow-[0_14px_30px_-12px_var(--accent)]'
            : 'border border-border text-foreground hover:border-foreground hover:text-background',
          className
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 rounded-[inherit] bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 motion-reduce:transition-none"
        />
        <RollText className="relative">{children}</RollText>
      </a>
    </Magnetic>
  );
}

/** Tracks the cursor inside an element as CSS vars --mx / --my, for spotlight gradients. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const onPointerMove = React.useCallback((e: React.PointerEvent) => {
    if (!isMouse(e) || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return { ref, onPointerMove };
}

/** Card tilts toward the cursor in 3D with a soft glare following it. */
export function TiltCard({ children, className, max = 14 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.4 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), transparent 55%)`;

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !isMouse(e) || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn('group/tilt relative', className)}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}
