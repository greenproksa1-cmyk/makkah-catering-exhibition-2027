'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';

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
      tone="dark"
      labelledBy="partners-grid-title"
      containerClassName="shell"
    >
      <SectionTitle
        eyebrow={t.eyebrow}
        eyebrowEn={t.eyebrowEn}
        title={t.title}
        lead={isAr ? t.leadAr : t.leadEn}
        tone="dark"
        titleId="partners-grid-title"
        className="max-w-3xl"
      />

      <RevealGroup as="ul" className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3" stagger={0.06}>
        {partners.map((partner) => {
          const name = isAr ? partner.nameAr : partner.nameEn;
          const role = isAr ? partner.roleAr : partner.roleEn;
          const showLogo = Boolean(partner.logo) && !failed[partner.id];

          return (
            <RevealItem as="li" key={partner.id}>
              <div className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-orange-400/50">
                <div className="flex min-h-20 items-center justify-center">
                  {showLogo ? (
                    <Image
                      src={partner.logo}
                      alt={`${t.logoAlt} ${name}`}
                      width={partner.logoW}
                      height={partner.logoH}
                      className="h-auto max-w-full bg-white/95 p-2"
                      style={{ width: `${partner.logoScale}%` }}
                      onError={() => setFailed((prev) => ({ ...prev, [partner.id]: true }))}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/40 bg-orange-500/10',
                        'font-display text-display-sm font-bold tracking-wide text-orange-300',
                      )}
                    >
                      {initials(partner.nameEn)}
                    </span>
                  )}
                </div>

                <div className="mt-5 border-t border-white/12 pt-4">
                  <h3 className="text-body-md font-bold text-white">{name}</h3>
                  <p className="mt-1 text-body-xs text-muted">{role}</p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/12 px-6 py-5 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-body-sm text-muted">{t.note}</p>
        <Link href={`/${locale}/partners`} className="btn btn-ghost-dark shrink-0">
          {t.cta}
        </Link>
      </div>
    </Section>
  );
}
