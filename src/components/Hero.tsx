'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Countdown } from './Countdown';
import { StatFigure } from './CountUp';
import { Marquee } from './ui/Marquee';
import { StarMark } from './ui/Ornament';
import { IconCalendar, IconCompass, IconTarget } from './ui/Icons';

function splitTitle(title: string, isAr: boolean) {
  const year = title.match(/\b(20\d{2})\b/)?.[1] ?? '';
  const body = title.replace(/\s*\b20\d{2}\b\s*/, '').trim();

  if (isAr) {
    const index = body.indexOf('للإعاشة');
    if (index > 0) {
      return { first: body.slice(0, index).trim(), second: body.slice(index).trim(), year };
    }
    return { first: body, second: '', year };
  }

  const index = body.indexOf('&');
  if (index > 0) {
    return { first: body.slice(0, index).trim(), second: body.slice(index).trim(), year };
  }
  return { first: body, second: '', year };
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const isAr = locale === 'ar';
  const title = isAr ? dict.event.heroTitleAr : dict.event.heroTitleEn;
  const { first, second, year } = splitTitle(title, isAr);
  const subtitle = isAr ? dict.event.heroTitleEn : dict.event.heroTitleAr;

  const rise = (delay: number) => ({
    initial: reduce ? (false as const) : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const meta = [
    {
      key: 'date',
      Icon: IconCalendar,
      value: isAr ? dict.event.dateLineAr : dict.event.dateLineEn,
    },
    {
      key: 'place',
      Icon: IconCompass,
      value: isAr ? dict.event.placeAr : dict.event.placeEn,
    },
    {
      key: 'span',
      Icon: IconTarget,
      value: isAr ? dict.event.durationAr : dict.event.durationEn,
    },
  ];

  const marqueeItems = dict.sectors.items.map((sector) => (isAr ? sector.title : sector.en));

  return (
    <section
      ref={ref}
      id="top"
      className="on-dark grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950"
      aria-labelledby="hero-title"
    >
      {/* Makkah photograph */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={reduce ? undefined : { y: photoY, scale: photoScale }}
      >
        <Image
          src="/images/design/makkah-pilgrims.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-[center_45%]"
        />
      </motion.div>

      {/* Legibility and brand washes */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-navy-950/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-950/85 via-navy-950/25 to-navy-950"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 start-0 z-[1] w-full bg-gradient-to-r from-navy-950/92 via-navy-950/55 to-transparent lg:w-[62%] rtl:bg-gradient-to-l"
      />
      <div
        aria-hidden="true"
        className="absolute -end-24 top-24 z-[2] hidden h-[34rem] w-[24rem] rounded-[50%_50%_1rem_1rem] border border-gold-400/20 lg:block"
      />
      <StarMark
        className="star-watermark -end-10 top-16 z-[2] hidden h-64 w-64 text-gold-400/20 lg:block"
        filled
      />

      <motion.div
        className="shell relative z-10 flex w-full flex-1 flex-col justify-end pb-8 pt-[calc(var(--header-h)+3.5rem)] sm:pb-10 sm:pt-[calc(var(--header-h)+5rem)]"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end lg:gap-14">
          {/* ---- Title block ------------------------------------------------ */}
          <div className="max-w-3xl">
            <motion.div {...rise(0.04)} className="flex items-center gap-3">
              <StarMark className="h-4 w-4 text-gold-400" filled />
              <p className="text-label-2xs font-bold uppercase tracking-[0.2em] text-gold-200">
                {isAr ? 'من قلب مكة المكرمة' : 'From the heart of Makkah'}
              </p>
              <span className="h-px w-10 bg-gold-500/60" />
              <p className="numeral text-label-2xs font-semibold tracking-[0.12em] text-white/70">
                {year || '2027'}
              </p>
            </motion.div>

            <motion.h1
              {...rise(0.1)}
              id="hero-title"
              className="mt-6 font-display text-[clamp(2.7rem,6.3vw,5.7rem)] font-bold leading-[1.03] tracking-[-0.01em] text-white"
            >
              <span className="block">{first}</span>
              {second && (
                <span className="text-gold-gradient mt-1 block pb-1">{second}</span>
              )}
            </motion.h1>

            <motion.div {...rise(0.18)} className="mt-5 flex flex-wrap items-center gap-4">
              <p
                lang={isAr ? 'en' : 'ar'}
                dir={isAr ? 'ltr' : 'rtl'}
                className="font-inter text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60 sm:text-label-xs"
              >
                {subtitle}
              </p>
              <span aria-hidden="true" className="hidden h-px w-12 bg-gold-500/50 sm:block" />
              <p className="text-label-2xs font-semibold text-gold-200/90">
                {isAr ? '١٠ – ١٢ يناير ٢٠٢٧' : '10 – 12 January 2027'}
              </p>
            </motion.div>

            <motion.p
              {...rise(0.24)}
              lang="en"
              dir="ltr"
              className="mt-7 max-w-[31ch] border-s border-gold-500/55 ps-5 font-display text-[1.35rem] italic leading-snug text-white/90 sm:text-[1.6rem]"
            >
              {dict.event.tagline}
            </motion.p>

            <motion.div {...rise(0.32)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#register" className="btn btn-accent px-8 py-4 text-body-sm">
                {dict.hero.ctaPrimary}
              </a>
              <a href="#register" className="btn btn-ghost-dark px-8 py-4 text-body-sm">
                {dict.hero.ctaSecondary}
              </a>
            </motion.div>

            <motion.ul
              {...rise(0.38)}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/12 pt-5"
            >
              {meta.map(({ key, Icon, value }) => (
                <li key={key} className="flex items-center gap-2.5">
                  <Icon width={17} height={17} className="shrink-0 text-gold-400" />
                  <span className="text-label-sm font-semibold text-white/85">{value}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ---- Countdown card -------------------------------------------- */}
          <motion.div
            {...rise(0.3)}
            role="group"
            aria-label={dict.hero.countdownLabel}
            className="group relative w-full rounded-[1.75rem] border border-gold-400/30 bg-navy-950/55 p-6 shadow-card-lg backdrop-blur-xl sm:p-7 lg:w-[21rem]"
          >
            <span aria-hidden="true" className="absolute -top-px inset-x-10 h-px bg-gold-gradient" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-label-2xs font-bold uppercase tracking-[0.18em] text-gold-300">
                  {dict.hero.countdownLabel}
                </p>
                <p
                  className="mt-2 font-display text-[1.35rem] font-bold leading-tight text-white"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  {isAr ? dict.event.dateLineAr : dict.event.dateLineEn}
                </p>
                <p
                  lang={isAr ? 'en' : 'ar'}
                  dir={isAr ? 'ltr' : 'rtl'}
                  className="mt-1 text-label-2xs uppercase tracking-[0.1em] text-white/50"
                >
                  {isAr ? dict.event.dateLineEn : dict.event.dateLineAr}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-400/35 text-gold-300">
                <StarMark className="h-5 w-5" filled />
              </span>
            </div>

            <div className="mt-5 border-t border-white/12 pt-5">
              <Countdown targetISO={dict.event.startISO} dict={dict} locale={locale} tone="dark" />
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-full border border-gold-400/25 bg-gold-500/10 px-4 py-2.5">
              <span className="text-label-2xs font-bold text-gold-200">{dict.earlyBird.badge}</span>
              <span className="text-label-2xs text-white/65">
                {isAr ? 'حتى ١٥ نوفمبر ٢٠٢٦' : 'until 15 Nov 2026'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ---- Facts strip ------------------------------------------------- */}
        <motion.dl
          {...rise(0.44)}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/12 pt-7 sm:mt-14 sm:grid-cols-4 sm:gap-x-10"
        >
          {dict.hero.stats.map((stat) => (
            <div key={stat.label} className="min-w-0 border-s border-gold-500/30 ps-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <StatFigure value={stat.value} suffix={stat.suffix} label={stat.label} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* ---- Sector ticker ------------------------------------------------- */}
      <div className="relative z-10 border-t border-gold-500/25 bg-navy-950/80 py-3 backdrop-blur">
        <Marquee
          items={marqueeItems}
          className="text-label-2xs font-semibold uppercase tracking-[0.14em] text-gold-200/80"
          duration={54}
        />
      </div>

      {/* Scroll cue */}
      <a
        href="#introduction"
        aria-label={isAr ? dict.event.scrollLabelAr : dict.event.scrollLabelEn}
        className="absolute bottom-24 end-6 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-gold-400/35 text-gold-300 transition hover:border-gold-300 hover:text-gold-200 lg:flex"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 animate-float-slow" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 4v14M6 12l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
