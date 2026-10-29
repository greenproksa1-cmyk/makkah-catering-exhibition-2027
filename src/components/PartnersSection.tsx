'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export function PartnersSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.partnersGrid;
  const partners = dict.partners.items;
  const isAr = locale === 'ar';
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  return (
    <Section
      id="partners-grid"
      tone="white"
      labelledBy="partners-grid-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 top-10 hidden h-72 w-72 text-gold-500/10 lg:block"
        filled
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow={t.eyebrow}
          eyebrowEn={t.eyebrowEn}
          title={t.title}
          lead={isAr ? t.leadAr : t.leadEn}
          tone="light"
          titleId="partners-grid-title"
          index="13"
          className="max-w-2xl"
          titleClassName="max-w-[18ch]"
        />
        <Link href={`/${locale}/partners`} className="btn btn-outline shrink-0">
          {t.cta}
        </Link>
      </div>

      <RevealGroup as="ul" className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3" stagger={0.06}>
        {partners.map((partner) => {
          const name = isAr ? partner.nameAr : partner.nameEn;
          const role = isAr ? partner.roleAr : partner.roleEn;
          const showLogo = Boolean(partner.logo) && !failed[partner.id];

          return (
            <RevealItem as="li" key={partner.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-navy-900/12 bg-[#FFFDF7] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold-600/50 hover:shadow-card sm:p-6">
                <StarMark
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-6 -top-6 h-24 w-24 text-gold-600/[0.07] transition-colors duration-500 group-hover:text-gold-600/20"
                  filled
                />

                <div className="relative flex min-h-20 items-center justify-start">
                  {showLogo ? (
                    <Image
                      src={partner.logo}
                      alt={`${t.logoAlt} ${name}`}
                      width={partner.logoW}
                      height={partner.logoH}
                      className="h-auto max-w-full bg-white p-2"
                      style={{ width: `${partner.logoScale}%` }}
                      onError={() => setFailed((prev) => ({ ...prev, [partner.id]: true }))}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-full border border-gold-600/35 bg-gold-500/10',
                        'font-display text-[1.35rem] font-bold tracking-wide text-gold-700',
                      )}
                    >
                      {initials(partner.nameEn)}
                    </span>
                  )}
                </div>

                <div className="relative mt-5 border-t border-navy-900/10 pt-4">
                  <h3 className="font-display text-[1.15rem] font-bold leading-snug text-navy-900">
                    {name}
                  </h3>
                  <p className="mt-1 text-body-xs leading-relaxed text-muted">{role}</p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-start scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100"
                />
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[1.4rem] border border-gold-600/25 bg-surface-alt px-6 py-5 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-body-sm leading-relaxed text-muted">{t.note}</p>
        <Link href={`/${locale}/partners`} className="btn btn-primary shrink-0">
          {t.cta}
        </Link>
      </div>
    </Section>
  );
}
