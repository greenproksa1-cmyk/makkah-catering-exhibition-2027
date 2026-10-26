'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { cn } from '@/lib/cn';
import { useActiveSection, useScrolledPast } from '@/hooks/useScrollState';
import { LanguageSwitcher } from './LanguageSwitcher';
import { StarMark } from './ui/Ornament';

const NAV_IDS = [
  'introduction',
  'importance',
  'objectives',
  'ecosystem',
  'visitors',
  'experience',
  'business-value',
  'early-bird',
  'partners',
  'register',
];

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrolled = useScrolledPast(24);
  const active = useActiveSection(NAV_IDS);
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;
  const links = dict.nav.links;
  const isAr = locale === 'ar';

  const onLanding = pathname === `/${locale}`;
  const hrefFor = useCallback(
    (link: { id: string; href?: string }) => {
      if (link.href) return `/${locale}${link.href}`;
      return onLanding ? `#${link.id}` : `/${locale}#${link.id}`;
    },
    [locale, onLanding],
  );
  const registerHref = onLanding ? '#register' : `/${locale}#register`;

  // Smooth in-page navigation that respects the sticky header offset.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href')?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const headerHeight =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 18;
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
      setMenuOpen(false);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reduce]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    const background = [
      document.getElementById('main'),
      document.querySelector('footer'),
      document.getElementById('floating-actions'),
    ].filter((el): el is HTMLElement => el !== null);

    background.forEach((el) => el.setAttribute('inert', ''));

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      background.forEach((el) => el.removeAttribute('inert'));
    };
  }, [menuOpen]);

  // Reading progress hairline.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max <= 0 ? 0 : Math.min(1, window.scrollY / max);
      setProgress((prev) => (Math.abs(prev - next) < 0.002 ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const solid = scrolled || !onLanding;
  const light = solid && !menuOpen;

  const wordmarkMain = isAr ? 'معرض مكة' : 'MAKKAH EXPO';
  const wordmarkSub = isAr ? 'للإعاشة والتموين ٢٠٢٧' : 'CATERING & FOOD SUPPLY 2027';

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,box-shadow] duration-500',
          menuOpen
            ? 'on-dark border-b border-white/10 bg-navy-950 text-white'
            : light
              ? 'border-b border-gold-500/20 bg-[#FBF7EE]/94 text-navy-900 shadow-header backdrop-blur-xl'
              : 'on-dark border-b border-transparent bg-transparent text-white',
        )}
        style={{ height: 'var(--header-h)' }}
      >
        <div className="shell flex h-full items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href={`/${locale}#top`}
            aria-label={isAr ? dict.event.wordmarkAr : dict.event.wordmarkEn}
            className="group flex min-w-0 shrink items-center gap-3 rounded py-1"
          >
            <span
              className={cn(
                'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                light ? 'border-gold-600/45' : 'border-gold-400/45',
              )}
            >
              <StarMark className={cn('h-5 w-5', light ? 'text-gold-700' : 'text-gold-300')} />
              <span
                aria-hidden="true"
                className="absolute inset-[-4px] rounded-full border border-dashed border-gold-500/20"
              />
            </span>
            <span className="min-w-0 leading-none">
              <span
                className={cn(
                  'block truncate font-display text-[1.18rem] font-bold sm:text-[1.35rem]',
                  light ? 'text-navy-900' : 'text-white',
                )}
              >
                {wordmarkMain}
              </span>
              <span
                className={cn(
                  'mt-1 block truncate font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em]',
                  light ? 'text-gold-700' : 'text-gold-200/80',
                )}
              >
                {wordmarkSub}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label={dict.nav.label} className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {links.map((link) => {
                const isActive = link.href
                  ? pathname === `/${locale}${link.href}`
                  : onLanding && active === link.id;
                return (
                  <li key={link.id} className="shrink-0">
                    <Link
                      href={hrefFor(link)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative block whitespace-nowrap rounded-full px-3 py-2 text-label-nav font-semibold transition-colors duration-300',
                        light
                          ? isActive
                            ? 'text-navy-950'
                            : 'text-navy-700/70 hover:text-navy-950'
                          : isActive
                            ? 'text-white'
                            : 'text-white/65 hover:text-white',
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gold-500 transition-transform duration-300',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher
              locale={locale}
              labels={dict.nav.languageLabel}
              switchToLabel={dict.nav.switchTo}
              switchToShort={dict.nav.switchToShort}
              currentShort={dict.nav.currentLangShort}
              tone={light ? 'light' : 'dark'}
              className="hidden sm:inline-flex"
            />

            <Link
              href={registerHref}
              className="btn btn-accent hidden px-5 py-2.5 text-label-xs sm:inline-flex"
            >
              {dict.nav.cta}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 xl:hidden',
                light ? 'border-navy-900/25 text-navy-900' : 'border-white/30 text-white',
              )}
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={cn(
                    'absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300',
                    menuOpen && 'translate-y-[7px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute inset-x-0 top-[7px] h-0.5 rounded bg-current transition-opacity duration-300',
                    menuOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute inset-x-0 top-[14px] h-0.5 rounded bg-current transition-transform duration-300',
                    menuOpen && '-translate-y-[7px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-current/10">
          <div
            className="h-full origin-left bg-gold-500 rtl:origin-right"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {menuOpen && (
        <motion.div
          id="mobile-nav"
          key="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="on-dark fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-navy-950 px-6 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+1.5rem)] xl:hidden"
        >
          <div aria-hidden="true" className="pattern-stars absolute inset-0 opacity-30" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/30 to-navy-950" />

          <div className="relative">
            <p className="eyebrow text-gold-300">
              {isAr ? dict.event.heroKickerAr : dict.event.heroKickerEn}
            </p>
            <h2 className="mt-5 font-display text-[2.35rem] leading-tight text-white">
              {isAr ? 'معرض مكة' : 'Makkah Expo'}
              <span className="mt-1 block text-gold-300">{isAr ? 'للإعاشة والتموين ٢٠٢٧' : 'Catering & Food Supply 2027'}</span>
            </h2>

            <nav aria-label={dict.nav.label} className="mt-10">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {links.map((link, i) => (
                  <li key={link.id}>
                    <Link
                      href={hrefFor(link)}
                      className="group flex items-center gap-4 py-4 text-white/85 transition hover:text-white"
                    >
                      <span className="numeral w-6 shrink-0 text-label-xs text-gold-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 font-display text-[1.4rem] font-bold">{link.label}</span>
                      <StarMark className="h-3 w-3 text-gold-500/40 transition group-hover:text-gold-400" filled />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link href={registerHref} className="btn btn-accent mt-8 w-full">
              {dict.nav.cta}
            </Link>
            <Link href={registerHref} className="btn btn-ghost-dark mt-3 w-full">
              {isAr ? dict.register.tabs.visitor : dict.register.tabs.visitorEn}
            </Link>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <LanguageSwitcher
                locale={locale}
                labels={dict.nav.languageLabel}
                switchToLabel={dict.nav.switchTo}
                switchToShort={dict.nav.switchToShort}
                currentShort={dict.nav.currentLangShort}
                tone="dark"
              />
              <p className="text-end text-label-xs text-gold-200/80">
                {isAr ? dict.event.dateLineAr : dict.event.dateLineEn}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
