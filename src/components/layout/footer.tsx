import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Code, Camera, Briefcase, MessageCircle } from 'lucide-react';

const footerLinks = {
  navigation: [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],
  services: [
    { name: 'Android Development', href: '#' },
    { name: 'iOS Development', href: '#' },
    { name: 'Website Development', href: '#' },
    { name: 'Web Applications', href: '#' },
    { name: 'UI/UX Design', href: '#' },
    { name: 'Custom Software', href: '#' },
  ],
  social: [
    { name: 'GitHub', href: '#', icon: Code },
    { name: 'Instagram', href: '#', icon: Camera },
    { name: 'LinkedIn', href: '#', icon: Briefcase },
    { name: 'X', href: '#', icon: MessageCircle },
  ]
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block font-bold text-2xl tracking-tight">
              NexoraLabStudio
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Digital products, engineered for what&apos;s next.
            </p>
            <div className="flex gap-4 pt-2">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>hello@nexoralabstudio.com</p>
              <p>Jakarta, Indonesia</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 NexoraLabStudio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
