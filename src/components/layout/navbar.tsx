'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { CtaLink } from '@/components/motion/hover';
import { useLanguage } from '@/components/layout/language-provider';
import type { Language } from '@/lib/translations';

function LanguageSwitch({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div role="group" aria-label="Language" className={cn('flex items-center rounded-full border border-border p-0.5', className)}>
      {(['id', 'en'] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={cn(
            'relative rounded-full px-2.5 py-1 text-xs font-bold uppercase transition-colors',
            language === lang ? 'text-background' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {language === lang && (
            <motion.span
              layoutId={`lang-pill-${className ?? ''}`}
              className="absolute inset-0 rounded-full bg-foreground"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative">{lang}</span>
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={label}
      className="group grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Sun className="size-[18px] transition-transform duration-500 group-hover:rotate-90 dark:hidden" />
      <Moon className="hidden size-[18px] transition-transform duration-500 group-hover:-rotate-[20deg] dark:block" />
    </button>
  );
}

const subscribeNoop = () => () => {};

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  // true only on the client, so theme/language controls never mismatch SSR
  const mounted = React.useSyncExternalStore(subscribeNoop, () => true, () => false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12));

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.team, href: '#team' },
    { name: t.nav.faq, href: '#faq' },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        scrolled || open ? 'border-b border-border bg-background/85 backdrop-blur-md' : 'border-b border-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#home" className="group text-lg font-extrabold tracking-tight" onClick={() => setOpen(false)}>
            Nexora
            <span className="inline-block text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6">Lab</span>
            Studio
          </a>

          {/* A single pill slides between links on hover instead of each link lighting up on its own */}
          <nav className="hidden items-center md:flex" aria-label="Main" onPointerLeave={() => setHovered(null)}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onPointerEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-full bg-muted"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {mounted && <LanguageSwitch className="desktop" />}
            {mounted && <ThemeToggle label={t.nav.toggleTheme} />}
            <CtaLink href="#contact" size="md">
              {t.nav.startProject}
            </CtaLink>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            {mounted && <ThemeToggle label={t.nav.toggleTheme} />}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="grid size-10 place-items-center rounded-full hover:bg-muted"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-brand" aria-hidden />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <Container className="pb-6 pt-2">
              <nav className="flex flex-col" aria-label="Mobile">
                {[...links, { name: t.nav.contact, href: '#contact' }].map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="border-b border-border py-3.5 text-lg font-semibold"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-5 flex items-center justify-between">
                {mounted && <LanguageSwitch className="mobile" />}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
