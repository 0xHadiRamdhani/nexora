'use client';

import { Container } from '@/components/ui/container';
import { useLanguage } from '@/components/layout/language-provider';
import { CONTACT_EMAIL } from '@/lib/translations';
import { SectionSwarm } from '@/components/motion/section-swarm';

export function Footer() {
  const { t } = useLanguage();
  const links = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.team, href: '#team' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#home" className="group text-xl font-extrabold tracking-tight">
            Nexora
            <span className="inline-block text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6">Lab</span>
            Studio
          </a>
          <p className="mt-2 text-sm text-muted-foreground">{t.footer.tagline}</p>
          <div className="mt-5 flex flex-col gap-1 text-sm font-semibold">
            <a href={`mailto:${CONTACT_EMAIL}`} className="link-sweep w-fit hover:text-brand">{CONTACT_EMAIL}</a>
            <a href="https://github.com/0xHadiRamdhani" target="_blank" rel="noopener noreferrer" className="link-sweep w-fit hover:text-brand">
              GitHub
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-sweep w-fit text-muted-foreground hover:text-foreground">
              {l.name}
            </a>
          ))}
        </nav>
      </Container>
      {/* the swarm's last rebuild: the brand */}
      <Container>
        <SectionSwarm shape="brand" className="relative mt-10 h-[90px] w-full sm:h-[160px] lg:h-[230px]" />
      </Container>
      <Container className="mt-6 border-t border-border pt-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} NexoraLabStudio. {t.footer.rights}
      </Container>
    </footer>
  );
}
