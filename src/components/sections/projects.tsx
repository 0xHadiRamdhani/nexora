'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useVelocity, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/components/layout/language-provider';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import { SectionSwarm } from '@/components/motion/section-swarm';

const ease = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();
  const [hover, setHover] = React.useState(false);

  // cursor disc: follows the pointer and leans into the direction of travel
  const cx = useSpring(0, { stiffness: 350, damping: 28, mass: 0.5 });
  const cy = useSpring(0, { stiffness: 350, damping: 28, mass: 0.5 });
  const lean = useTransform(useVelocity(cx), [-1500, 0, 1500], [-25, 0, 25], { clamp: true });

  // photo drifts a little against the cursor for depth
  const px = useSpring(0, { stiffness: 120, damping: 20 });
  const py = useSpring(0, { stiffness: 120, damping: 20 });

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
    if (!reduce) {
      px.set((0.5 - x / r.width) * 24);
      py.set((0.5 - y / r.height) * 24);
    }
  };

  const onLeave = () => {
    setHover(false);
    px.set(0);
    py.set(0);
  };

  const ring = `${t.work.viewCode} · ${t.work.viewCode} · ${t.work.viewCode} · `;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/card flex w-full shrink-0 flex-col transition-[opacity,filter] duration-500 md:w-[440px] lg:w-[480px] md:[.card-track:has(a:hover)_&:not(:hover)]:opacity-45 md:[.card-track:has(a:hover)_&:not(:hover)]:saturate-0`}
    >
      <div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-muted transition-[clip-path] duration-700 ${ease} [clip-path:inset(0_round_0.75rem)] group-hover/card:[clip-path:inset(12px_round_1.4rem)] motion-reduce:transition-none ${reduce ? '' : 'md:cursor-none'}`}
      >
        {/* oversized so the parallax drift never shows an edge */}
        <motion.div style={{ x: px, y: py }} className="absolute -inset-[5%]">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className={`object-cover transition-[transform,filter] duration-700 ${ease} group-hover/card:scale-[1.1] group-hover/card:saturate-[1.2]`}
          />
        </motion.div>

        <span
          className={`absolute left-4 top-4 rounded-md bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground transition-[background-color,color,transform] duration-500 ${ease} group-hover/card:translate-x-2 group-hover/card:translate-y-2 group-hover/card:bg-accent group-hover/card:text-accent-foreground`}
        >
          {t.work.categories[project.category]}
        </span>

        {/* navy wash from the bottom, with the stack rising in chip by chip */}
        <span aria-hidden className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
        <ul aria-hidden className="absolute inset-x-6 bottom-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech, i) => (
            <li
              key={tech}
              style={{ transitionDelay: `${120 + i * 70}ms` }}
              className={`translate-y-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-[transform,opacity] duration-500 ${ease} group-hover/card:translate-y-0 group-hover/card:opacity-100`}
            >
              {tech}
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {hover && !reduce && (
            <motion.span
              aria-hidden
              style={{ x: cx, y: cy, rotate: lean }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="pointer-events-none absolute left-0 top-0 -ml-14 -mt-14 grid size-28 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
            >
              {/* label running around the edge, turning while the disc is out */}
              <svg viewBox="0 0 112 112" className="absolute inset-0 size-full animate-[spin_9s_linear_infinite] motion-reduce:animate-none">
                <defs>
                  <path id={`ring-${project.id}`} d="M56 56m-41 0a41 41 0 1 1 82 0a41 41 0 1 1-82 0" />
                </defs>
                <text className="fill-current text-[10.5px] font-bold">
                  <textPath href={`#ring-${project.id}`} textLength="257" lengthAdjust="spacing">
                    {ring}
                  </textPath>
                </text>
              </svg>
              <motion.span initial={{ rotate: -90 }} animate={{ rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
                <ArrowUpRight className="size-7" />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>

        {/* keyboard users get a static badge instead of the cursor disc */}
        <span className="absolute bottom-4 right-4 hidden size-11 place-items-center rounded-full bg-accent text-accent-foreground group-focus-visible/card:grid">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-sm font-bold tabular-nums text-muted-foreground transition-colors duration-300 group-hover/card:text-brand">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="flex items-center gap-1.5 text-xl font-extrabold tracking-tight">
          <span className="link-sweep pb-0.5 transition-colors group-hover/card:bg-[length:100%_1.5px] group-hover/card:text-brand">{project.name}</span>
          <ArrowUpRight
            aria-hidden
            className={`size-5 -translate-x-2 translate-y-1 text-brand opacity-0 transition-[transform,opacity] duration-500 ${ease} group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100`}
          />
        </h3>
      </div>
      <p className={`mt-2 leading-relaxed text-muted-foreground transition-transform duration-500 ${ease} md:group-hover/card:translate-x-1`}>
        {project.description[language]}
      </p>
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
        <motion.div ref={trackRef} style={{ x }} className="card-track flex w-max gap-8 px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
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
