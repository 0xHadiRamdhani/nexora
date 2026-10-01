'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/components/layout/language-provider';

const teamMembers = [
  { name: 'Hadi', image: '/images/founders/hadi.PNG' },
  { name: 'Keysha', image: '/images/founders/keysha.PNG' },
  { name: 'Aris', image: '/images/founders/aris.JPG' },
  { name: 'Akbar', image: '/images/founders/akbar.png' },
];

export function Team() {
  const { t } = useLanguage();
  return (
    <section id="team" className="py-24 relative overflow-hidden bg-zinc-950">
      {/* Cool Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-zinc-950 to-zinc-950" />
      <div className="absolute left-0 top-0 -z-10 h-full w-full opacity-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-sm text-accent mb-2"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            {t.team.badge}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            {t.team.title1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/50">
              {t.team.title2}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            {t.team.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 w-full max-w-6xl mx-auto px-2"
        >
          {teamMembers.map((member, idx) => (
            <div key={member.name} className="relative flex-1 max-w-[280px] aspect-[2/3] transition-all hover:-translate-y-6 duration-500 hover:scale-105 group">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-accent/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-75" />
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                sizes="(max-width: 768px) 25vw, 280px" 
                className="object-contain rounded-xl md:rounded-3xl drop-shadow-2xl relative z-10" 
              />
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
