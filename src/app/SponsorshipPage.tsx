'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { StarMark } from '@/components/ui/Ornament';

const money = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

function Check() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold-600/40 bg-gold-500/12 text-gold-700">
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3" fill="none">
        <path
          d="M3.5 8.4 6.4 11.2 12.5 4.9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Sponsorship packages page.
 *
 * The six tiers come straight from the 2027 sponsorship deck: space, VIP
 * invitations and visibility rights. Prices are shown exactly as published;
 * the three co-sponsor tiers are quoted on request, so they render a call to
 * action instead of a number.
 */
export function SponsorshipPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.sponsorship;
  const isAr = locale === 'ar';
  const reduce = useReducedMotion() ?? false;

  const rise = (delay: number) =>
    reduce
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const cheapest = t.tiers.reduce<number | null>((min, tier) => {
    if (tier.price === null) return min;
    return min === null ? tier.price : Math.min(min, tier.price);
  }, null);

  const biggest = Math.max(...t.tiers.map((tier) => tier.area));

  return (
    <>
      <Header locale={locale} dict={dict} />

      <main id="main">
        {/* ---- Intro band ------------------------------------------------- */}
        <section className="on-dark relative isolate overflow-hidden bg-navy-950 pt-[calc(var(--header-h)+4rem)] pb-20 sm:pb-24">
          <div aria-hidden="true" className="absolute inset-0 z-0 opacity-45">
            <Image
              src="/images/hero-catering.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={74}
              className="object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-950 via-navy-950/82 to-navy-950"
          />
          <StarMark
            aria-hidden="true"
            className="pointer-events-none absolute -start-16 bottom-0 z-[1] hidden h-80 w-80 text-gold-400/10 lg:block"
            filled
          />

          <div className="shell relative z-10">
            <motion.p {...rise(0.02)} className="eyebrow text-gold-300">
              {t.eyebrowEn}
            </motion.p>
            <motion.h1
              {...rise(0.08)}
              className="mt-5 max-w-[22ch] font-display text-display-xl text-white"
            >
              {t.title}
            </motion.h1>
            <motion.p
              {...rise(0.14)}
              className="mt-6 max-w-prose text-body-lg leading-[1.9] text-navy-100"
            >
              {t.lead}
            </motion.p>

            <motion.dl
              {...rise(0.2)}
              className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6"
            >
              <div>
                <dt className="text-label-2xs font-semibold uppercase tracking-[0.14em] text-gold-300/80">
                  {isAr ? 'الباقات' : 'Packages'}
                </dt>
                <dd className="numeral mt-1 font-display text-[1.7rem] font-bold text-white">
                  {t.tiers.length}
                </dd>
              </div>
              <div>
                <dt className="text-label-2xs font-semibold uppercase tracking-[0.14em] text-gold-300/80">
                  {isAr ? 'تبدأ من' : 'Starting at'}
                </dt>
                <dd className="numeral mt-1 font-display text-[1.7rem] font-bold text-white">
                  {cheapest !== null ? money.format(cheapest) : '—'}
                  <span className="ms-1 text-label-xs font-semibold text-white/60">{t.currency}</span>
                </dd>
              </div>
              <div>
                <dt className="text-label-2xs font-semibold uppercase tracking-[0.14em] text-gold-300/80">
                  {isAr ? 'حتى' : 'Up to'}
                </dt>
                <dd className="numeral mt-1 font-display text-[1.7rem] font-bold text-white">
                  {biggest}
                  <span className="ms-1 text-label-xs font-semibold text-white/60">
                    {isAr ? 'م²' : 'm²'}
                  </span>
                </dd>
              </div>
            </motion.dl>
          </div>
        </section>

        {/* ---- Packages --------------------------------------------------- */}
        <section className="relative scroll-mt-24 border-b border-navy-100 bg-surface py-20 sm:py-24">
          <div className="shell">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">{t.packagesEyebrow}</p>
                <h2 className="mt-4 font-display text-display-md text-navy-900">{t.packagesTitle}</h2>
              </div>
              <p className="max-w-sm text-body-xs leading-relaxed text-muted">{t.ctaNote}</p>
            </div>

            <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {t.tiers.map((tier, i) => {
                const name = isAr ? tier.nameAr : tier.nameEn;
                const tagline = isAr ? tier.taglineAr : tier.taglineEn;
                const featured = tier.featured;

                return (
                  <motion.li
                    key={tier.id}
                    id={tier.id}
                    {...rise(0.04 * i)}
                    className="h-full scroll-mt-28"
                  >
                    <article
                      className={cn(
                        'group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border p-6 transition-all duration-500 sm:p-7',
                        featured
                          ? 'border-gold-500/60 bg-navy-950 text-white shadow-card-lg'
                          : 'border-navy-900/12 bg-[#FFFDF7] text-navy-900 hover:-translate-y-1 hover:border-gold-600/50 hover:shadow-card',
                      )}
                    >
                      {featured ? (
                        <>
                          <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-25" />
                          <StarMark
                            aria-hidden="true"
                            className="pointer-events-none absolute -end-8 -top-8 h-32 w-32 text-gold-400/10"
                            filled
                          />
                        </>
                      ) : null}

                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <p
                            className={cn(
                              'numeral text-label-xs font-bold',
                              featured ? 'text-gold-400' : 'text-gold-600',
                            )}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </p>
                          <h3
                            className={cn(
                              'mt-2 font-display text-[1.55rem] font-bold leading-tight',
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

                      <div
                        className={cn(
                          'relative mt-4 flex flex-wrap items-baseline gap-x-2 border-t pt-5',
                          featured ? 'border-white/15' : 'border-navy-900/10',
                        )}
                      >
                        <span
                          className={cn(
                            'numeral text-[2.3rem] font-bold leading-none',
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
                      </div>

                      <p
                        className={cn(
                          'relative mt-3 flex items-center gap-2 text-label-xs font-semibold',
                          featured ? 'text-gold-200/85' : 'text-gold-700',
                        )}
                      >
                        <StarMark className="h-3 w-3" filled />
                        {t.areaLabel}: {tier.area} {isAr ? 'م²' : 'm²'}
                      </p>
                      <p
                        className={cn(
                          'relative mt-2 text-body-xs leading-relaxed',
                          featured ? 'text-white/70' : 'text-muted',
                        )}
                      >
                        {tagline}
                      </p>

                      <p
                        className={cn(
                          'relative mt-6 text-label-2xs font-bold uppercase tracking-[0.16em]',
                          featured ? 'text-gold-300/80' : 'text-gold-700/80',
                        )}
                      >
                        {t.benefitsTitle}
                      </p>
                      <ul className="relative mt-3 space-y-2.5">
                        {tier.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className={cn(
                              'flex items-start gap-2.5 text-body-xs leading-relaxed',
                              featured ? 'text-white/78' : 'text-muted',
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
                        href={`/${locale}#register`}
                        className={cn(
                          'relative mt-7 w-full text-center',
                          featured ? 'btn btn-accent' : 'btn btn-outline',
                        )}
                      >
                        {t.cta}
                      </Link>
                    </article>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ---- Comparison ------------------------------------------------- */}
        <section id="compare" className="scroll-mt-24 bg-surface-alt py-20 sm:py-24">
          <div className="shell">
            <div className="max-w-2xl">
              <p className="eyebrow">{t.tableEyebrow}</p>
              <h2 className="mt-4 font-display text-display-md text-navy-900">{t.tableTitle}</h2>
              <p className="mt-4 text-body-sm leading-relaxed text-muted">{t.tableHint}</p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-[1.4rem] border border-navy-900/12 bg-[#FFFDF7] shadow-card">
              <table className="w-full min-w-[46rem] border-collapse text-start">
                <caption className="sr-only">{t.tableTitle}</caption>
                <thead>
                  <tr className="bg-navy-950 text-white">
                    <th scope="col" className="sticky start-0 z-10 bg-navy-950 px-5 py-4 text-start text-label-xs font-bold">
                      {t.benefitColumn}
                    </th>
                    {t.tiers.map((tier) => (
                      <th
                        key={tier.id}
                        scope="col"
                        className={cn(
                          'px-3 py-4 text-center text-label-xs font-bold',
                          tier.featured ? 'text-gold-300' : 'text-white/85',
                        )}
                      >
                        {isAr ? tier.nameAr : tier.nameEn}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparison.rows.map((row) => (
                    <tr key={row.labelEn} className="border-t border-navy-900/10">
                      <th
                        scope="row"
                        className="sticky start-0 z-10 bg-[#FFFDF7] px-5 py-3.5 text-start text-body-xs font-semibold text-navy-900"
                      >
                        {isAr ? row.labelAr : row.labelEn}
                      </th>
                      {row.values.map((value, i) => (
                        <td key={i} className="px-3 py-3.5 text-center align-middle">
                          {row.type === 'check' ? (
                            value === 'yes' ? (
                              <span className="inline-flex justify-center">
                                <Check />
                              </span>
                            ) : (
                              <span aria-hidden="true" className="text-muted/60">
                                —
                              </span>
                            )
                          ) : row.type === 'count' ? (
                            value !== '' && Number(value) > 0 ? (
                              <span className="numeral text-body-sm font-bold text-navy-900">
                                {value}
                              </span>
                            ) : (
                              <span aria-hidden="true" className="text-muted/60">
                                —
                              </span>
                            )
                          ) : (
                            <span className="numeral text-body-sm font-bold text-navy-900">
                              {value} {isAr ? 'م²' : 'm²'}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---- Notes + custom package ------------------------------------ */}
        <section className="on-dark relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
          <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-20" />
          <div className="shell relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-gold-300">{t.noteTitle}</p>
              <ul className="mt-6 space-y-3">
                {t.notes.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-body-sm leading-relaxed text-navy-100">
                    <StarMark className="mt-1 h-3 w-3 shrink-0 text-gold-500" filled />
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.6rem] border border-gold-500/35 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-8">
              <h2 className="font-display text-[1.7rem] font-bold leading-tight text-white">
                {t.contactTitle}
              </h2>
              <p className="mt-3 text-body-sm leading-relaxed text-navy-100">{t.contactBody}</p>
              <Link href={`/${locale}#register`} className="btn btn-accent mt-6 w-full">
                {t.contactCta}
              </Link>
              <a
                href={`https://wa.me/${dict.organizer.phoneRaw.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-dark mt-3 w-full"
              >
                {dict.organizer.whatsappLabel}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} dict={dict} />
      <FloatingActions locale={locale} dict={dict} phoneRaw={dict.organizer.phoneRaw} />
    </>
  );
}
