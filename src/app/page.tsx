import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Projects } from '@/components/sections/projects';
import { WhyUs } from '@/components/sections/why-us';
import { Process } from '@/components/sections/process';
import { Technologies } from '@/components/sections/technologies';
import { About } from '@/components/sections/about';
import { CTA } from '@/components/sections/cta';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <WhyUs />
      <Process />
      <Technologies />
      <About />
      <CTA />
      <Contact />
    </main>
  );
}
