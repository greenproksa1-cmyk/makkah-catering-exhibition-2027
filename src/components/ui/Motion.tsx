'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Shared easing curve so every reveal on the page feels like one system. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Horizontal offset; positive enters from the inline-start (auto-mirrors). */
  x?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      animate={reduce ? { opacity: 1, y: 0, x: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={reduce ? { duration: 0 } : { duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers direct <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  /**
   * Element to render. Pass `ul` / `ol` when the children are list items so
   * the list semantics survive the animation wrapper.
   */
  as?: 'div' | 'ul' | 'ol' | 'section' | 'article';
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial={reduce ? false : 'hidden'}
      animate={reduce ? 'visible' : undefined}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
      }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  y = 24,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  /** Match the parent list, e.g. `li` inside a `RevealGroup as="ul"`. */
  as?: 'div' | 'li' | 'article';
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: EASE } },
  };

  return (
    <Comp
      className={className}
      initial={reduce ? false : undefined}
      animate={reduce ? 'visible' : undefined}
      variants={variants}
    >
      {children}
    </Comp>
  );
}

/** Slide-in reveal that mirrors automatically thanks to logical properties. */
export function RevealX({
  children,
  className,
  from = 'start',
  delay = 0,
  x = 40,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  from?: 'start' | 'end';
  delay?: number;
  x?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const offset = from === 'start' ? x : -x;
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, x: offset }}
      animate={reduce ? { opacity: 1, x: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount }}
      transition={reduce ? { duration: 0 } : { duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}