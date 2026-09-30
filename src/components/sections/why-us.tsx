'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Target, Zap, ShieldCheck, HeartHandshake, Code2, LineChart } from 'lucide-react';

const reasons = [
  {
    title: 'Built Around Your Goals',
    description: "We don't just write code. We understand the problem first to deliver a solution that matches your business objectives.",
    icon: Target,
  },
  {
    title: 'Modern Technology',
    description: 'We use the latest technologies and development practices to ensure your product is fast, secure, and future-proof.',
    icon: Code2,
  },
  {
    title: 'Scalable Architecture',
    description: 'Applications are designed to grow with your business, handling increased load and complexity effortlessly.',
    icon: LineChart,
  },
  {
    title: 'Performance First',
    description: 'Fast, responsive and optimized experiences. We care deeply about loading speeds and smooth interactions.',
    icon: Zap,
  },
  {
    title: 'Transparent Process',
    description: 'Clear communication throughout the development process. You always know what we are building and when.',
    icon: ShieldCheck,
  },
  {
    title: 'Long-Term Partnership',
    description: 'We can continue supporting, maintaining, and improving your product long after the initial launch.',
    icon: HeartHandshake,
  },
];

export function WhyUs() {
  return (
    <section className="py-24 bg-secondary/30 border-y border-border/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Why NexoraLabStudio?</h2>
          <p className="text-lg text-muted-foreground">
            We combine technical excellence with strategic thinking to build products that succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-background border border-border/50 hover:border-accent/30 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                <reason.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
