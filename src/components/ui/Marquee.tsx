import { cn } from '@/lib/cn';
import { StarMark } from './Ornament';

/**
 * Infinite horizontal ticker. The list is rendered twice so the translation
 * can loop seamlessly; direction follows the document.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  duration = 46,
  reverse = false,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const copy = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className={cn('flex shrink-0 items-center gap-5 px-5', itemClassName)}
        >
          <span className="whitespace-nowrap">{item}</span>
          <StarMark className="h-3 w-3 shrink-0 text-gold-500/80" filled />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn('relative flex overflow-hidden', className)} aria-hidden="true">
      <div
        className="marquee-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : undefined,
        }}
      >
        {copy}
        {copy}
      </div>
    </div>
  );
}
