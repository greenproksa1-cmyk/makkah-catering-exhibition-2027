import { cn } from '@/lib/cn';

/** Eight-point Makkah star — the recurring mark of the identity. */
export function StarMark({
  className,
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn('h-5 w-5', className)}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.2}
      strokeLinejoin="round"
    >
      <path d="M12 1.8 15.1 8.9 22.2 12l-7.1 3.1L12 22.2 8.9 15.1 1.8 12l7.1-3.1Z" />
      {!filled && <path d="M12 6.6 13.9 10.1 17.4 12l-3.5 1.9L12 17.4 10.1 13.9 6.6 12l3.5-1.9Z" opacity=".55" />}
    </svg>
  );
}

/** A hairline with a star at its centre. */
export function GoldRule({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/60 to-gold-500/80" />
      <StarMark className="h-3 w-3 text-gold-500" filled />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-500/60 to-gold-500/80" />
    </div>
  );
}

/** Large decorative chapter number. */
export function ChapterNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'font-display text-[clamp(4rem,11vw,9rem)] leading-none text-gold-500/12',
        className,
      )}
    >
      {value}
    </span>
  );
}
