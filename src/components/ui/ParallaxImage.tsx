'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Image that drifts gently against the scroll. The image is oversized inside
 * its frame so the parallax never exposes an edge.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
  range = 44,
  quality = 82,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  range?: number;
  quality?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0 scale-[1.16]"
        style={reduce ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className={cn('object-cover', imageClassName)}
        />
      </motion.div>
    </div>
  );
}
