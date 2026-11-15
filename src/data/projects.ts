import type { Project } from '@/types';

const unsplash = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const projects: Project[] = [
  {
    id: 'workshop_manager',
    name: 'Workshop Manager',
    category: 'mobile',
    description: {
      en: 'A mobile app for running workshop operations and tracking tasks across the team.',
      id: 'Aplikasi mobile untuk mengelola operasional bengkel dan memantau tugas tim.',
    },
    technologies: ['Flutter', 'Dart'],
    image: unsplash('photo-1504328345606-18bbc8c9d7d1'),
    link: 'https://github.com/0xHadiRamdhani/workshop_manager',
  },
  {
    id: 'CodeCraftersNewVersion',
    name: 'CodeCrafters',
    category: 'mobile',
    description: {
      en: 'The rebuilt CodeCrafters platform, redesigned for a smoother mobile experience.',
      id: 'Platform CodeCrafters versi baru, didesain ulang untuk pengalaman mobile yang lebih mulus.',
    },
    technologies: ['Flutter', 'Dart'],
    image: unsplash('photo-1555066931-4365d14bab8c'),
    link: 'https://github.com/0xHadiRamdhani/CodeCraftersNewVersion',
  },
  {
    id: 'sbm-ticketing-app',
    name: 'SBM Ticketing',
    category: 'mobile',
    description: {
      en: 'A ticketing app for booking seats and managing events from a phone.',
      id: 'Aplikasi tiket untuk memesan kursi dan mengelola acara langsung dari HP.',
    },
    technologies: ['Flutter', 'Dart'],
    image: unsplash('photo-1514525253161-7a46d19cd819'),
    link: 'https://github.com/0xHadiRamdhani/sbm-ticketing-app',
  },
  {
    id: 'imphnen-online-tools',
    name: 'IMPHNEN Online Tools',
    category: 'web',
    description: {
      en: 'A collection of browser-based utilities built with Next.js and TypeScript.',
      id: 'Kumpulan utilitas berbasis browser yang dibangun dengan Next.js dan TypeScript.',
    },
    technologies: ['Next.js', 'React', 'TypeScript'],
    image: unsplash('photo-1461749280684-dccba630e2f6'),
    link: 'https://github.com/0xHadiRamdhani/imphnen-online-tools',
  },
  {
    id: 'imphnen-tools-mobile',
    name: 'IMPHNEN Tools Mobile',
    category: 'mobile',
    description: {
      en: 'The same everyday utilities, packaged as a mobile app.',
      id: 'Utilitas sehari-hari yang sama, dikemas sebagai aplikasi mobile.',
    },
    technologies: ['Flutter', 'Dart'],
    image: unsplash('photo-1526498460520-4c246339dccb'),
    link: 'https://github.com/0xHadiRamdhani/imphnen-tools-mobile',
  },
  {
    id: 'Ai-Manuver-Scanner',
    name: 'AI Manuver Scanner',
    category: 'ios',
    description: {
      en: 'An AI-powered scanner built natively for iPhone in Swift.',
      id: 'Scanner berbasis AI yang dibangun native untuk iPhone dengan Swift.',
    },
    technologies: ['Swift', 'iOS', 'AI'],
    image: unsplash('photo-1677442136019-21780ecad995'),
    link: 'https://github.com/0xHadiRamdhani/Ai-Manuver-Scanner',
  },
];
