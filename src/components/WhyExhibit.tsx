import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';
import { reasonIcons } from './ui/Icons';

export function WhyExhibit({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.whyExhibit;
  const isAr = locale === 'ar';

  return (
    <Section
      id="why-exhibit"
      tone="white"
      labelledBy="why-exhibit-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16">
        {/* Collage */}
        <RevealGroup className="relative order-2 lg:order-1 lg:sticky lg:top-28" stagger={0.1}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-600/25">
              <div className="relative aspect-[4/5] w-full bg-surface-alt">
                <Image
                  src="/images/design/chef-plating.jpg"
                  alt={isAr ? 'طاهٍ محترف يجهّز طبقاً في مطبخ إعاشة' : 'A professional chef plating a dish in a catering kitchen'}
                  fill
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  quality={84}
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-label-2xs font-bold uppercase tracking-[0.18em] text-gold-300">
                    {isAr ? 'خبرة تصنع الفرق' : 'Expertise that makes the difference'}
                  </p>
                </div>
              </div>
            </div>

            <figure className="absolute -bottom-8 -end-5 w-44 overflow-hidden rounded-2xl border-4 border-[#FBF7EE] shadow-card-lg sm:w-52">
              <div className="relative aspect-[4/3] w-full bg-surface-alt">
                <Image
                  src="/images/design/catering-buffet.jpg"
                  alt={isAr ? 'بوفيه إعاشة في حدث كبير' : 'A catering buffet at a large event'}
                  fill
                  sizes="(max-width: 1024px) 40vw, 18vw"
                  quality={82}
                  className="object-cover"
                />
              </div>
            </figure>

            <div className="absolute -end-4 top-6 hidden rounded-full border border-gold-600/40 bg-[#FBF7EE] px-4 py-2 sm:block">
              <p className="text-label-2xs font-bold uppercase tracking-[0.14em] text-gold-700">
                {isAr ? 'مكة · ٢٠٢٧' : 'MAKKAH · 2027'}
              </p>
            </div>
          </div>
        </RevealGroup>

        {/* Reasons */}
        <div className="order-1 lg:order-2">
          <SectionTitle
            eyebrow={t.eyebrow}
            eyebrowEn={t.eyebrowEn}
            title={t.title}
            lead={t.lead}
            tone="light"
            titleId="why-exhibit-title"
            index="09"
            titleClassName="max-w-[19ch]"
          />

          <RevealGroup as="ul" className="mt-9 border-t border-navy-900/10" stagger={0.07}>
            {t.items.map((item, i) => {
              const Icon = reasonIcons[i] ?? reasonIcons[0];
              return (
                <RevealItem as="li" key={item.number}>
                  <article className="group grid grid-cols-[auto_1fr] gap-4 border-b border-navy-900/10 py-5 transition-colors duration-300 sm:gap-6 sm:py-6">
                    <div className="flex flex-col items-center gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/35 bg-gold-500/10 text-gold-700 transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500/20">
                        <Icon width={18} height={18} />
                      </span>
                      <span className="numeral text-[0.62rem] font-bold text-gold-700/70">{item.number}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.25rem] font-bold leading-snug text-navy-900 sm:text-[1.35rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-body-sm leading-[1.85] text-muted">{item.description}</p>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>

      {/* CTA */}
      <RevealGroup className="mt-16" stagger={0.06}>
        <RevealItem>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-gold-500 via-gold-400 to-gold-300 px-6 py-8 sm:px-10 sm:py-10">
            <StarMark
              aria-hidden="true"
              className="pointer-events-none absolute -end-8 -top-10 h-48 w-48 text-navy-950/10"
              filled
            />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-label-2xs font-bold uppercase tracking-[0.18em] text-navy-900/65">
                  {isAr ? 'فرصة لا تتكرر' : 'A window that will not wait'}
                </p>
                <p className="mt-2 font-display text-[1.7rem] font-bold leading-snug text-navy-950 sm:text-[2.1rem]">
                  {t.ctaTitle}
                </p>
                <p className="mt-2 max-w-xl text-body-sm font-medium leading-relaxed text-navy-900/75">
                  {t.ctaBody}
                </p>
              </div>
              <a href="#register" className="btn btn-primary shrink-0 px-7 py-4">
                {t.ctaButton}
              </a>
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
