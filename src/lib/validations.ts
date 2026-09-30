import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  projectType: z.enum([
    'Android App',
    'iOS App',
    'Website',
    'Web Application',
    'UI/UX Design',
    'Custom Software',
    'Other'
  ], {
    message: 'Please select a project type.',
  }),
  budget: z.enum([
    'Under $500',
    '$500 – $1,000',
    '$1,000 – $5,000',
    '$5,000+',
    'Not sure yet'
  ], {
    message: 'Please select a budget range.',
  }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
