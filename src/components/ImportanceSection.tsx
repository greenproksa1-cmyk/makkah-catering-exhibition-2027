'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { IconMark } from './ui/Photo';
import { IconTarget, IconCompass, IconHandshake } from './ui/Icons';

const CARD_ICONS = [IconCompass, IconTarget, IconHandshake] as const;

export function ImportanceSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.importance;
  const isAr = locale === 'ar';
  const reduce = useReducedMotion() ?? false;

  return (
    <Section
      id="importance"
      tone="dark"
      labelledBy="importance-title"
      containerClassName="shell"
      className="border-b border-white/10"
    >
      <SectionTitle
        eyebrow={t.eyebrow}
        eyebrowEn={t.eyebrowEn}
        title={t.title}
        lead={t.lead}
        tone="dark"
        titleId="importance-title"
        className="max-w-3xl"
      />

      <RevealGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {t.cards.map((card, i) => {
          const Icon = CARD_ICONS[i] ?? IconTarget;
          return (
            <RevealItem as="li" key={card.number}>
              <article className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-orange-400/50 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <IconMark tone="dark" size="lg" className="border-orange-400">
                    <Icon width={24} height={24} className="text-orange-300" />
                  </IconMark>
                  <span className="numeral text-label-sm text-orange-400">{card.number}</span>
                </div>

                <h3 className="mt-6 text-display-sm font-bold text-white">{card.title}</h3>
                <p lang="en" className="mt-1 font-inter text-label-xs uppercase tracking-[0.08em] text-muted">
                  {card.en}
                </p>
                <p className="mt-4 border-t border-white/12 pt-4 text-body-md text-body">
                  {card.description}
                </p>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <RevealGroup className="mt-12" stagger={0.06}>
        <RevealItem>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="on-dark relative overflow-hidden rounded-3xl border border-orange-400/30 bg-orange-500/10 p-7 sm:p-10"
          >
            <span aria-hidden="true" className="accent-bar absolute inset-x-0 top-0 rounded-t-3xl" />
            <p className="text-label-2xs font-semibold uppercase tracking-[0.18em] text-orange-300">
              {t.closingTitle}
            </p>
            <p className="mt-3 max-w-4xl font-display text-display-sm font-bold leading-snug text-white sm:text-display-md">
              {t.closingText}
            </p>
          </motion.div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
