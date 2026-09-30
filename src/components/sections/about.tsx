'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              We Turn Ideas Into Digital Products.
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                NexoraLabStudio is a digital product development studio focused on creating modern, scalable and meaningful digital experiences.
              </p>
              <p>
                We help startups, established businesses, organizations, and individuals transform their ideas into functional products that users love and businesses can scale. 
                Our approach combines rigorous engineering with thoughtful design.
              </p>
            </div>
            <div className="pt-4">
              <Button variant="outline" size="lg">Learn More About Us</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-secondary relative border border-border/50">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-accent opacity-20 blur-[100px]" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[340px] h-[320px] max-w-full border border-zinc-800 rounded-xl bg-[#1e1e1e]/90 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden"
                >
                  {/* Mac Window Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/90" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
                    <div className="w-3 h-3 rounded-full bg-green-500/90" />
                    <div className="ml-4 text-[11px] text-zinc-500 font-mono tracking-wider">main.dart</div>
                  </div>
                  {/* Flutter Code Snippet (One Dark Pro Theme) */}
                  <div className="flex-1 flex flex-col justify-center p-6 text-[12px] sm:text-[13px] font-mono leading-relaxed text-left overflow-hidden">
                    <div>
                      <span className="text-[#c678dd]">import</span>{' '}
                      <span className="text-[#98c379]">'package:flutter/material.dart'</span><span className="text-zinc-300">;</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-[#c678dd]">class</span>{' '}
                      <span className="text-[#e5c07b]">NexoraApp</span>{' '}
                      <span className="text-[#c678dd]">extends</span>{' '}
                      <span className="text-[#e5c07b]">StatelessWidget</span> <span className="text-zinc-300">{'{'}</span>
                    </div>
                    <div className="pl-4 mt-1">
                      <span className="text-[#56b6c2]">@override</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#e5c07b]">Widget</span>{' '}
                      <span className="text-[#61afef]">build</span><span className="text-zinc-300">(</span><span className="text-[#e5c07b]">BuildContext</span> <span className="text-[#e06c75]">context</span><span className="text-zinc-300">) {'{'}</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-[#c678dd]">return</span> <span className="text-[#61afef]">MaterialApp</span><span className="text-zinc-300">(</span>
                    </div>
                    <div className="pl-12">
                      <span className="text-[#e06c75]">home:</span> <span className="text-[#61afef]">Scaffold</span><span className="text-zinc-300">(</span>
                    </div>
                    <div className="pl-16">
                      <span className="text-[#e06c75]">body:</span> <span className="text-[#61afef]">Center</span><span className="text-zinc-300">(...)</span>
                    </div>
                    <div className="pl-12 text-zinc-300">),</div>
                    <div className="pl-8 text-zinc-300">);</div>
                    <div className="pl-4 text-zinc-300">{'}'}</div>
                    <div className="text-zinc-300">{'}'}</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
