import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Amiri, Cormorant_Garamond, Inter, Tajawal } from 'next/font/google';
import type { Locale } from '@/lib/i18n';
import { localeHtmlLang } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { getEventFacts, siteUrl } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['300', '400', '500', '700', '800'],
  preload: true,
});

const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-amiri',
  display: 'swap',
  weight: ['400', '700'],
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  preload: false,
});

/** Builds the per-locale metadata block. */
export function localeMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);

  const ogImage = {
    url: `${siteUrl}/images/design/makkah-pilgrims.jpg`,
    width: 1920,
    height: 1080,
    alt: locale === 'ar'
      ? 'المسجد الحرام والكعبة المشرفة في مكة المكرمة'
      : 'The Holy Kaaba and Masjid al-Haram in Makkah',
  };

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords.split(',').map((k) => k.trim()),
    applicationName: dict.meta.shortEventName,
    authors: [{ name: 'Green Projects' }],
    creator: 'Green Projects',
    publisher: 'Green Projects',
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: '/ar', en: '/en', 'x-default': '/ar' },
    },
    openGraph: {
      type: 'website',
      siteName: dict.meta.shortEventName,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
    other: {
      'x-locale': locale,
      'content-language': localeHtmlLang[locale],
    },
  };
}

/** JSON-LD `Event` + `WebSite` graph for one locale. */
export function EventJsonLd({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const facts = getEventFacts(locale, dict);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        '@id': `${siteUrl}/#event`,
        name: facts.name,
        alternateName: facts.alternateName,
        description: facts.description,
        eventStatus: facts.eventStatus,
        eventAttendanceMode: facts.eventAttendanceMode,
        type: facts.type,
        startDate: facts.startDate,
        endDate: facts.endDate,
        duration: facts.duration,
        url: `${siteUrl}/${locale}`,
        inLanguage: locale,
        image: [`${siteUrl}/images/design/makkah-pilgrims.jpg`],
        location: {
          '@type': 'Place',
          name: locale === 'ar' ? 'قاعة هيلتون مكة للمؤتمرات، مكة المكرمة' : 'Hilton Makkah Convention Hall, Makkah',
          address: {
            '@type': 'PostalAddress',
            addressLocality: locale === 'ar' ? 'مكة المكرمة' : 'Makkah',
            addressRegion: locale === 'ar' ? 'منطقة مكة المكرمة' : 'Makkah Province',
            addressCountry: 'SA',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: facts.organizer.name,
          alternateName: facts.organizer.alternateName,
          url: facts.organizer.url,
          email: facts.organizer.email,
          telephone: facts.organizer.telephone,
          logo: `${siteUrl}/icon.svg`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: facts.organizer.address.streetAddress,
            addressLocality: facts.organizer.address.addressLocality,
            addressRegion: facts.organizer.address.addressRegion,
            addressCountry: facts.organizer.address.addressCountry,
          },
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          url: `${siteUrl}/${locale}#register`,
          price: '0',
          priceCurrency: 'SAR',
          validFrom: '2026-10-01',
          description: locale === 'ar' ? 'تسجيل الزوار مجاني' : 'Free visitor registration',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: dict.meta.shortEventName,
        inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
        publisher: { '@id': `${siteUrl}/#event` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, build-time data from our own dictionary — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Renders the document shell for a locale.
 *
 * Each locale lives in its own route group with its own root layout, which is
 * what lets the two pages be statically generated with the correct
 * `<html lang dir>` and with their metadata inside `<head>`.
 */
export function DocumentShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html
      lang={localeHtmlLang[locale]}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${tajawal.variable} ${amiri.variable} ${cormorant.variable}`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only rounded-full bg-navy-900 px-5 py-3 text-body-sm font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100]"
        >
          {locale === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}
        </a>
        <EventJsonLd locale={locale} />
        {children}
      </body>
    </html>
  );
}