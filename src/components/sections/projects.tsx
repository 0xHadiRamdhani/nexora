'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { projects } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Selected Work</h2>
            <p className="text-lg text-muted-foreground">
              A glimpse of what we can build. We deliver scalable, high-performance applications.
            </p>
          </div>
          <Button variant="outline" className="w-full md:w-auto" asChild>
            <a href="https://github.com/0xHadiRamdhani" target="_blank" rel="noopener noreferrer">View All Projects</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col gap-4"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border/50">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/20" />
                
                {/* Project Image */}
                {project.image && (
                  <Image 
                    src={project.image} 
                    alt={project.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="premium" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <Badge variant="secondary" className="font-normal text-xs">{project.category}</Badge>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-xs font-medium text-foreground bg-secondary px-2 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
