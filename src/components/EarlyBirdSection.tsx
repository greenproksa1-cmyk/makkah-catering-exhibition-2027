'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';

const money = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export function EarlyBirdSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.earlyBird;
  const isAr = locale === 'ar';
  const [area, setArea] = useState(18);

  const safeArea = Number.isFinite(area) ? Math.max(0, Math.min(2000, area)) : 0;

  const totals = useMemo(() => {
    const early = safeArea * t.earlyPrice;
    const regular = safeArea * t.regularPrice;
    return { early, regular, saving: regular - early };
  }, [safeArea, t.earlyPrice, t.regularPrice]);

  return (
    <Section
      id="early-bird"
      tone="dark"
      labelledBy="early-bird-title"
      containerClassName="shell"
      className="border-y border-white/10"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
        <div>
          <SectionTitle
            eyebrow={t.eyebrow}
            eyebrowEn={t.eyebrowEn}
            title={t.title}
            lead={t.lead}
            tone="dark"
            titleId="early-bird-title"
            className="max-w-2xl"
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-body-sm font-bold text-white">
              {t.badge}
            </span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-body-xs font-semibold text-orange-300">
              {t.deadline}
            </span>
          </div>

          {/* Price comparison */}
          <dl className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-orange-400/40 bg-orange-500/10 p-5">
              <dt className="text-label-2xs font-semibold uppercase tracking-[0.14em] text-orange-300">
                {t.earlyLabel}
              </dt>
              <dd className="mt-2 flex items-baseline gap-1.5">
                <span className="numeral text-display-md font-bold text-white">
                  {money.format(t.earlyPrice)}
                </span>
                <span className="text-body-xs text-muted">{t.currency}</span>
              </dd>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5">
              <dt className="text-label-2xs font-semibold uppercase tracking-[0.14em] text-muted">
                {t.regularLabel}
              </dt>
              <dd className="mt-2 flex items-baseline gap-1.5">
                <span className="numeral text-display-md font-bold text-muted line-through decoration-white/40">
                  {money.format(t.regularPrice)}
                </span>
                <span className="text-body-xs text-muted">{t.currency}</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Calculator */}
        <RevealGroup className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-8" stagger={0.05}>
          <RevealItem>
            <h3 className="font-display text-display-sm font-bold text-white">{t.calcTitle}</h3>
            <p className="mt-2 text-body-sm text-muted">{t.calcHint}</p>

            <label htmlFor="early-bird-area" className="mt-6 block text-label-sm font-semibold text-body">
              {t.areaLabel}
            </label>
            <input
              id="early-bird-area"
              type="number"
              min={1}
              max={2000}
              step={1}
              value={area}
              onChange={(event) => setArea(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-white/15 bg-navy-950/60 px-4 py-3 text-body-lg font-bold text-white outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20"
            />

            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t.areaLabel}>
              {t.quickAreas.map((quick) => (
                <button
                  key={quick}
                  type="button"
                  onClick={() => setArea(quick)}
                  aria-pressed={safeArea === quick}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-body-xs font-semibold transition-colors duration-300',
                    safeArea === quick
                      ? 'border-orange-400 bg-orange-500/20 text-white'
                      : 'border-white/15 text-muted hover:border-white/35 hover:text-white',
                  )}
                >
                  {quick} m²
                </button>
              ))}
            </div>

            <dl className="mt-6 space-y-3 border-t border-white/12 pt-5">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-body-sm text-muted">{t.savingLabel}</dt>
                <dd className="numeral text-display-sm font-bold text-orange-300">
                  {money.format(totals.saving)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-body-sm text-muted">{t.regularLabel}</dt>
                <dd className="numeral text-body-md text-muted line-through">{money.format(totals.regular)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 rounded-2xl bg-orange-500/10 px-4 py-3">
                <dt className="text-body-sm font-semibold text-white">{t.earlyLabel}</dt>
                <dd className="numeral text-display-md font-bold text-white">
                  {money.format(totals.early)}
                  <span className="ms-1 text-body-xs font-normal text-muted">{isAr ? 'ر.س' : 'SAR'}</span>
                </dd>
              </div>
            </dl>

            <a href="#register" className="btn btn-accent mt-6 w-full py-3.5">
              {t.cta}
            </a>
            <p className="mt-4 text-label-xs leading-relaxed text-muted">{t.note}</p>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
