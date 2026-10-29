import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';

/**
 * Market figures from the 2027 profile: the size of the catering market the
 * forum sits inside. Kept as its own chapter so the numbers read as evidence
 * rather than decoration.
 */
export function MarketFigures({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.marketStats;
  const isAr = locale === 'ar';

  return (
    <Section
      id="market"
      tone="soft"
      labelledBy="market-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-40" />
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -end-16 top-16 hidden h-72 w-72 text-gold-600/10 lg:block"
        filled
      />

      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <SectionTitle
          eyebrow={t.eyebrow}
          eyebrowEn={t.eyebrowEn}
          title={t.title}
          lead={t.lead}
          tone="light"
          titleId="market-title"
          index="02"
          titleClassName="max-w-[16ch]"
        />

        <RevealGroup as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.07}>
          {t.stats.map((stat) => (
            <RevealItem
              as="li"
              key={stat.label}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-navy-900/12 bg-[#FFFDF7] p-6 transition-colors duration-500 hover:border-gold-600/45"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-60"
              />
              <p className="numeral flex flex-wrap items-baseline gap-x-2 font-display text-[2.6rem] font-bold leading-none text-navy-900 sm:text-[3rem]">
                {stat.value}
                <span className="text-[1.05rem] font-bold text-gold-600">{stat.suffix}</span>
              </p>
              <p className="mt-4 text-body-sm font-semibold leading-snug text-navy-900">
                {stat.label}
              </p>
              <p className="mt-2 text-body-xs leading-relaxed text-muted">{stat.sub}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="relative mt-10 flex flex-col gap-3 border-t border-gold-500/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-body-xs leading-relaxed text-muted">{t.note}</p>
        <p className="shrink-0 text-label-2xs font-bold uppercase tracking-[0.14em] text-gold-700">
          {t.source}
        </p>
      </div>
    </Section>
  );
}
