'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** 'inverse' for sections on the navy band */
  tone?: 'default' | 'inverse';
  className?: string;
}

export function SectionHeading({ label, title, description, align = 'left', tone = 'default', className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      <p className={cn('text-sm font-semibold', tone === 'inverse' ? 'text-accent' : 'text-brand')}>{label}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', tone === 'inverse' ? 'text-white/70' : 'text-muted-foreground')}>{description}</p>}
    </motion.div>
  );
}
