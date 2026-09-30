'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SelectNative } from '@/components/ui/select-native';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function Contact() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus('success');
      reset();
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 border-t border-border/50">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Let&apos;s Build Something Great.
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm"
          >
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Thank you for your message. We have received your inquiry and will be in touch shortly.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Something went wrong. Please try again later or contact us directly at hello@nexoralabstudio.com.</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="John Doe" {...register('name')} />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="john@company.com" {...register('email')} />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">Company / Organization (Optional)</label>
                <Input id="company" placeholder="Company Name" {...register('company')} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-medium">Project Type</label>
                  <SelectNative id="projectType" {...register('projectType')}>
                    <option value="" disabled>Select Project Type</option>
                    <option value="Android App">Android App</option>
                    <option value="iOS App">iOS App</option>
                    <option value="Website">Website</option>
                    <option value="Web Application">Web Application</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Other">Other</option>
                  </SelectNative>
                  {errors.projectType && <p className="text-xs text-red-500">{errors.projectType.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium">Budget Range</label>
                  <SelectNative id="budget" {...register('budget')}>
                    <option value="" disabled>Select Budget Range</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 – $1,000">$500 – $1,000</option>
                    <option value="$1,000 – $5,000">$1,000 – $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </SelectNative>
                  {errors.budget && <p className="text-xs text-red-500">{errors.budget.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Project Description</label>
                <Textarea 
                  id="description" 
                  placeholder="Tell us about your project, goals, and timeline..." 
                  className="min-h-[120px]"
                  {...register('description')} 
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>

              <Button 
                type="submit" 
                variant="premium" 
                className="w-full h-12 text-base"
                isLoading={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Project Inquiry'}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
