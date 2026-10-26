import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';
import { visitorIcons } from './ui/Icons';

export function TargetVisitors({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const groups = dict.visitors.items;
  const isAr = locale === 'ar';
  const totalRoles = groups.reduce((sum, g) => sum + g.roles.length, 0);

  return (
    <Section
      id="visitors"
      tone="soft"
      labelledBy="visitors-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <SectionTitle
        eyebrow={dict.visitors.eyebrow}
        eyebrowEn={dict.visitors.eyebrowEn}
        title={dict.visitors.title}
        lead={dict.visitors.lead}
        tone="light"
        titleId="visitors-title"
        index="06"
        titleClassName="max-w-[14ch]"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch">
        {/* Image + readout */}
        <RevealGroup className="relative order-1 lg:order-none">
          <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-navy-900">
            <Image
              src="/images/design/chef-plating.jpg"
              alt={
                isAr
                  ? 'طاهٍ يجهّز طبقاً في مطبخ احترافي'
                  : 'A chef plating a dish in a professional kitchen'
              }
              fill
              sizes="(max-width: 1024px) 100vw, 32vw"
              quality={84}
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

            <div className="absolute inset-x-5 top-5 flex items-center gap-2 text-gold-300">
              <StarMark className="h-3.5 w-3.5" filled />
              <p className="text-label-2xs font-bold uppercase tracking-[0.18em]">
                {isAr ? dict.visitors.hubAr : dict.visitors.hubEn}
              </p>
            </div>

            <div className="absolute inset-x-5 bottom-5">
              <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
                <div>
                  <p className="numeral text-[2.4rem] font-bold leading-none text-white">{groups.length}</p>
                  <p className="mt-1.5 text-label-2xs text-white/65">
                    {isAr ? 'شرائح الجمهور' : 'Audience segments'}
                  </p>
                </div>
                <div>
                  <p className="numeral text-[2.4rem] font-bold leading-none text-gold-300">{totalRoles}</p>
                  <p className="mt-1.5 text-label-2xs text-white/65">
                    {isAr ? 'دوراً مستهدفاً' : 'Target roles'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealGroup>

        {/* Audience cards */}
        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.07} amount={0.08}>
          {groups.map((group) => {
            const Icon = visitorIcons[group.id] ?? visitorIcons.executive;

            return (
              <RevealItem as="li" key={group.id}>
                <article className="group flex h-full flex-col rounded-[1.6rem] border border-navy-900/12 bg-[#FFFDF7] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold-600/45 hover:shadow-card sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-600/30 bg-gold-500/10 text-gold-700 transition-colors duration-500 group-hover:border-gold-500/60 group-hover:bg-gold-500/20">
                      <Icon width={20} height={20} />
                    </span>
                    <span className="numeral font-display text-[2.2rem] leading-none text-navy-900/12 transition-colors duration-500 group-hover:text-gold-600/40">
                      {group.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[1.25rem] font-bold leading-snug text-navy-900">
                    {group.title}
                  </h3>
                  <p lang="en" className="mt-1 font-inter text-[0.62rem] uppercase tracking-[0.14em] text-gold-700/80">
                    {group.en}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-navy-900/10 pt-4">
                    {group.roles.map((role) => (
                      <li
                        key={role}
                        className="rounded-full border border-navy-900/10 bg-surface-alt px-2.5 py-1 text-[0.68rem] font-medium leading-tight text-navy-700"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
