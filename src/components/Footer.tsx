'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';

function IconPhone(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.58 3.6a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

function IconMail(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGlobe(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.4 2.6 3.6 6 3.6 9.5S14.4 18.9 12 21.5c-2.4-2.6-3.6-6-3.6-9.5S9.6 5.1 12 2.5Z" />
    </svg>
  );
}

function IconPin(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function IconWhatsApp(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.34 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01a9.9 9.9 0 0 0 9.94-9.9A9.9 9.9 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.22 8.22 0 1 1 6.99 3.87Zm4.5-6.16c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.78.96-.15.17-.29.19-.53.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.42.06-.63.31-.22.25-.83.81-.83 1.98s.85 2.29.97 2.45c.12.16 1.68 2.56 4.06 3.59.57.24 1.01.39 1.36.5.57.18 1.09.15 1.5.09.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  const year = new Date().getFullYear();
  const org = dict.organizer;
  const whatsappUrl = `https://wa.me/${org.phoneRaw.replace(/[^\d]/g, '')}`;

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 pb-24 text-body md:pb-0">
      <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-15" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-50" />
      <StarMark
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 top-10 hidden h-[26rem] w-[26rem] text-gold-400/[0.06] lg:block"
        filled
      />

      <div className="shell relative">
        {/* Closing invitation */}
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
          <RevealGroup stagger={0.08}>
            <RevealItem>
              <p className="eyebrow text-gold-300">{isAr ? 'مكة المكرمة · ٢٠٢٧' : 'MAKKAH · 2027'}</p>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.14] text-white">
                {isAr ? 'لنصنع موسم ٢٠٢٧ معاً.' : "Let's shape the 2027 season together."}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 max-w-lg text-body-sm leading-[1.9] text-navy-200">
                {isAr
                  ? 'المعرض يجمع صنّاع القرار في الإعاشة والضيافة والتموين تحت سقف واحد، في قلب مكة المكرمة.'
                  : 'The exhibition brings catering, hospitality and supply chain decision-makers together under one roof, in the heart of Makkah.'}
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}#register`} className="btn btn-accent px-7 py-3.5">
                  {dict.nav.cta}
                </Link>
                <Link href={`/${locale}/partners`} className="btn btn-ghost-dark px-7 py-3.5">
                  {dict.partnersGrid.cta}
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-7 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0" stagger={0.06}>
            <RevealItem>
              <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300/80">
                {isAr ? 'التاريخ' : 'Dates'}
              </p>
              <p className="mt-2 font-display text-[1.15rem] font-bold leading-snug text-white">
                {isAr ? dict.event.dateLineAr : dict.event.dateLineEn}
              </p>
              <p className="mt-1 text-label-xs text-navy-300">{isAr ? dict.event.durationAr : dict.event.durationEn}</p>
            </RevealItem>
            <RevealItem>
              <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300/80">
                {isAr ? 'المكان' : 'Venue'}
              </p>
              <p className="mt-2 font-display text-[1.15rem] font-bold leading-snug text-white">
                {isAr ? dict.location.venueTba : 'Hilton Makkah Convention Hall'}
              </p>
              <p className="mt-1 text-label-xs text-navy-300">
                {isAr ? dict.location.cityAr : dict.location.cityEn}
              </p>
            </RevealItem>
            <RevealItem>
              <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300/80">
                {isAr ? 'المنظم' : 'Organiser'}
              </p>
              <p className="mt-2 font-display text-[1.15rem] font-bold leading-snug text-white">
                {isAr ? org.nameAr : org.nameEn}
              </p>
            </RevealItem>
            <RevealItem>
              <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300/80">
                {isAr ? 'الموقع' : 'Website'}
              </p>
              <a
                href={org.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="link-underline mt-2 inline-block font-inter text-label-xs font-semibold text-white"
              >
                {org.website}
              </a>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Organiser + contact */}
        <div className="grid gap-10 border-b border-white/10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <RevealGroup stagger={0.08}>
            <RevealItem>
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-40 shrink-0 items-center justify-center rounded-2xl bg-white p-3">
                  <Image
                    src="/images/green-projects.png"
                    alt={isAr ? org.nameAr : org.nameEn}
                    width={1200}
                    height={325}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-label-2xs font-bold uppercase tracking-[0.16em] text-gold-300">
                    {org.eyebrowEn}
                  </p>
                  <p className="mt-2 font-display text-[1.35rem] font-bold leading-snug text-white sm:text-[1.5rem]">
                    {isAr ? org.nameAr : org.nameEn}
                  </p>
                  <p className="mt-2 max-w-sm text-body-sm leading-relaxed text-navy-200">
                    {isAr ? org.noteAr : org.noteEn}
                  </p>
                </div>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[var(--green-brand)] px-5 py-2.5 text-label-xs text-white hover:bg-[var(--green-brand-dark)]"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  {org.whatsappLabel}
                </a>
                <a href={`tel:${org.phoneRaw}`} className="btn btn-ghost-dark px-5 py-2.5 text-label-xs">
                  {org.phoneDisplay}
                </a>
              </div>
            </RevealItem>
          </RevealGroup>

          <RevealGroup stagger={0.06}>
            <RevealItem>
              <address className="not-italic">
                <ul className="grid gap-5 sm:grid-cols-2">
                  {[
                    { Icon: IconPin, label: org.addressLabel, value: isAr ? org.addressAr : org.addressEn, plain: true },
                    { Icon: IconPhone, label: org.phoneLabel, value: org.phoneDisplay, href: `tel:${org.phoneRaw}`, ltr: true },
                    { Icon: IconMail, label: 'Email', value: org.email, href: `mailto:${org.email}`, ltr: true },
                    { Icon: IconGlobe, label: org.websiteLabel, value: org.website, href: org.websiteUrl, external: true, ltr: true },
                  ].map((row) => (
                    <li key={row.label} className="flex items-start gap-3">
                      <row.Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                      <div className="min-w-0">
                        <p className="text-label-2xs font-bold uppercase tracking-[0.14em] text-navy-300">
                          {row.label}
                        </p>
                        {row.href ? (
                          <a
                            href={row.href}
                            {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className={`link-underline block py-0.5 text-body-sm text-navy-100 transition-colors hover:text-white ${row.ltr ? 'force-ltr text-start' : ''}`}
                          >
                            {row.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-body-sm leading-relaxed text-navy-100">{row.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </address>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/logo-full-light.png"
              alt={isAr ? dict.event.wordmarkAr : dict.event.wordmarkEn}
              width={4642}
              height={2908}
              sizes="220px"
              className="h-auto w-[190px]"
            />
            <p className="mt-5 border-t border-white/10 pt-4 font-display text-body-md italic leading-relaxed text-gold-200/80">
              {dict.event.tagline}
            </p>
          </div>

          <nav aria-labelledby="footer-nav-title">
            <h2 id="footer-nav-title" className="text-label-2xs font-bold uppercase tracking-[0.16em] text-navy-300">
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {dict.nav.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href ? `/${locale}${link.href}` : `/${locale}#${link.id}`}
                    className="link-underline block py-1 text-body-sm text-navy-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-label-2xs font-bold uppercase tracking-[0.16em] text-navy-300">
              {dict.footer.locationTitle}
            </h2>
            <ul className="mt-5 space-y-2 text-body-sm text-navy-100">
              <li>{isAr ? dict.location.cityAr : dict.location.cityEn}</li>
              <li>{isAr ? dict.location.regionAr : dict.location.regionEn}</li>
              <li>{isAr ? dict.location.coastAr : dict.location.coastEn}</li>
              <li className="border-t border-white/10 pt-3 font-semibold text-white">
                {isAr ? dict.event.dateLineFullAr : dict.event.dateLineFullEn}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-label-2xs font-bold uppercase tracking-[0.16em] text-navy-300">
              {dict.footer.languageTitle}
            </h2>
            <div className="mt-5">
              <LanguageSwitcher
                locale={locale}
                labels={dict.nav.languageLabel}
                switchToLabel={dict.nav.switchTo}
                switchToShort={dict.nav.switchToShort}
                currentShort={dict.nav.currentLangShort}
                tone="dark"
              />
            </div>
            <a href={`/${locale}#top`} className="link-underline mt-6 inline-block text-label-xs font-semibold text-gold-300">
              {isAr ? 'العودة إلى الأعلى ↑' : 'Back to top ↑'}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-center text-label-xs text-navy-300 sm:text-start">
              © <span className="tabular">{year}</span> {isAr ? org.nameAr : org.nameEn} — {dict.footer.rights}.
            </p>
            <p className="max-w-lg text-center text-label-xs leading-relaxed text-navy-400 sm:text-end">
              {dict.footer.disclaimer}
            </p>
          </div>
          <p className="mt-4 text-center text-[0.65rem] leading-relaxed text-navy-500 sm:text-start">
            {isAr ? 'صور مكة المكرمة: مساهمو ويكيميديا كومنز (CC BY-SA) · صور الطعام والضيافة: Unsplash.' : 'Makkah photography: Wikimedia Commons contributors (CC BY-SA) · Food and hospitality photography: Unsplash.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
