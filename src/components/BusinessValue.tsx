import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';
import { journeyIcons } from './ui/Icons';

export function BusinessValue({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.businessValue;
  const isAr = locale === 'ar';

  return (
    <Section
      id="business-value"
      tone="soft"
      labelledBy="business-value-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <div aria-hidden="true" className="pattern-dots absolute inset-0 opacity-30" />

      <div className="relative">
        <SectionTitle
          eyebrow={t.eyebrow}
          eyebrowEn={t.eyebrowEn}
          title={t.title}
          lead={t.lead}
          tone="light"
          titleId="business-value-title"
          index="10"
          titleClassName="max-w-[18ch]"
        />

        <RevealGroup as="ol" className="relative mt-14" stagger={0.06} amount={0.04}>
          {/* Central rail */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-5 w-px bg-gradient-to-b from-transparent via-gold-600/45 to-transparent lg:start-1/2 lg:-translate-x-1/2"
          />

          {t.items.map((step, i) => {
            const Icon = journeyIcons[i] ?? journeyIcons[0];
            const left = i % 2 === 0;

            return (
              <RevealItem as="li" key={step.number}>
                <div className="relative grid pb-6 ps-14 lg:grid-cols-2 lg:gap-16 lg:pb-8 lg:ps-0">
                  <span
                    aria-hidden="true"
                    className="absolute start-5 top-7 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold-600/50 bg-[#F4EDDD] text-gold-700 shadow-[0_0_0_7px_#F4EDDD] lg:start-1/2"
                  >
                    <StarMark className="h-4 w-4" filled />
                  </span>

                  <div
                    className={
                      left
                        ? 'lg:col-start-1 lg:pe-10 lg:text-end'
                        : 'lg:col-start-2 lg:row-start-1 lg:ps-10'
                    }
                  >
                    <article className="group rounded-[1.4rem] border border-navy-900/12 bg-[#FFFDF7] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold-600/45 hover:shadow-card sm:p-6">
                      <div className={left ? 'flex items-center justify-between gap-4 lg:flex-row-reverse' : 'flex items-center justify-between gap-4'}>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/30 bg-gold-500/10 text-gold-700">
                          <Icon width={18} height={18} />
                        </span>
                        <span className="numeral font-display text-[2.3rem] leading-none text-gold-600/25 transition-colors duration-300 group-hover:text-gold-600/50">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-[1.3rem] font-bold leading-snug text-navy-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-label-xs font-bold uppercase tracking-[0.1em] text-gold-700">
                        {step.subtitle}
                      </p>
                      <p className="mt-3 text-body-sm leading-[1.8] text-muted">{step.description}</p>
                    </article>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-gold-600/25 pt-6">
          <p className="flex items-center gap-3 text-label-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
            <StarMark className="h-3.5 w-3.5" filled />
            {isAr ? 'ثماني مراحل · أثر واحد' : 'Eight stages · one impact'}
          </p>
          <a href="#register" className="btn btn-outline px-6 py-3 text-label-xs">
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </Section>
  );
}
