import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Motion';
import { StarMark } from './Ornament';

export type SectionTone = 'white' | 'soft' | 'dark';

export function Section({
  id,
  tone = 'white',
  children,
  className,
  containerClassName,
  labelledBy,
}: {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
}) {
  const dark = tone === 'dark';

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative scroll-mt-24 py-20 sm:py-24 lg:py-28',
        dark
          ? 'on-dark bg-navy-950 text-white'
          : tone === 'soft'
            ? 'bg-surface-alt text-navy-900'
            : 'bg-surface text-navy-900',
        className,
      )}
    >
      <div className={cn('relative', containerClassName)}>{children}</div>
    </section>
  );
}

/**
 * Editorial section heading: chapter index, gold eyebrow, display title and a
 * hairline with a star. The title uses the display serif (Amiri in Arabic,
 * Cormorant in English) which is what separates the Makkah identity from the
 * previous san-serif treatment.
 */
export function SectionTitle({
  eyebrow,
  eyebrowEn,
  title,
  lead,
  align = 'start',
  tone = 'dark',
  className,
  titleId,
  index,
  titleClassName,
}: {
  eyebrow?: string;
  eyebrowEn?: string;
  title: string;
  lead?: string;
  align?: 'start' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
  titleId?: string;
  index?: string;
  titleClassName?: string;
}) {
  const center = align === 'center';

  return (
    <Reveal className={cn(center && 'text-center', className)}>
      {(eyebrow || index) && (
        <div className={cn('flex items-center gap-4', center && 'justify-center')}>
          {index && (
            <span className="numeral text-label-xs font-bold tracking-[0.08em] text-accent">
              {index}
            </span>
          )}
          {index && <span aria-hidden="true" className="h-px w-8 bg-gold-500/50" />}
          {eyebrow && (
            <p className={cn('eyebrow', center && 'justify-center')}>
              <span>
                {eyebrow}
                {eyebrowEn && eyebrowEn.trim().toLowerCase() !== eyebrow.trim().toLowerCase() ? (
                  <span
                    lang="en"
                    className="ms-3 font-inter text-[0.62em] font-medium uppercase tracking-[0.18em] opacity-55"
                  >
                    {eyebrowEn}
                  </span>
                ) : null}
              </span>
            </p>
          )}
        </div>
      )}

      <h2
        id={titleId}
        className={cn(
          'mt-6 max-w-4xl font-display text-display-lg text-balance',
          tone === 'dark' ? 'text-white' : 'text-navy-900',
          center && 'mx-auto',
          titleClassName,
        )}
      >
        {title}
      </h2>

      <span
        aria-hidden="true"
        className={cn(
          'mt-7 flex h-3 items-center gap-2',
          center ? 'justify-center' : 'justify-start',
        )}
      >
        <span className="h-px w-12 bg-gold-500/75" />
        <StarMark className="h-3 w-3 text-gold-500" filled />
      </span>

      {lead && (
        <p
          className={cn(
            'mt-6 max-w-2xl text-[1.0625rem] leading-[1.9]',
            center && 'mx-auto',
            tone === 'dark' ? 'text-navy-200' : 'text-muted',
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
