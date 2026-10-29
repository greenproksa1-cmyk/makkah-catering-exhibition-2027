import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';
import { objectiveGroupIcons } from './ui/Icons';

export function Objectives({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.objectives;
  const items = t.items;
  const isAr = locale === 'ar';

  return (
    <Section
      id="objectives"
      tone="white"
      labelledBy="objectives-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow={t.eyebrow}
          eyebrowEn={t.eyebrowEn}
          title={t.title}
          tone="light"
          titleId="objectives-title"
          index="05"
          className="max-w-3xl"
          titleClassName="max-w-[17ch]"
        />
        <p className="max-w-sm border-s border-gold-600/40 ps-5 text-body-sm leading-relaxed text-muted lg:mb-2">
          {t.hint}
        </p>
      </div>

      <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05} amount={0.05}>
        {items.map((item, index) => {
          const Icon = objectiveGroupIcons[Math.floor(index / 3)] ?? objectiveGroupIcons[0];
          const featured = index === 0;

          return (
            <RevealItem as="li" key={item.number} className={featured ? 'sm:col-span-2' : undefined}>
              <article
                className={
                  featured
                    ? 'panel-pine group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.6rem] p-6 text-white sm:p-8'
                    : 'group relative flex h-full min-h-[15rem] flex-col rounded-[1.6rem] border border-navy-900/12 bg-[#FFFDF7] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-600/50 hover:bg-navy-950 hover:text-white hover:shadow-card-lg'
                }
              >
                <StarMark
                  aria-hidden="true"
                  className={
                    featured
                      ? 'pointer-events-none absolute -end-8 -top-8 h-40 w-40 text-gold-400/15'
                      : 'pointer-events-none absolute -end-6 -bottom-6 h-28 w-28 text-gold-600/[0.06] transition-colors duration-500 group-hover:text-gold-400/15'
                  }
                  filled
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={
                      featured
                        ? 'flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300'
                        : 'flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/30 bg-gold-500/10 text-gold-700 transition-colors duration-500 group-hover:border-gold-400/40 group-hover:text-gold-300'
                    }
                  >
                    <Icon width={19} height={19} />
                  </span>
                  <span
                    className={
                      featured
                        ? 'numeral font-display text-[3.6rem] leading-none text-gold-400/35'
                        : 'numeral font-display text-[3rem] leading-none text-gold-600/20 transition-colors duration-500 group-hover:text-gold-400/40'
                    }
                  >
                    {item.number}
                  </span>
                </div>

                <div className="relative mt-6">
                  <h3
                    className={
                      featured
                        ? 'font-display text-[1.55rem] font-bold leading-snug text-white sm:text-[1.8rem]'
                        : 'font-display text-[1.2rem] font-bold leading-snug text-navy-900 transition-colors duration-500 group-hover:text-white'
                    }
                  >
                    {item.title}
                  </h3>
                  <p
                    className={
                      featured
                        ? 'mt-3 max-w-xl text-body-sm leading-[1.85] text-navy-100'
                        : 'mt-3 text-body-xs leading-[1.8] text-muted transition-colors duration-500 group-hover:text-navy-100'
                    }
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Hub summary */}
      <RevealGroup className="mt-8" stagger={0.06}>
        <RevealItem>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.6rem] border border-gold-600/30 bg-gradient-to-l from-gold-500/15 via-transparent to-transparent px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-5">
              <span className="font-display text-[3rem] font-bold leading-none text-gold-600">
                {items.length}
              </span>
              <div>
                <p className="text-body-md font-bold text-navy-900">
                  {isAr ? t.hubLabelAr : t.hubLabelEn}
                </p>
                <p className="mt-1 max-w-md text-body-sm text-muted">
                  {isAr
                    ? 'أهداف مترابطة تصنع منظومة إعاشة واحدة، من التعاقد إلى التشغيل.'
                    : 'Interlocking objectives that build one catering ecosystem, from contract to operation.'}
                </p>
              </div>
            </div>
            <a href="#register" className="btn btn-primary shrink-0">
              {dict.nav.cta}
            </a>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
