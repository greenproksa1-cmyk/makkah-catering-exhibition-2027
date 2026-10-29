'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { Marquee } from './ui/Marquee';
import { StarMark } from './ui/Ornament';
import { stationIcons } from './ui/Icons';

export function EventExperience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.experience;
  const stations = t.items;
  const isAr = locale === 'ar';

  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const activeNumber = pinned ?? hovered ?? focused;
  const reduce = useReducedMotion() ?? false;

  const renderGroup = (group: typeof stations, offset: number) => (
    <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.05} amount={0.06}>
      {group.map((station, idx) => {
        const Icon = stationIcons[offset + idx] ?? stationIcons[0];
        const isActive = activeNumber === station.number;

        return (
          <RevealItem as="li" key={station.number}>
            <button
              type="button"
              onClick={() => setPinned((prev) => (prev === station.number ? null : station.number))}
              onMouseEnter={() => setHovered(station.number)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setFocused(station.number)}
              onBlur={() => setFocused(null)}
              aria-pressed={isActive}
              className={cn(
                'group relative flex h-full min-h-[12.5rem] w-full flex-col overflow-hidden rounded-[1.35rem] border p-5 text-start transition-all duration-500',
                isActive
                  ? 'border-gold-500/60 bg-gradient-to-b from-gold-500/15 to-transparent'
                  : 'border-white/12 bg-white/[0.03] hover:border-gold-500/35 hover:bg-white/[0.05]',
              )}
            >
              <StarMark
                aria-hidden="true"
                className="pointer-events-none absolute -end-5 -top-5 h-24 w-24 text-gold-400/[0.07] transition-opacity duration-500 group-hover:text-gold-400/15"
                filled
              />
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300',
                    isActive
                      ? 'border-gold-400/60 bg-gold-500/15 text-gold-200'
                      : 'border-white/15 text-white/55 group-hover:text-gold-200',
                  )}
                >
                  <Icon width={17} height={17} />
                </span>
                <span className="numeral text-label-xs text-gold-400/80">{station.number}</span>
              </div>

              <h3 className="mt-4 font-display text-[1.02rem] font-bold leading-snug text-white">
                {station.title}
              </h3>
              <p lang="en" className="mt-1.5 font-inter text-[0.58rem] uppercase leading-tight tracking-[0.12em] text-white/40">
                {station.en}
              </p>

              <motion.div
                initial={false}
                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-auto overflow-hidden"
                aria-hidden={!isActive}
              >
                <p className="mt-4 border-t border-white/12 pt-3 text-[0.78rem] leading-[1.7] text-navy-100">
                  {station.description}
                </p>
              </motion.div>
            </button>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );

  return (
    <Section
      id="experience"
      tone="dark"
      labelledBy="experience-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <SectionTitle
        eyebrow={t.eyebrow}
        eyebrowEn={t.eyebrowEn}
        title={t.title}
        lead={t.lead}
        tone="dark"
        titleId="experience-title"
        index="08"
        titleClassName="max-w-[19ch]"
      />

      {/* Live programme band */}
      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {[
          {
            src: '/images/conference-hall.jpg',
            label: isAr ? 'المؤتمر وجلسات القرار' : 'Conference & decision panels',
            tag: isAr ? 'برنامج المعرفة' : 'Knowledge programme',
          },
          {
            src: '/images/design/grill.jpg',
            label: isAr ? 'مطبخ حي وتجارب طهي' : 'Live kitchen & culinary demos',
            tag: isAr ? 'برنامج التجربة' : 'Experience programme',
          },
        ].map((band) => (
          <figure key={band.src} className="group relative h-44 overflow-hidden rounded-[1.5rem] bg-navy-900 sm:h-52">
            <Image
              src={band.src}
              alt={band.label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              quality={82}
              className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />
            <figcaption className="absolute inset-x-5 bottom-4">
              <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300">{band.tag}</p>
              <p className="mt-1 font-display text-[1.25rem] font-bold text-white">{band.label}</p>
            </figcaption>
            <StarMark className="absolute end-4 top-4 h-4 w-4 text-gold-400/70" filled />
          </figure>
        ))}
      </div>

      <div className="mt-8 border-y border-white/10 py-3">
        <Marquee
          items={stations.map((s) => s.en)}
          className="text-label-2xs font-semibold uppercase tracking-[0.16em] text-white/35"
          duration={60}
          reverse
        />
      </div>

      <div className="mt-10 space-y-10">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <StarMark className="h-3.5 w-3.5 text-gold-500" filled />
            <p className="text-label-2xs font-bold uppercase tracking-[0.18em] text-gold-300/80">{t.groupA}</p>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          {renderGroup(stations.slice(0, 5), 0)}
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <StarMark className="h-3.5 w-3.5 text-gold-500" filled />
            <p className="text-label-2xs font-bold uppercase tracking-[0.18em] text-gold-300/80">{t.groupB}</p>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          {renderGroup(stations.slice(5, 10), 5)}
        </div>
      </div>

      <RevealGroup className="mt-12" stagger={0.06}>
        <RevealItem>
          <div className="flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-gold-500/25 bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-5">
              <span className="font-display text-[3.4rem] font-bold leading-none text-gold-400">{stations.length}</span>
              <div>
                <p className="font-display text-[1.2rem] font-bold text-white">
                  {isAr
                    ? 'برنامج متكامل من الفعاليات والأنشطة المصاحبة'
                    : 'An integrated programme of activities and side events'}
                </p>
                <p className="mt-1 text-body-sm text-white/55">
                  {isAr
                    ? 'تعزّز القيمة التجارية والمعرفية للحدث من أوله إلى آخره.'
                    : 'Enhancing the commercial and knowledge value of the event from start to finish.'}
                </p>
              </div>
            </div>
            <a href="#register" className="btn btn-gold-outline shrink-0">
              {dict.nav.cta}
            </a>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
