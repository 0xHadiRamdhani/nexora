'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/components/layout/language-provider';
import { DeviceMorph } from './device-morph';
import { SectionSwarm } from '@/components/motion/section-swarm';
import { CtaLink } from '@/components/motion/hover';

const ease = [0.22, 1, 0.36, 1] as const;

const step = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      {/* Idea: the swarm rebuilds into a lightbulb behind the device demo */}
      <SectionSwarm shape="idea" className="absolute -right-8 top-14 -z-10 hidden size-[360px] sm:block lg:size-[440px]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p style={step(0)} className="animate-rise text-sm font-semibold text-muted-foreground">
            {t.hero.tagline}
          </p>

          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.4rem]">
            <span style={step(1)} className="animate-rise block">
              {t.hero.title1}
            </span>
            <span style={step(2)} className="animate-rise block text-brand">
              {t.hero.title2}
            </span>
          </h1>

          <p style={step(3)} className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.hero.description}
          </p>

          <div style={step(4)} className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink href="#contact" wrapperClassName="w-full sm:w-auto">
              {t.hero.cta}
            </CtaLink>
            <CtaLink href="#work" variant="secondary" wrapperClassName="w-full sm:w-auto">
              {t.hero.secondary}
            </CtaLink>
          </div>

          <ul style={step(5)} className="animate-rise mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {t.hero.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="size-4 text-brand" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
        >
          <DeviceMorph />
        </motion.div>
      </Container>
    </section>
  );
}
