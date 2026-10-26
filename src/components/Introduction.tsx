import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem, RevealX } from './ui/Motion';
import { StarMark } from './ui/Ornament';

export function Introduction({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.introduction;
  const isAr = locale === 'ar';

  return (
    <Section
      id="introduction"
      tone="white"
      labelledBy="introduction-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -start-16 top-24 hidden h-72 w-72 text-gold-500/10 lg:block"
        filled
      />

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.88fr)] lg:items-start lg:gap-20">
        {/* Copy */}
        <div className="relative">
          <SectionTitle
            eyebrow={t.eyebrow}
            eyebrowEn={t.eyebrowEn}
            title={t.title}
            lead={t.lead}
            tone="light"
            titleId="introduction-title"
            index="01"
            titleClassName="max-w-[19ch]"
          />

          <RevealGroup className="mt-10 space-y-6" stagger={0.08}>
            {t.paragraphs.map((paragraph, i) => (
              <RevealItem key={i}>
                <div className="group flex gap-4 border-t border-[var(--hairline)] pt-5 first:border-t-0 first:pt-0">
                  <span className="numeral mt-1 w-7 shrink-0 text-label-xs font-bold text-gold-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className={
                      i === 0
                        ? 'text-[1.08rem] font-medium leading-[1.9] text-navy-900'
                        : 'text-body-md leading-[1.9] text-muted'
                    }
                  >
                    {paragraph}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-y-8 border-t border-gold-500/30 pt-8 sm:grid-cols-4" stagger={0.05}>
            {dict.hero.stats.map((stat) => (
              <RevealItem key={stat.label}>
                <div className="px-3 first:ps-0">
                  <p className="numeral text-display-md font-bold text-navy-900">
                    {stat.value}
                    <span className="text-gold-600">{stat.suffix}</span>
                  </p>
                  <p className="mt-2 text-label-2xs font-semibold leading-snug text-muted">
                    {stat.label}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Photography composition */}
        <RevealX from="end" className="relative mx-auto w-full max-w-md lg:mt-6 lg:max-w-none">
          <div className="relative">
            <div aria-hidden="true" className="arch-frame absolute inset-0 translate-x-3 translate-y-3 rtl:-translate-x-3" />
            <figure className="arch relative aspect-[4/5.2] w-full bg-navy-900">
              <Image
                src="/images/design/makkah-kaaba.jpg"
                alt={
                  isAr
                    ? 'الكعبة المشرفة والمسجد الحرام في مكة المكرمة'
                    : 'The Holy Kaaba and Masjid al-Haram in Makkah'
                }
                fill
                sizes="(max-width: 1024px) 92vw, 42vw"
                quality={84}
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/10" />

              <figcaption className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-navy-950/60 px-5 py-4 backdrop-blur-md sm:pe-36">
                <div className="flex items-center gap-2 text-gold-300">
                  <StarMark className="h-3.5 w-3.5" filled />
                  <p className="text-label-2xs font-bold uppercase tracking-[0.18em]">
                    {isAr ? 'مكة المكرمة' : 'Makkah al-Mukarramah'}
                  </p>
                </div>
                <p className="mt-2 font-display text-[1.3rem] font-bold leading-tight text-white">
                  {isAr ? 'أكبر سوق للإعاشة والضيافة' : "The world's largest catering market"}
                </p>
              </figcaption>
            </figure>
          </div>

          <figure className="absolute -bottom-10 -end-6 hidden w-40 overflow-hidden rounded-2xl border-4 border-[#FBF7EE] shadow-card-lg sm:block lg:w-48">
            <div className="relative aspect-[4/5] w-full bg-surface-alt">
              <Image
                src="/images/design/catering-buffet.jpg"
                alt={
                  isAr
                    ? 'بوفيه إعاشة فاخر في حدث كبير'
                    : 'A luxury catering buffet at a large event'
                }
                fill
                sizes="(max-width: 1024px) 40vw, 18vw"
                quality={82}
                className="object-cover"
              />
            </div>
          </figure>

          <div className="absolute -end-3 top-1/2 hidden -translate-y-1/2 lg:block">
            <p
              lang="en"
              className="rotate-90 font-inter text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-gold-600/70"
              dir="ltr"
            >
              MAKKAH · 2027
            </p>
          </div>
        </RevealX>
      </div>
    </Section>
  );
}
