import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem, RevealX } from './ui/Motion';
import { StarMark } from './ui/Ornament';

export function ImportanceSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.importance;
  const isAr = locale === 'ar';

  return (
    <Section
      id="importance"
      tone="dark"
      labelledBy="importance-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-25" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-40" />
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 -top-16 hidden h-96 w-96 text-gold-400/10 lg:block"
        filled
      />

      <div className="relative grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16">
        {/* Makkah image */}
        <RevealX from="start" className="order-2 lg:order-1 lg:sticky lg:top-28">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div aria-hidden="true" className="arch-frame absolute inset-0 -translate-x-3 translate-y-3 rtl:translate-x-3" />
            <figure className="arch relative aspect-[3/4.1] w-full bg-navy-900">
              <Image
                src="/images/design/makkah-clock.jpg"
                alt={
                  isAr
                    ? 'برج الساعة والمنطقة المركزية قرب المسجد الحرام في مكة المكرمة'
                    : 'The clock tower and central Makkah district near the Grand Mosque'
                }
                fill
                sizes="(max-width: 1024px) 90vw, 34vw"
                quality={84}
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/15 to-transparent" />

              <figcaption className="absolute inset-x-5 bottom-5">
                <div className="flex items-center gap-2 text-gold-300">
                  <StarMark className="h-4 w-4" filled />
                  <p className="text-label-2xs font-bold uppercase tracking-[0.2em]">
                    {t.closingTitle}
                  </p>
                </div>
                <p className="mt-3 font-display text-[1.35rem] font-bold leading-snug text-white sm:text-[1.55rem]">
                  {t.closingText}
                </p>
              </figcaption>
            </figure>
          </div>
        </RevealX>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <SectionTitle
            eyebrow={t.eyebrow}
            eyebrowEn={t.eyebrowEn}
            title={t.title}
            lead={t.lead}
            tone="dark"
            titleId="importance-title"
            index="03"
            titleClassName="max-w-[16ch]"
          />

          <RevealGroup as="ul" className="mt-10 divide-y divide-white/10 border-y border-white/10" stagger={0.08}>
            {t.cards.map((card) => (
              <RevealItem as="li" key={card.number}>
                <article className="group relative grid grid-cols-[auto_1fr] gap-5 py-7 transition-colors duration-300 sm:gap-7 sm:py-8">
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-display text-[2.1rem] font-bold leading-none text-gold-500/45 transition-colors duration-300 group-hover:text-gold-400 sm:text-[2.6rem]">
                      {card.number}
                    </span>
                    <span aria-hidden="true" className="h-10 w-px bg-white/15" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-display-sm font-bold text-white">{card.title}</h3>
                      <p lang="en" className="font-inter text-[0.68rem] uppercase tracking-[0.14em] text-gold-300/80">
                        {card.en}
                      </p>
                    </div>
                    <p className="mt-3 max-w-xl text-body-md leading-[1.85] text-body">
                      {card.description}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -inset-x-4 -z-10 rounded-2xl bg-white/0 transition-colors duration-300 group-hover:bg-white/[0.035]"
                  />
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-8 flex items-center gap-3 text-gold-300">
            <StarMark className="h-4 w-4" filled />
            <p className="text-label-xs font-semibold uppercase tracking-[0.16em]">
              {isAr ? 'مكة المكرمة · المنطقة المركزية' : 'Makkah · Central District'}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
