'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2.5rem] overflow-hidden bg-zinc-800/90 backdrop-blur-3xl border border-zinc-700/50 shadow-2xl shadow-black/10"
        >
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-20" style={{ maskImage: 'linear-gradient(to bottom, white, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)' }} />
          
          {/* Animated Floating Blobs */}
          <motion.div 
            animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" 
          />
          <motion.div 
            animate={{ x: [0, -30, 30, 0], y: [0, 30, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" 
          />
          
          <div className="relative z-10 px-6 py-20 sm:px-16 sm:py-28 text-center flex flex-col items-center">
            {/* Shimmer Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-900/50 border border-zinc-600/50 text-white text-sm font-semibold mb-8 backdrop-blur-md overflow-hidden"
            >
              <motion.div 
                animate={{ x: ["-100%", "200%"] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
              />
              <Sparkles className="relative z-10 w-4 h-4 text-white" />
              <span className="relative z-10">Ready to start?</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-3xl mx-auto leading-[1.1] pb-2">
              Have an Idea? <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
                Let&apos;s Build It.
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us what you&apos;re building and let&apos;s turn your idea into a real, scalable digital product.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto group h-14 px-8 text-base rounded-2xl bg-white text-black hover:bg-zinc-200 hover:text-black shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300" asChild>
                <a href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-zinc-900/50 text-white border-zinc-600 backdrop-blur-md hover:bg-zinc-800 hover:text-white rounded-2xl hover:scale-105 transition-all duration-300" asChild>
                <a href="mailto:hello@nexoralabstudio.com">Contact Us</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
