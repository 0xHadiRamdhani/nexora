'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Check, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/components/layout/language-provider';
import { cn } from '@/lib/utils';
import { useSpotlight } from '@/components/motion/hover';
import { SectionSwarm } from '@/components/motion/section-swarm';

const ease = [0.22, 1, 0.36, 1] as const;

type ArticleProps = Omit<React.ComponentProps<typeof motion.article>, 'children'> & { dark: boolean; children: React.ReactNode };

/** Card that lifts on hover and lights up under the cursor. */
function SpotlightArticle({ dark, children, ...props }: ArticleProps) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();
  return (
    <motion.article ref={ref} onPointerMove={onPointerMove} whileHover={{ y: -8 }} {...props}>
      <span
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={dark ? ({ '--spot': 'color-mix(in oklab, var(--accent) 22%, transparent)' } as React.CSSProperties) : undefined}
      />
      {children}
    </motion.article>
  );
}

export function Services() {
  const { t } = useLanguage();
  const s = t.services;

  const flagships = [
    { ...s.web, Icon: Globe, dark: false },
    { ...s.mobile, Icon: Smartphone, dark: true },
  ];

  return (
    <section id="services" className="relative isolate py-24 lg:py-32">
      <SectionSwarm shape="devices" className="absolute right-[3%] top-14 -z-10 hidden h-[280px] w-[400px] lg:block" />
      <Container>
        <SectionHeading label={s.label} title={s.title} description={s.description} />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {flagships.map(({ title, description, features, tags, Icon, dark }, i) => (
            <SpotlightArticle
              key={title}
              dark={dark}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-xl border p-7 transition-[border-color] duration-300 sm:p-10',
                dark ? 'border-transparent bg-navy text-white hover:border-accent/40 dark:bg-muted' : 'border-border bg-surface hover:border-brand/40'
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <span
                  className={cn(
                    'grid size-12 place-items-center rounded-lg transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110',
                    dark ? 'bg-accent text-accent-foreground' : 'bg-brand text-brand-foreground'
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className={cn('text-sm font-bold tabular-nums', dark ? 'text-white/50' : 'text-muted-foreground')}>0{i + 1}</span>
              </div>

              <h3 className="mt-10 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
              <p className={cn('mt-3 max-w-md leading-relaxed', dark ? 'text-white/75' : 'text-muted-foreground')}>{description}</p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm font-medium transition-transform duration-300 hover:translate-x-1">
                    <Check className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-accent' : 'text-brand')} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <div className={cn('mt-10 flex flex-wrap gap-2 border-t pt-6', dark ? 'border-white/15' : 'border-border')}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn('rounded-md px-2.5 py-1 text-xs font-semibold transition-colors', dark ? 'bg-white/10 text-white/85 hover:bg-accent hover:text-accent-foreground' : 'bg-muted text-muted-foreground hover:bg-brand hover:text-brand-foreground')}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightArticle>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[220px_1fr]">
          <p className="text-sm font-semibold text-muted-foreground">{s.otherTitle}</p>
          <ul className="border-t border-border">
            {s.others.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="border-b border-border"
              >
                <a
                  href="#contact"
                  className="group relative isolate grid gap-1 overflow-hidden py-6 sm:grid-cols-[1fr_1.4fr_auto] sm:items-baseline sm:gap-8"
                >
                  {/* fill sweeps in from the left */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-muted transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <h3 className="text-xl font-bold tracking-tight transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    {item.description}
                  </p>
                  <span className="hidden size-10 place-items-center self-center rounded-full border border-border transition-all duration-500 group-hover:-rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground sm:mr-4 sm:grid">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
