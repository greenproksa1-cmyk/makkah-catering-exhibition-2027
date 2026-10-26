'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';

/**
 * First-paint wordmark reveal. Runs once per browser session, is skipped for
 * reduced-motion users, and never blocks interaction.
 */
export function PageLoader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reduce) return;
    if (typeof window === 'undefined') return;

    const KEY = 'makkah-expo-intro-seen';
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(KEY) === '1';
    } catch {
      seen = false;
    }

    if (seen) return;
    setVisible(true);
    document.body.style.overflow = 'hidden';

    const done = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      try {
        window.sessionStorage.setItem(KEY, '1');
      } catch {
        /* storage unavailable — the loader simply shows again next time */
      }
    }, 1500);

    return () => {
      window.clearTimeout(done);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        className="on-dark fixed inset-0 z-[90] flex flex-col items-center justify-center bg-navy-950 px-6 text-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        aria-hidden="true"
      >
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span aria-hidden="true" className="pattern-stars absolute inset-0 opacity-20" />
          <span aria-hidden="true" className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 text-gold-300">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M12 1.8 15.1 8.9 22.2 12l-7.1 3.1L12 22.2 8.9 15.1 1.8 12l7.1-3.1Z" />
            </svg>
          </span>
          <p className="relative font-display text-display-sm font-bold text-white sm:text-display-md">
            {locale === 'ar' ? dict.event.heroTitleAr : dict.event.heroTitleEn}
          </p>

          <span aria-hidden="true" className="relative h-px w-24 bg-gold-gradient" />

          <p className="relative font-inter text-label-2xs uppercase tracking-[0.24em] text-gold-200/70">
            {locale === 'ar' ? dict.event.dateLineAr : dict.event.dateLineEn}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}