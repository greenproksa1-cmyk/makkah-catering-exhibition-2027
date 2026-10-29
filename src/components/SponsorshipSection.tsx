import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';

const money = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** Two-digit chapter numerals for the package cards. */
const numeral = (i: number) => String(i + 1).padStart(2, '0');

/**
 * Sponsorship teaser on the landing page. Shows the three headline packages
 * and sends the reader to the full sponsorship page for all six and the
 * comparison table.
 */
export function SponsorshipSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.sponsorship;
  const isAr = locale === 'ar';
  const headline = t.tiers.filter((tier) => tier.price !== null).slice(0, 3);

  return (
    <Section
      id="sponsorship"
      tone="soft"
      labelledBy="sponsorship-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -start-20 bottom-0 hidden h-80 w-80 text-gold-600/10 lg:block"
        filled
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow={t.eyebrow}
          eyebrowEn={t.eyebrowEn}
          title={t.homeTitle}
          lead={t.homeLead}
          tone="light"
          titleId="sponsorship-title"
          index="12"
          className="max-w-2xl"
          titleClassName="max-w-[18ch]"
        />
        <Link href={`/${locale}/sponsorship`} className="btn btn-primary shrink-0">
          {t.allCta}
        </Link>
      </div>

      <RevealGroup as="ul" className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.07}>
        {headline.map((tier, i) => {
          const name = isAr ? tier.nameAr : tier.nameEn;
          const tagline = isAr ? tier.taglineAr : tier.taglineEn;
          const featured = tier.featured;

          return (
            <RevealItem as="li" key={tier.id} className="h-full">
              <article
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border p-6 transition-all duration-500 sm:p-7',
                  featured
                    ? 'border-gold-500/60 bg-navy-950 text-white shadow-card-lg'
                    : 'border-navy-900/12 bg-[#FFFDF7] text-navy-900 hover:-translate-y-1 hover:border-gold-600/50 hover:shadow-card',
                )}
              >
                {featured ? (
                  <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-25" />
                ) : null}

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={cn(
                        'numeral text-label-xs font-bold',
                        featured ? 'text-gold-400' : 'text-gold-600',
                      )}
                    >
                      {numeral(i)}
                    </p>
                    <h3
                      className={cn(
                        'mt-2 font-display text-[1.5rem] font-bold leading-tight',
                        featured ? 'text-white' : 'text-navy-900',
                      )}
                    >
                      {name}
                    </h3>
                  </div>
                  {featured ? (
                    <span className="shrink-0 rounded-full border border-gold-400/50 bg-gold-500/15 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-gold-200">
                      {t.featured}
                    </span>
                  ) : null}
                </div>

                <p
                  className={cn(
                    'relative mt-4 flex flex-wrap items-baseline gap-x-2 border-t pt-5',
                    featured ? 'border-white/15' : 'border-navy-900/10',
                  )}
                >
                  <span
                    className={cn(
                      'numeral text-[2.1rem] font-bold leading-none',
                      featured ? 'text-gold-300' : 'text-navy-900',
                    )}
                  >
                    {tier.price !== null ? money.format(tier.price) : t.priceOnRequest}
                  </span>
                  {tier.price !== null ? (
                    <span
                      className={cn(
                        'text-label-xs font-semibold',
                        featured ? 'text-white/70' : 'text-muted',
                      )}
                    >
                      {t.currency}
                    </span>
                  ) : null}
                </p>

                <p
                  className={cn(
                    'relative mt-2 inline-flex items-center gap-2 text-label-xs font-semibold',
                    featured ? 'text-gold-200/85' : 'text-gold-700',
                  )}
                >
                  <StarMark className="h-3 w-3" filled />
                  {tier.area} {isAr ? 'م²' : 'm²'} · {tagline}
                </p>

                <ul className="relative mt-5 space-y-2.5 border-t border-current/10 pt-5">
                  {tier.benefits.slice(0, 4).map((benefit) => (
                    <li
                      key={benefit}
                      className={cn(
                        'flex items-start gap-2.5 text-body-xs leading-relaxed',
                        featured ? 'text-white/75' : 'text-muted',
                      )}
                    >
                      <StarMark
                        className={cn(
                          'mt-[0.35rem] h-2.5 w-2.5 shrink-0',
                          featured ? 'text-gold-400' : 'text-gold-600',
                        )}
                        filled
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/sponsorship#${tier.id}`}
                  className={cn(
                    'relative mt-6 inline-flex items-center justify-between gap-3 border-t pt-4 text-label-xs font-bold transition-colors',
                    featured
                      ? 'border-white/15 text-gold-200 hover:text-white'
                      : 'border-navy-900/10 text-navy-900 hover:text-gold-700',
                  )}
                >
                  {t.cta}
                  <span aria-hidden="true" className="text-gold-500">
                    {isAr ? '←' : '→'}
                  </span>
                </Link>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
