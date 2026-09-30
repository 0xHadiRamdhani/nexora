'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { technologies } from '@/data/technologies';

export function Technologies() {
  return (
    <section className="py-24 bg-secondary/30 border-y border-border/50 overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Built With Modern Technology</h2>
          <p className="text-lg text-muted-foreground">
            We use the right tools for the job, ensuring performance, scale, and maintainability.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-background border border-border text-foreground font-medium shadow-sm hover:border-accent/50 hover:text-accent transition-colors cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
