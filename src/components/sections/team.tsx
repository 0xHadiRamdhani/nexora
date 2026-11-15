'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { TiltCard } from '@/components/motion/hover';
import { SectionSwarm } from '@/components/motion/section-swarm';
import { useLanguage } from '@/components/layout/language-provider';

const teamMembers = [
  { name: 'Hadi', image: '/images/founders/hadi.PNG', w: 1009, h: 1559 },
  { name: 'Keysha', image: '/images/founders/keysha.PNG', w: 1024, h: 1536 },
  { name: 'Aris', image: '/images/founders/aris.JPG', w: 662, h: 1024 },
  { name: 'Akbar', image: '/images/founders/akbar.png', w: 832, h: 1286 },
];

// Cards start stacked like a deck on a desk, then deal out into a row.
const stacked = [
  { x: '75%', rotate: -10 },
  { x: '25%', rotate: -3 },
  { x: '-25%', rotate: 4 },
  { x: '-75%', rotate: 11 },
];
const dealt = [-4, 2, -2, 4];

export function Team() {
  const { t } = useLanguage();
  const tm = t.team;

  return (
    <section id="team" className="relative isolate overflow-hidden bg-navy py-24 text-white lg:py-32 dark:bg-surface">
      <SectionSwarm shape="team" accentShare={0.75} className="absolute right-[4%] top-4 -z-10 hidden h-[190px] w-[320px] lg:block" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading
            label={tm.label}
            title={tm.title}
            description={tm.description}
            tone="inverse"
          />
          <ul className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {tm.principles.map((pr) => (
              <li key={pr.title} className="group relative border-t border-white/20 pt-4">
                <span aria-hidden className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <h3 className="font-bold">{pr.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{pr.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {teamMembers.map((m, i) => (
            <motion.figure
              key={m.name}
              initial={{ opacity: 0, y: 80, ...stacked[i] }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotate: dealt[i] }}
              whileHover={{ rotate: 0, y: -18, scale: 1.04, zIndex: 10 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 16, delay: i * 0.06 }}
              className="relative"
            >
              {/* lanyard clip */}
              <span aria-hidden className="mx-auto block h-5 w-10 rounded-t-md border-x-2 border-t-2 border-white/30" />
              <TiltCard className="rounded-lg">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={m.w}
                  height={m.h}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="h-auto w-full rounded-lg shadow-[0_24px_40px_-16px_rgba(0,0,0,0.6)] transition-shadow duration-500 group-hover/tilt:shadow-[0_40px_60px_-20px_rgba(0,0,0,0.75)]"
                />
              </TiltCard>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
