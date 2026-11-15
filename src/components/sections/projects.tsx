'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/components/layout/language-provider';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import { SectionSwarm } from '@/components/motion/section-swarm';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();
  const [hover, setHover] = React.useState(false);
  // "View code" bubble trails the cursor across the image
  const cx = useSpring(0, { stiffness: 350, damping: 28, mass: 0.5 });
  const cy = useSpring(0, { stiffness: 350, damping: 28, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (!hover) {
      cx.jump(x);
      cy.jump(y);
      setHover(true);
    } else {
      cx.set(x);
      cy.set(y);
    }
  };

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full shrink-0 flex-col md:w-[440px] lg:w-[480px]"
    >
      <div
        onPointerMove={onMove}
        onPointerLeave={() => setHover(false)}
        className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-muted ${reduce ? '' : 'md:cursor-none'}`}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:saturate-[1.15]"
        />
        <span className="absolute left-4 top-4 rounded-md bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground">
          {t.work.categories[project.category]}
        </span>
        {/* darkens from the bottom so the bubble always reads */}
        <span aria-hidden className="absolute inset-0 bg-linear-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <AnimatePresence>
          {hover && !reduce && (
            <motion.span
              aria-hidden
              style={{ x: cx, y: cy }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="pointer-events-none absolute left-0 top-0 -ml-12 -mt-12 grid size-24 place-items-center rounded-full bg-accent text-center text-xs font-bold leading-tight text-accent-foreground"
            >
              <span className="flex flex-col items-center gap-0.5">
                <ArrowUpRight className="size-5" />
                {t.work.viewCode}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
        {/* keyboard users get a static badge instead of the cursor bubble */}
        <span className="absolute bottom-4 right-4 hidden size-11 place-items-center rounded-full bg-accent text-accent-foreground group-focus-visible:grid">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </div>
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-sm font-bold tabular-nums text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-xl font-extrabold tracking-tight">
          <span className="link-sweep pb-0.5 transition-colors group-hover:bg-[length:100%_1.5px] group-hover:text-brand">{project.name}</span>
        </h3>
      </div>
      <p className="mt-2 leading-relaxed text-muted-foreground">{project.description[language]}</p>
      <p className="mt-3 text-sm font-semibold">
        {project.technologies.join(' · ')}
        <span className="sr-only"> — {t.work.viewCode}</span>
      </p>
    </a>
  );
}

/** Desktop: vertical scroll drives a horizontal track while the section is pinned. */
function HorizontalTrack() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [distance, setDistance] = React.useState(0);

  React.useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={sectionRef} className="relative hidden md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-8 px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>
        <Container className="mt-10">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div style={{ width: bar }} className="h-full bg-brand" />
          </div>
        </Container>
      </div>
    </div>
  );
}

export function Projects() {
  const { t } = useLanguage();
  return (
    <section id="work" className="relative isolate border-y border-border bg-surface pt-24 lg:pt-32">
      <SectionSwarm shape="code" className="absolute right-[3%] top-12 -z-10 hidden h-[260px] w-[380px] lg:block" />
      <Container>
        <SectionHeading label={t.work.label} title={t.work.title} description={t.work.description} />
      </Container>

      <HorizontalTrack />

      <Container className="grid gap-12 py-14 md:hidden">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <ProjectCard project={p} index={i} />
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
