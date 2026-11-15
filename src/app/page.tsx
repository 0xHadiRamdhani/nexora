import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Projects } from '@/components/sections/projects';
import { Process } from '@/components/sections/process';
import { Team } from '@/components/sections/team';
import { Stack } from '@/components/sections/stack';
import { Faq } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Process />
      <Team />
      <Stack />
      <Faq />
      <Contact />
    </main>
  );
}
