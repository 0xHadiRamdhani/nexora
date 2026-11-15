'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/components/layout/language-provider';
import { cn } from '@/lib/utils';
import { SectionSwarm } from '@/components/motion/section-swarm';

export function Faq() {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState<number | null>(0);
  const baseId = React.useId();

  return (
    <section id="faq" className="py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading label={t.faq.label} title={t.faq.title} />
          <SectionSwarm shape="question" className="relative mt-10 hidden aspect-square w-full max-w-[280px] lg:block" />
        </div>

        <ul className="border-t border-border">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <li key={item.q} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold tracking-tight transition-colors hover:text-brand"
                  >
                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      whileHover={{ scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      className={cn(
                        'grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                        isOpen
                          ? 'border-brand bg-brand text-brand-foreground'
                          : 'border-border group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground'
                      )}
                    >
                      <Plus className="size-4" aria-hidden />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
