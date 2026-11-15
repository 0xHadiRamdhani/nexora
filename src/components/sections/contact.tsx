'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SelectNative } from '@/components/ui/select-native';
import { contactFormSchema, PROJECT_TYPES, BUDGETS, type ContactFormValues } from '@/lib/validations';
import { useLanguage } from '@/components/layout/language-provider';
import { CONTACT_EMAIL } from '@/lib/translations';
import { SectionSwarm } from '@/components/motion/section-swarm';

type Field = keyof ContactFormValues;

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setStatus('success');
      reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="text-sm text-red-600 dark:text-red-400">
        {c.errors[field as keyof typeof c.errors]}
      </p>
    ) : null;

  const aria = (field: Field) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  const labelCls = 'text-sm font-semibold';

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-surface py-24 lg:py-32">

      <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold text-brand">{c.label}</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{c.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.subtitle}</p>

          <h3 className="mt-12 text-sm font-semibold text-muted-foreground">{c.nextTitle}</h3>
          <ol className="mt-4 space-y-4">
            {c.next.map((step, i) => (
              <li key={step} className="group flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-brand-foreground transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-12">
                  {i + 1}
                </span>
                <span className="pt-1 font-medium">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-sm text-muted-foreground">{c.emailLabel}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="group mt-1 inline-flex items-center gap-2 text-lg font-bold hover:text-brand">
            <Mail className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" aria-hidden />
            <span className="link-sweep pb-0.5">{CONTACT_EMAIL}</span>
          </a>
          <SectionSwarm shape="mail" className="relative mt-10 hidden h-[200px] w-[280px] lg:block" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-border bg-background p-6 sm:p-9"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  className="grid size-16 place-items-center rounded-full bg-accent text-accent-foreground"
                >
                  <CheckCircle2 className="size-8" aria-hidden />
                </motion.span>
                <p className="mt-6 text-2xl font-extrabold">{c.successTitle}</p>
                <p className="mt-2 text-muted-foreground">{c.successBody}</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-8 text-sm font-semibold text-brand underline-offset-4 hover:underline">
                  {c.sendAnother}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {status === 'error' && (
                  <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
                    <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
                    <p>
                      <strong>{c.errorTitle}</strong> {c.errorBody}{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className={labelCls}>{c.name}</label>
                    <Input id="name" autoComplete="name" placeholder={c.namePlaceholder} className="h-11" {...aria('name')} {...register('name')} />
                    {fieldError('name')}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className={labelCls}>{c.email}</label>
                    <Input id="email" type="email" autoComplete="email" placeholder={c.emailPlaceholder} className="h-11" {...aria('email')} {...register('email')} />
                    {fieldError('email')}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className={labelCls}>{c.company}</label>
                  <Input id="company" autoComplete="organization" placeholder={c.companyPlaceholder} className="h-11" {...register('company')} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="projectType" className={labelCls}>{c.projectType}</label>
                    <SelectNative id="projectType" defaultValue="" className="h-11" {...aria('projectType')} {...register('projectType')}>
                      <option value="" disabled>{c.projectTypePlaceholder}</option>
                      {PROJECT_TYPES.map((v) => (
                        <option key={v} value={v}>{c.projectTypes[v]}</option>
                      ))}
                    </SelectNative>
                    {fieldError('projectType')}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className={labelCls}>{c.budget}</label>
                    <SelectNative id="budget" defaultValue="" className="h-11" {...aria('budget')} {...register('budget')}>
                      <option value="" disabled>{c.budgetPlaceholder}</option>
                      {BUDGETS.map((v) => (
                        <option key={v} value={v}>{c.budgets[v]}</option>
                      ))}
                    </SelectNative>
                    {fieldError('budget')}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className={labelCls}>{c.description}</label>
                  <Textarea id="description" placeholder={c.descriptionPlaceholder} className="min-h-[140px]" {...aria('description')} {...register('description')} />
                  {fieldError('description')}
                </div>

                <Button
                  type="submit"
                  isLoading={status === 'loading'}
                  className="group h-13 w-full rounded-full bg-accent text-base font-bold text-accent-foreground transition-[color,box-shadow] duration-300 hover:bg-accent hover:text-background hover:shadow-[0_14px_30px_-12px_var(--accent)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-disabled:hidden"
                  />
                  <span className="relative">{status === 'loading' ? c.sending : c.send}</span>
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
