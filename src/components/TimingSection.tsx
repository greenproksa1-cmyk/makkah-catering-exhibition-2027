'use client';

import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';

export function TimingSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.timing;
  const isAr = locale === 'ar';

  return (
    <Section id="timing" tone="dark" labelledBy="timing-title" containerClassName="shell">
      <SectionTitle
        eyebrow={t.eyebrow}
        eyebrowEn={t.eyebrowEn}
        title={t.title}
        lead={t.lead}
        tone="dark"
        titleId="timing-title"
        className="max-w-3xl"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch">
        <RevealGroup className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8" stagger={0.05}>
          <RevealItem>
            <p className="text-label-sm font-semibold uppercase tracking-[0.1em] text-orange-400">
              {t.bridgeTitle}
            </p>
          </RevealItem>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {t.pills.map((pill) => (
              <li
                key={pill.id}
                className="rounded-full border border-white/12 bg-navy-900/60 px-4 py-2 text-body-sm font-medium text-body transition-colors duration-300 hover:border-orange-400/60 hover:text-white"
              >
                {isAr ? pill.labelAr : pill.labelEn}
              </li>
            ))}
          </ul>
        </RevealGroup>

        <RevealGroup className="relative overflow-hidden rounded-3xl bg-orange-700 p-7 sm:p-9" stagger={0.05}>
          <RevealItem>
            <p className="text-label-2xs font-semibold uppercase tracking-[0.18em] text-orange-50">
              {isAr ? 'الخلاصة' : 'In short'}
            </p>
            <blockquote className="mt-4 font-display text-display-sm font-bold leading-snug text-white">
              {t.closingLine}
            </blockquote>
            <span aria-hidden="true" className="mt-7 block h-1 w-16 rounded-full bg-white/40" />
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
