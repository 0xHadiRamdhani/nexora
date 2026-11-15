'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/components/layout/language-provider';
import { SectionSwarm } from '@/components/motion/section-swarm';

export function Stack() {
  const { t } = useLanguage();
  const s = t.stack;

  return (
    <section aria-labelledby="stack-title" className="border-b border-border py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_2fr]">
        <div>
          <p className="text-sm font-semibold text-brand">{s.label}</p>
          <h2 id="stack-title" className="mt-3 text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
            {s.title}
          </h2>
          <SectionSwarm shape="layers" className="relative mt-6 hidden h-[170px] w-[230px] lg:block" />
        </div>
        <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {s.groups.map((group, gi) => (
            <div key={group.name}>
              <dt className="border-b border-border pb-3 text-sm font-semibold text-muted-foreground">{group.name}</dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + i * 0.04, type: 'spring', stiffness: 260, damping: 20 }}
                    whileHover={{ y: -4, rotate: i % 2 ? 2 : -2, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
                    className="cursor-default rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-semibold transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-brand-foreground"
                  >
                    {item}
                  </motion.span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
