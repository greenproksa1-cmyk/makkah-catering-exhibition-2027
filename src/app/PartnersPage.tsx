'use client';

import { useState } from 'react';
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

/**
 * Strategic partners page.
 *
 * The six partner logos have very different proportions — Mawani and Aramco
 * are near-square, the Royal Commission is roughly three times wider than it is
 * tall — so every mark gets the same generous box and is fitted with
 * `object-contain`. Uniform cards, undistorted logos.
 *
 * Logo files live at public/images/partners/<id>.png. When one is missing the
 * card falls back to a typographic lockup, so the grid never breaks and the
 * page never shows a broken-image icon.
 */
export function PartnersPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.partners;
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

  return (
    <>
      <Header locale={locale} dict={dict} />

      <main id="main">
        {/* ---- Intro band ------------------------------------------------- */}
        <section className="on-dark relative isolate overflow-hidden bg-navy-950 pt-[calc(var(--header-h)+4rem)] pb-20 sm:pb-24">
          {/*
            The same photographic wash as the hero, held far back, so this page
            reads as its own document rather than a second landing page.
          */}
          <div aria-hidden="true" className="absolute inset-0 z-0 opacity-55">
            <Image
              src="/images/design/makkah-clock.jpg"
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
            className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-950 via-navy-950/78 to-navy-950"
          />
          <StarMark
            aria-hidden="true"
            className="pointer-events-none absolute -start-16 bottom-0 z-[1] hidden h-80 w-80 text-gold-400/10 lg:block"
            filled
          />

          <div className="shell relative z-10">
            <motion.div {...rise(0)} className="mb-7">
              <Image
                src="/brand/logo-mark-light.png"
                alt=""
                width={1753}
                height={1965}
                priority
                className="h-20 w-auto"
              />
            </motion.div>
            <motion.p {...rise(0.02)} className="eyebrow text-gold-300">
              {t.eyebrowEn}
            </motion.p>
            <motion.h1 {...rise(0.08)} className="mt-5 max-w-[20ch] font-display text-display-xl text-white">
              {t.title}
            </motion.h1>
            <motion.p {...rise(0.14)} className="mt-6 max-w-prose text-body-lg leading-[1.9] text-navy-100">
              {isAr ? t.leadAr : t.leadEn}
            </motion.p>
          </div>
        </section>

        {/* ---- The wall --------------------------------------------------- */}
        <section className="relative scroll-mt-24 border-b border-navy-100 bg-surface py-20 sm:py-24">
          <div className="shell">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
              {t.items.map((partner, i) => (
                <motion.li
                  key={partner.id}
                  {...rise(0.04 * i)}
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-navy-900/12 bg-[#FFFDF7] p-5 shadow-card transition-all duration-500',
                    'hover:-translate-y-1 hover:border-gold-600/50 hover:shadow-card-lg',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="numeral absolute end-4 top-4 text-label-2xs text-gold-600"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/*
                    Minimum height, not a fixed one. The six marks run from
                    0.78 to 4.23 in aspect ratio, so a fixed-height box would
                    crop the portrait ones down to less area than the rest and
                    the wall would stop reading as six peers. A minimum lets
                    each mark take the height its own width implies.
                  */}
                  <div className="flex h-28 items-center justify-center sm:h-32">
                    {partner.logo ? (
                      <PartnerMark
                        src={partner.logo}
                        alt={`${t.logoAlt} ${isAr ? partner.nameAr : partner.nameEn}`}
                        fallback={isAr ? partner.nameAr : partner.nameEn}
                        scale={partner.logoScale}
                        width={partner.logoW}
                        height={partner.logoH}
                      />
                    ) : (
                      <PartnerMonogram name={partner.nameEn} />
                    )}
                  </div>

                  <div className="mt-6 border-t border-[var(--hairline)] pt-4">
                    <h2 className="font-display text-[1.15rem] font-bold text-strong">
                      {isAr ? partner.nameAr : partner.nameEn}
                    </h2>
                    <p className="mt-1 text-body-xs text-muted">
                      {isAr ? partner.roleAr : partner.roleEn}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Acknowledgement */}
            <motion.div
              {...rise(0.3)}
              className="relative mt-14 flex flex-col gap-6 overflow-hidden rounded-[1.5rem] border border-gold-600/25 bg-[#FFFDF7] p-7 shadow-card sm:flex-row sm:items-center sm:gap-8 sm:p-8"
            >
              <span aria-hidden="true" className="accent-bar inset-x-0 top-0" />
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-display-sm font-bold text-strong">
                  {t.noteTitle}
                </h2>
                <p className="mt-2 max-w-prose text-body-md leading-[1.85] text-body">
                  {isAr ? t.noteAr : t.noteEn}
                </p>
              </div>
              <a href={`/${locale}#register`} className="btn btn-primary shrink-0 px-6 py-3">
                {dict.nav.cta}
              </a>
            </motion.div>

            <motion.div {...rise(0.36)} className="mt-10 text-center">
              <Link
                href={`/${locale}`}
                className="link-underline inline-block py-1 text-body-md font-semibold text-accent hover:text-strong"
              >
                {t.backHome}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer locale={locale} dict={dict} />
      <FloatingActions locale={locale} dict={dict} phoneRaw={dict.organizer.phoneRaw} />
    </>
  );
}

function PartnerMonogram({ name }: { name: string }) {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <span
      aria-hidden="true"
      className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-600/35 bg-gold-500/10 font-display text-display-sm font-bold tracking-wide text-gold-700"
    >
      {letters}
    </span>
  );
}

/**
 * The partner logo, or a typographic lockup if the file has not been supplied.
 * React state rather than an onError DOM patch, so it behaves properly.
 *
 * `scale` is the percentage of the card's width this mark should occupy, and
 * `width`/`height` are the file's real pixel dimensions. Both are needed: the
 * percentages come from `scripts/partner-logo-scale.py`, which equalises
 * rendered area across the six so the wall reads as six peers, and without the
 * true ratio a width-driven logo would be stretched to the wrong shape.
 */
function PartnerMark({
  src,
  alt,
  fallback,
  scale,
  width,
  height,
}: {
  src: string;
  alt: string;
  fallback: string;
  scale: number;
  width: number;
  height: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="px-2 text-center font-display text-body-md font-bold leading-snug text-navy-700">
        {fallback}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      // height follows from the real ratio, so the mark is never distorted
      className="h-auto max-h-full max-w-full"
      style={{ width: `${scale}%` }}
      onError={() => setFailed(true)}
    />
  );
}