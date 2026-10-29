'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Section, SectionTitle } from './ui/Section';
import { StarMark } from './ui/Ornament';
import { sectorIcons } from './ui/Icons';

const FALLBACK_IMAGES: Record<string, string> = {
  food: '/images/design/grill.jpg',
  equipment: '/images/intro-kitchen.jpg',
  catering: '/images/design/catering-buffet.jpg',
  coldchain: '/images/design/warehouse.jpg',
  packaging: '/images/design/coffee.jpg',
  technology: '/images/conference-hall.jpg',
};

const FALLBACK_ALT: Record<string, { ar: string; en: string }> = {
  coldchain: { ar: 'مستودع تبريد وتوريد أغذية', en: 'A cold-chain and food supply warehouse' },
  packaging: { ar: 'أكواب ومشروبات جاهزة للتقديم', en: 'Prepared beverages and serving cups' },
  technology: { ar: 'قاعة مؤتمرات وتقنيات إدارة المطابخ', en: 'A conference hall and kitchen management technology' },
};

export function ExhibitorEcosystem({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [activeId, setActiveId] = useState(dict.ecosystem.items[0].id);
  const reduce = useReducedMotion() ?? false;
  const sectors = dict.ecosystem.items;
  const active = sectors.find((s) => s.id === activeId) ?? sectors[0];
  const ActiveIcon = sectorIcons[active.id] ?? sectorIcons.logistics;
  const isAr = locale === 'ar';

  const image = active.image || FALLBACK_IMAGES[active.id] || FALLBACK_IMAGES.food;
  const imageAlt = isAr
    ? active.imageAltAr ?? FALLBACK_ALT[active.id]?.ar ?? active.title
    : FALLBACK_ALT[active.id]?.en ?? active.en;

  return (
    <Section
      id="ecosystem"
      tone="dark"
      labelledBy="ecosystem-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-40" />
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -start-20 top-1/3 h-80 w-80 text-gold-400/10"
        filled
      />

      <SectionTitle
        eyebrow={dict.ecosystem.eyebrow}
        eyebrowEn={dict.ecosystem.eyebrowEn}
        title={dict.ecosystem.title}
        lead={dict.ecosystem.lead}
        tone="dark"
        titleId="ecosystem-title"
        index="06"
        titleClassName="max-w-[18ch]"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        {/* Preview */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div aria-hidden="true" className="arch-frame absolute inset-0 translate-x-3 translate-y-3 rtl:-translate-x-3" />
            <div className="arch relative aspect-[4/4.6] w-full bg-navy-900">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  quality={84}
                  className="object-cover"
                />
              </motion.div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />

              <div className="absolute inset-x-5 bottom-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 bg-navy-950/40 text-gold-300 backdrop-blur">
                    <ActiveIcon width={20} height={20} />
                  </span>
                  <div>
                    <p className="numeral text-label-xs text-gold-400">{active.number}</p>
                    <h3 className="font-display text-[1.5rem] font-bold leading-tight text-white">
                      {isAr ? active.title : active.en}
                    </h3>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/15 pt-3">
                  <p className="text-label-2xs uppercase tracking-[0.14em] text-white/60">
                    {isAr ? dict.ecosystem.hubAr : dict.ecosystem.hubEn}
                  </p>
                  <p className="text-label-2xs text-gold-300/80">
                    {active.details.length} {isAr ? 'فئة' : 'categories'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sector selector + details */}
        <div>
          <ul className="border-t border-white/12">
            {sectors.map((sector) => {
              const isActive = sector.id === activeId;
              const Icon = sectorIcons[sector.id] ?? sectorIcons.logistics;

              return (
                <li key={sector.id} className="border-b border-white/12">
                  <button
                    type="button"
                    onClick={() => setActiveId(sector.id)}
                    onMouseEnter={() => setActiveId(sector.id)}
                    onFocus={() => setActiveId(sector.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'group flex w-full items-center gap-4 py-4 text-start transition-colors duration-300 sm:gap-5 sm:py-5',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white',
                    )}
                  >
                    <span
                      className={cn(
                        'numeral w-7 shrink-0 text-label-xs transition-colors duration-300',
                        isActive ? 'text-gold-400' : 'text-white/35',
                      )}
                    >
                      {sector.number}
                    </span>
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                        isActive
                          ? 'border-gold-400/50 bg-gold-500/10 text-gold-300'
                          : 'border-white/15 text-white/45 group-hover:border-white/30 group-hover:text-white/70',
                      )}
                    >
                      <Icon width={17} height={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1.08rem] font-bold leading-snug sm:text-[1.2rem]">
                        {isAr ? sector.title : sector.en}
                      </span>
                      <span lang="en" className="mt-0.5 block font-inter text-[0.62rem] uppercase tracking-[0.12em] text-white/40">
                        {isAr ? sector.en : sector.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-px w-8 shrink-0 transition-all duration-300',
                        isActive ? 'w-12 bg-gold-500' : 'bg-white/20 group-hover:bg-white/40',
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div id="sector-detail" aria-live="polite" className="mt-7">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[1.4rem] border border-gold-500/20 bg-white/[0.035] p-5 backdrop-blur-sm sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300">
                  {isAr ? dict.ecosystem.selectPrompt : 'Sector scope'}
                </p>
                <StarMark className="h-3.5 w-3.5 text-gold-500/60" filled />
              </div>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {active.details.map((detail, i) => (
                  <li key={detail} className="flex items-start gap-2.5 text-body-xs leading-relaxed text-navy-100">
                    <span aria-hidden="true" className="numeral mt-0.5 shrink-0 text-[0.62rem] text-gold-400/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <p className="mt-5 text-label-xs text-white/45">
            {isAr
              ? 'انقر على أي قطاع لعرض تفاصيله — الصورة تتغير مع اختيارك.'
              : 'Select any sector to see its scope — the image follows your choice.'}
          </p>
        </div>
      </div>
    </Section>
  );
}
