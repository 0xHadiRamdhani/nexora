import type { Language } from '@/lib/translations';

export type ProjectCategory = 'mobile' | 'web' | 'ios';

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  description: Record<Language, string>;
  technologies: string[];
  image: string;
  link: string;
}
