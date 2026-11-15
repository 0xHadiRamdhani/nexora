'use client';

import * as React from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/components/layout/language-provider';
import { cn } from '@/lib/utils';
import { SectionSwarm } from '@/components/motion/section-swarm';

export function Process() {
  const { t } = useLanguage();
  const p = t.process;
  const [active, setActive] = React.useState(0);
  const listRef = React.useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] });

  return (
    <section id="process" className="relative isolate py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading label={p.label} title={p.title} description={p.description} />

          {/* Large step counter, desktop only: the list carries the numbers on mobile */}
          <div className="relative mt-12 hidden items-end gap-4 lg:flex" aria-hidden>
            <SectionSwarm shape="rocket" className="absolute bottom-0 right-0 -z-10 size-[160px]" />
            <div className="relative h-[9rem] w-[11rem] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                  className="absolute inset-0 text-[9rem] font-extrabold leading-none tracking-tighter text-brand tabular-nums"
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="pb-4 text-2xl font-bold text-muted-foreground">/ 0{p.steps.length}</span>
          </div>
        </div>

        <ol ref={listRef} className="relative">
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-0.5 bg-border" />
          <motion.span
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-6 left-[19px] top-6 w-0.5 origin-top bg-brand"
          />
          {p.steps.map((step, i) => (
            <motion.li
              key={step.title}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: '-45% 0px -45% 0px' }}
              className="relative grid grid-cols-[40px_1fr] gap-5 pb-14 last:pb-0"
            >
              <span
                className={cn(
                  'relative z-10 grid size-10 place-items-center rounded-full border-2 text-sm font-bold tabular-nums transition-colors duration-300',
                  i <= active ? 'border-brand bg-brand text-brand-foreground' : 'border-border bg-background text-muted-foreground'
                )}
              >
                {i + 1}
              </span>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn('pt-1 transition-opacity duration-300', i === active ? 'lg:opacity-100' : 'lg:opacity-50')}
              >
                <h3 className="text-2xl font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">{step.description}</p>
                <p className="mt-4 inline-flex flex-wrap items-baseline gap-x-2 rounded-lg bg-surface px-4 py-3 text-sm ring-1 ring-border">
                  <span className="font-semibold text-muted-foreground">{p.deliverableLabel}:</span>
                  <span className="font-bold">{step.deliverable}</span>
                </p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
