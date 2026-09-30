'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/container';

const steps = [
  {
    num: '01',
    title: 'Discover',
    description: 'Understand your business, users, goals and requirements deeply before writing a single line of code.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Create user flows, wireframes and high-fidelity interfaces that look beautiful and are easy to use.',
  },
  {
    num: '03',
    title: 'Develop',
    description: 'Build the product using modern technologies, clean code, and scalable architecture.',
  },
  {
    num: '04',
    title: 'Test',
    description: 'Rigorously test functionality, performance, responsiveness, and usability across devices.',
  },
  {
    num: '05',
    title: 'Launch',
    description: 'Deploy the product securely and provide ongoing support to ensure long-term success.',
  },
];

export function Process() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">From Idea to Launch</h2>
          <p className="text-lg text-muted-foreground">
            Our battle-tested development process ensures we deliver high-quality products on time.
          </p>
        </div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Animated Progress Line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-border/50 hidden md:block">
            <motion.div 
              className="absolute top-0 w-full bg-accent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-12"
              >
                <div className="flex-shrink-0 flex items-center md:items-start gap-4 md:w-24">
                  <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center font-bold text-lg text-foreground relative z-10 md:bg-background">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold md:hidden">{step.title}</h3>
                </div>
                
                <div className="pt-2 md:pt-4">
                  <h3 className="text-2xl font-bold hidden md:block mb-2">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
