'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';

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

  const perMetreSaving = t.regularPrice - t.earlyPrice;

  return (
    <Section
      id="early-bird"
      tone="dark"
      labelledBy="early-bird-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-20" />
      <div aria-hidden="true" className="absolute -end-24 -top-20 h-[30rem] w-[22rem] rounded-[50%_50%_1rem_1rem] border border-gold-400/15" />
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -start-16 bottom-0 hidden h-80 w-80 text-gold-400/10 lg:block"
        filled
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14">
        <div>
          <SectionTitle
            eyebrow={t.eyebrow}
            eyebrowEn={t.eyebrowEn}
            title={t.title}
            lead={t.lead}
            tone="dark"
            titleId="early-bird-title"
            index="10"
            titleClassName="max-w-[17ch]"
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="relative flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full bg-gold-gradient text-navy-950 shadow-gold">
              <span
                aria-hidden="true"
                className="absolute inset-[-6px] animate-[spin_45s_linear_infinite] rounded-full border border-dashed border-gold-400/45"
              />
              <span className="numeral font-display text-[1.9rem] font-bold leading-none">
                {t.discountPercent}%
              </span>
              <span className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.12em]">
                {isAr ? 'خصم' : 'OFF'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300">
                {t.badge}
              </p>
              <p className="mt-1 text-body-sm text-white/75">{t.deadline}</p>
              <p className="mt-2 text-label-xs text-gold-200/70">
                {isAr
                  ? `وفّر ${money.format(perMetreSaving)} ر.س على كل متر مربع`
                  : `Save SAR ${money.format(perMetreSaving)} per square metre`}
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-white/12 pt-6 sm:grid-cols-2">
            {[
              isAr ? 'سعر تأسيسي لجميع المساحات' : 'Founding rate for every stand size',
              isAr ? 'تثبيت السعر عند تأكيد الحجز' : 'Price locked on confirmation',
              isAr ? 'دفعة أولى قبل 15 نوفمبر 2026' : 'First payment before 15 Nov 2026',
              isAr ? 'موقع داخل المنطقة المركزية' : 'Location inside central Makkah',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-body-xs leading-relaxed text-white/70">
                <StarMark className="mt-0.5 h-3 w-3 shrink-0 text-gold-500" filled />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Ticket */}
        <RevealGroup className="relative" stagger={0.06}>
          <RevealItem>
            <div className="overflow-hidden rounded-[1.9rem] border border-gold-400/35 shadow-card-lg">
              <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
                {/* Price side */}
                <div className="relative flex h-full flex-col overflow-hidden bg-gold-gradient p-6 text-navy-950 sm:p-8">
                  <StarMark
                    aria-hidden="true"
                    className="pointer-events-none absolute -end-6 -top-6 h-32 w-32 text-navy-950/10"
                    filled
                  />
                  <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-navy-900/70">
                    {t.earlyLabel}
                  </p>
                  <p className="mt-3 flex items-end gap-2">
                    <span className="numeral text-[3.4rem] font-bold leading-none sm:text-[4rem]">
                      {money.format(t.earlyPrice)}
                    </span>
                    <span className="mb-1.5 whitespace-nowrap text-label-xs font-bold text-navy-900/70">
                      {t.currency}
                    </span>
                  </p>

                  <p className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-navy-950/10 px-3 py-1.5 text-label-2xs font-semibold text-navy-900/75">
                    <span className="line-through decoration-navy-900/50">
                      {money.format(t.regularPrice)}
                    </span>
                    {t.regularLabel}
                  </p>

                  <div className="mt-7 border-t border-navy-950/20 pt-5">
                    <p className="text-label-2xs font-bold uppercase tracking-[0.14em] text-navy-900/60">
                      {isAr ? 'الوفورات' : 'Your saving'}
                    </p>
                    <p className="numeral mt-1 text-[2rem] font-bold leading-none text-navy-950">
                      {money.format(totals.saving)}
                      <span className="ms-1 text-label-xs font-bold">{isAr ? 'ر.س' : 'SAR'}</span>
                    </p>
                  </div>

                  <div className="mt-auto border-t border-navy-950/15 pt-5">
                    <p className="text-label-2xs font-bold uppercase tracking-[0.14em] text-navy-900/60">
                      {isAr ? 'خطوات تثبيت السعر' : 'How the rate is locked'}
                    </p>
                    <ol className="mt-3 space-y-2.5">
                      {(isAr
                        ? ['اختر مساحة الجناح', 'ادفع الدفعة الأولى', 'يُثبَّت السعر التأسيسي']
                        : ['Choose your stand', 'Pay the first instalment', 'Your rate is locked']
                      ).map((step, i) => (
                        <li
                          key={step}
                          className="flex items-center gap-2.5 text-label-xs font-semibold text-navy-900/80"
                        >
                          <span className="numeral flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-950/25 text-[0.6rem]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <p className="mt-4 text-[0.68rem] font-medium leading-relaxed text-navy-900/65">
                    {isAr ? 'الأسعار لا تشمل ضريبة القيمة المضافة.' : 'Prices exclude VAT.'}
                  </p>
                </div>

                {/* Calculator side */}
                <div className="on-light bg-[#FBF7EE] p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-[1.35rem] font-bold text-navy-900">{t.calcTitle}</h3>
                    <StarMark className="h-4 w-4 text-gold-600" filled />
                  </div>
                  <p className="mt-1.5 text-body-xs text-muted">{t.calcHint}</p>

                  <label htmlFor="early-bird-area" className="mt-5 block text-label-xs font-bold text-navy-800">
                    {t.areaLabel}
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="early-bird-area"
                      type="number"
                      min={1}
                      max={2000}
                      step={1}
                      value={area}
                      onChange={(event) => setArea(Number(event.target.value))}
                      className="w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 pe-16 text-body-lg font-bold text-navy-900 outline-none transition focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                    />
                    <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-label-xs font-semibold text-muted">
                      {isAr ? 'م²' : 'm²'}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t.areaLabel}>
                    {t.quickAreas.map((quick) => (
                      <button
                        key={quick}
                        type="button"
                        onClick={() => setArea(quick)}
                        aria-pressed={safeArea === quick}
                        className={cn(
                          'rounded-full border px-3.5 py-1.5 text-label-xs font-bold transition-colors duration-300',
                          safeArea === quick
                            ? 'border-gold-600 bg-gold-500 text-navy-950'
                            : 'border-navy-900/15 text-navy-700 hover:border-gold-600/60 hover:text-navy-950',
                        )}
                      >
                        {quick} {isAr ? 'م²' : 'm²'}
                      </button>
                    ))}
                  </div>

                  <dl className="mt-5 space-y-2.5 border-t border-navy-900/10 pt-4" aria-live="polite">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-body-xs text-muted">{t.regularLabel}</dt>
                      <dd className="numeral text-body-sm text-muted line-through">
                        {money.format(totals.regular)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-body-xs text-muted">{t.savingLabel}</dt>
                      <dd className="numeral text-body-sm font-bold text-gold-700">
                        {money.format(totals.saving)}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 rounded-xl bg-navy-950 px-4 py-3 text-white">
                      <dt className="text-label-xs font-semibold">{t.earlyLabel}</dt>
                      <dd className="numeral text-[1.6rem] font-bold">
                        {money.format(totals.early)}
                        <span className="ms-1 text-[0.62rem] font-medium text-white/60">
                          {isAr ? 'ر.س' : 'SAR'}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  <a href="#register" className="btn btn-primary mt-4 w-full py-3.5">
                    {t.cta}
                  </a>
                  <p className="mt-3 text-[0.68rem] leading-relaxed text-muted">{t.note}</p>
                </div>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
