// Types for NexoraLabStudio

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
}

export interface Service {
  title: string;
  icon: React.ElementType; // Lucide icon component
  description: string;
  features: string[];
}
