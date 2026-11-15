'use client';

import * as React from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Menu, Home, Coffee, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/layout/language-provider';

type Mode = 'web' | 'mobile';

const spring = { type: 'spring', stiffness: 260, damping: 30 } as const;
const swatches = ['bg-[#c8a27a]', 'bg-[#8a5a3b]', 'bg-[#8fbf8a]'];
const TAB_ICONS = [Home, Coffee, Receipt];

/**
 * One sample product rendered as a website and as a phone app.
 * Every block has `layout`, so switching modes re-flows the same
 * elements into the other platform instead of swapping screenshots.
 */
export function DeviceMorph() {
  const { t } = useLanguage();
  const [mode, setMode] = React.useState<Mode>('web');
  const isWeb = mode === 'web';
  const d = t.demo;

  return (
    <LayoutGroup>
      <div className="flex flex-col items-center gap-5">
        <div role="tablist" aria-label="Platform" className="flex rounded-full border border-border bg-surface p-1">
          {(
            [
              { id: 'web', label: t.hero.toggleWeb, Icon: Globe },
              { id: 'mobile', label: t.hero.toggleMobile, Icon: Smartphone },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                mode === id ? 'text-brand-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {mode === id && (
                <motion.span layoutId="platform-pill" className="absolute inset-0 rounded-full bg-brand" transition={spring} />
              )}
              <Icon className="relative size-4" aria-hidden />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>

        <div className="flex h-[430px] w-full items-center justify-center sm:h-[500px]" aria-hidden>
          <motion.div
            layout
            transition={spring}
            style={{ borderRadius: isWeb ? 14 : 34 }}
            className={cn(
              'relative flex flex-col overflow-hidden border border-border bg-surface shadow-[0_30px_60px_-30px_rgba(10,27,77,0.35)]',
              isWeb ? 'aspect-[4/3.4] w-full max-w-[560px] sm:aspect-[16/10.5]' : 'h-[420px] w-[206px] p-1.5 sm:h-[470px] sm:w-[230px]',
              !isWeb && 'bg-navy dark:bg-black'
            )}
          >
            {/* device chrome */}
            <AnimatePresence initial={false} mode="popLayout">
              {isWeb ? (
                <motion.div
                  key="browser"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/60 px-3 py-2"
                >
                  <span className="flex gap-1">
                    <i className="size-2 rounded-full bg-border" />
                    <i className="size-2 rounded-full bg-border" />
                    <i className="size-2 rounded-full bg-border" />
                  </span>
                  <span className="mx-auto rounded-md bg-surface px-6 py-0.5 text-[10px] text-muted-foreground">{d.url}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="notch"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 top-3 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-navy dark:bg-black"
                />
              )}
            </AnimatePresence>

            {/* screen */}
            <motion.div
              layout
              transition={spring}
              style={{ borderRadius: isWeb ? 0 : 28 }}
              className={cn('flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fbf7f2] text-[#2b1a10]', isWeb ? 'gap-3 p-4' : 'gap-3 px-3 pb-0 pt-9')}
            >
              <motion.header layout transition={spring} className="flex items-center justify-between">
                <motion.span layout="position" className="flex items-center gap-1.5 text-[11px] font-extrabold">
                  <i className="size-3.5 rounded-full bg-[#8a5a3b]" />
                  {d.brand}
                </motion.span>
                {isWeb ? (
                  <motion.nav layout="position" className="flex gap-3 text-[10px] text-[#6b5444]">
                    {d.nav.map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </motion.nav>
                ) : (
                  <Menu className="size-3.5" />
                )}
              </motion.header>

              <motion.section
                layout
                transition={spring}
                className={cn('flex gap-3 rounded-xl bg-[#2b1a10] p-3 text-[#fbf7f2]', isWeb ? 'flex-row items-center' : 'flex-col')}
              >
                <motion.div layout="position" className="flex-1">
                  <p className={cn('font-extrabold leading-tight', isWeb ? 'text-base' : 'text-sm')}>{d.headline}</p>
                  <span className="mt-2 inline-block rounded-full bg-[#e9b872] px-2.5 py-1 text-[9px] font-bold text-[#2b1a10]">{d.cta}</span>
                </motion.div>
                <motion.div
                  layout
                  transition={spring}
                  className={cn('rounded-lg bg-[#c8a27a]', isWeb ? 'h-20 w-28' : 'h-16 w-full')}
                />
              </motion.section>

              <motion.ul layout transition={spring} className={cn('grid gap-2', isWeb ? 'grid-cols-3' : 'grid-cols-1')}>
                {d.items.map((item, i) => (
                  <motion.li
                    layout
                    transition={spring}
                    key={item.name}
                    className={cn('flex gap-2 rounded-lg bg-white p-2 ring-1 ring-[#eadfd3]', isWeb ? 'flex-col' : 'flex-row items-center')}
                  >
                    <motion.i layout transition={spring} className={cn('block rounded-md', swatches[i], isWeb ? 'h-10 w-full' : 'size-8 shrink-0')} />
                    <motion.span layout="position" className="flex flex-1 items-center justify-between text-[10px] font-semibold">
                      {item.name}
                      <span className="text-[#8a5a3b]">{item.price}</span>
                    </motion.span>
                  </motion.li>
                ))}
              </motion.ul>

              <AnimatePresence initial={false}>
                {!isWeb && (
                  <motion.nav
                    key="tabs"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={spring}
                    className="mt-auto -mx-3 flex justify-around border-t border-[#eadfd3] bg-white px-3 pb-4 pt-2"
                  >
                    {d.tabs.map((tab, i) => {
                      const Icon = TAB_ICONS[i];
                      return (
                        <span key={tab} className={cn('flex flex-col items-center gap-0.5 text-[8px] font-semibold', i === 0 ? 'text-[#8a5a3b]' : 'text-[#a8968a]')}>
                          <Icon className="size-3.5" />
                          {tab}
                        </span>
                      );
                    })}
                  </motion.nav>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <p className="text-center text-xs text-muted-foreground">{t.hero.demoCaption}</p>
      </div>
    </LayoutGroup>
  );
}
