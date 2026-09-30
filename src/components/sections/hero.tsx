'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
      <div className="absolute inset-0 -z-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm text-sm text-muted-foreground mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            From idea to launch — we build, ship, and scale digital products.
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            We Build Digital Products <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/50">
              That Matter.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            NexoraLabStudio helps businesses turn ideas into powerful Android apps, iOS apps, websites, and custom digital products.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" variant="premium" className="w-full sm:w-auto" asChild>
              <a href="#contact">Start a Project</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm" asChild>
              <a href="#projects">Explore Our Work</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Founders Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pt-20 md:pt-28 pb-10 flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16 w-full max-w-5xl mx-auto px-2 sm:px-4"
        >
          <div className="relative flex-1 max-w-[280px] aspect-[2/3] transition-transform hover:-translate-y-2 duration-300">
            <Image src="/images/founders/hadi.PNG" alt="Hadi" fill sizes="(max-width: 768px) 33vw, 300px" priority className="object-contain rounded-xl md:rounded-3xl drop-shadow-2xl" />
          </div>
          <div className="relative flex-1 max-w-[280px] aspect-[2/3] transition-transform hover:-translate-y-2 duration-300">
            <Image src="/images/founders/keysha.PNG" alt="Keysha" fill sizes="(max-width: 768px) 33vw, 300px" priority className="object-contain rounded-xl md:rounded-3xl drop-shadow-2xl" />
          </div>
          <div className="relative flex-1 max-w-[280px] aspect-[2/3] transition-transform hover:-translate-y-2 duration-300">
            <Image src="/images/founders/aris.JPG" alt="Aris" fill sizes="(max-width: 768px) 33vw, 300px" priority className="object-contain rounded-xl md:rounded-3xl drop-shadow-2xl" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
