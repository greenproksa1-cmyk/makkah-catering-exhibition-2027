import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { SponsorshipPage } from '../../../SponsorshipPage';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const t = getDictionary('ar').sponsorship;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: '/ar/sponsorship' },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: '/ar/sponsorship',
    },
  };
}

/**
 * Sponsorship packages, Arabic. The dictionary is resolved on the server and
 * handed to the client component.
 */
export default function ArabicSponsorshipPage() {
  return <SponsorshipPage locale="ar" dict={getDictionary('ar')} />;
}
