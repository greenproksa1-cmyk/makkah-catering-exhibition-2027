import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { SponsorshipPage } from '../../../SponsorshipPage';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const t = getDictionary('en').sponsorship;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: '/en/sponsorship' },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: '/en/sponsorship',
    },
  };
}

/** Sponsorship packages, English. */
export default function EnglishSponsorshipPage() {
  return <SponsorshipPage locale="en" dict={getDictionary('en')} />;
}
