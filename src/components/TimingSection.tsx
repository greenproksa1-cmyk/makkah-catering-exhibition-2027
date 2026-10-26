import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/types';
import { Section, SectionTitle } from './ui/Section';
import { RevealGroup, RevealItem } from './ui/Motion';
import { StarMark } from './ui/Ornament';

export function TimingSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.timing;
  const isAr = locale === 'ar';

  const phases = [
    {
      number: '01',
      period: isAr ? 'قبل الموسم' : 'Pre-season',
      date: isAr ? 'التعاقد والتجهيز' : 'Contract & prepare',
      body: isAr
        ? 'نافذة مدروسة تسبق الذروة، تمنح المشترين والموردين وقتاً كافياً لإتمام التعاقدات والتجهيز.'
        : 'A deliberate window before peak season, giving buyers and suppliers time to contract and prepare.',
    },
    {
      number: '02',
      period: isAr ? 'المعرض' : 'The exhibition',
      date: isAr ? '10 – 12 يناير 2027' : '10 – 12 January 2027',
      body: isAr
        ? 'ثلاثة أيام من اللقاءات المباشرة بين صنّاع القرار والموردين في قلب مكة المكرمة.'
        : 'Three days of direct meetings between decision-makers and suppliers in the heart of Makkah.',
    },
    {
      number: '03',
      period: isAr ? 'الموسم' : 'The season',
      date: isAr ? 'موسم الحج ١٤٤٨' : 'Hajj season 1448',
      body: isAr
        ? 'تُترجم الاتفاقيات إلى تشغيل فعلي يخدم ضيوف الرحمن بأعلى معايير الكفاءة والسلامة.'
        : 'Agreements turn into operations serving pilgrims with the highest standards of efficiency and safety.',
    },
  ];

  return (
    <Section
      id="timing"
      tone="soft"
      labelledBy="timing-title"
      containerClassName="shell"
      className="overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -end-10 top-6 select-none font-display text-[16rem] leading-none text-gold-600/[0.06] sm:text-[24rem]"
      >
        2027
      </span>

      <SectionTitle
        eyebrow={t.eyebrow}
        eyebrowEn={t.eyebrowEn}
        title={t.title}
        lead={t.lead}
        tone="light"
        titleId="timing-title"
        index="03"
        className="relative"
        titleClassName="max-w-[21ch]"
      />

      {/* Seasonal timeline */}
      <div className="relative mt-14">
        <div aria-hidden="true" className="absolute inset-x-0 top-7 hidden h-px bg-gold-600/35 lg:block" />
        <RevealGroup as="ol" className="grid gap-8 lg:grid-cols-3 lg:gap-10" stagger={0.1}>
          {phases.map((phase) => (
            <RevealItem as="li" key={phase.number}>
              <div className="relative">
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-600/40 bg-[#FBF7EE] font-display text-[1.2rem] font-bold text-gold-700 shadow-[0_0_0_8px_#F4EDDD]">
                    {phase.number}
                  </span>
                  <p className="text-label-2xs font-bold uppercase tracking-[0.18em] text-gold-700 lg:mt-6">
                    {phase.period}
                  </p>
                </div>
                <p className="mt-3 font-display text-[1.45rem] font-bold text-navy-900 lg:mt-2">
                  {phase.date}
                </p>
                <p className="mt-3 max-w-sm text-body-sm leading-[1.85] text-muted">{phase.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        {/* Quote */}
        <RevealGroup className="panel-pine relative overflow-hidden rounded-[1.75rem] p-7 sm:p-9" stagger={0.06}>
          <StarMark
            aria-hidden="true"
            className="pointer-events-none absolute -end-6 -top-6 h-32 w-32 text-gold-400/15"
            filled
          />
          <RevealItem>
            <p className="text-label-2xs font-bold uppercase tracking-[0.2em] text-gold-300">
              {isAr ? 'الخلاصة' : 'In short'}
            </p>
            <blockquote className="mt-4 font-display text-[1.65rem] font-bold leading-snug text-white sm:text-[1.9rem]">
              “{t.closingLine}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3 text-gold-300/80">
              <span className="h-px w-12 bg-gold-500/60" />
              <StarMark className="h-3.5 w-3.5" filled />
              <span className="h-px w-12 bg-gold-500/60" />
            </div>
          </RevealItem>
        </RevealGroup>

        {/* Bridge chips */}
        <RevealGroup className="relative rounded-[1.75rem] border border-gold-600/25 bg-[#FBF7EE] p-7 sm:p-9" stagger={0.05}>
          <RevealItem>
            <div className="flex items-center justify-between gap-4">
              <p className="text-label-2xs font-bold uppercase tracking-[0.18em] text-gold-700">
                {t.bridgeTitle}
              </p>
              <span className="numeral text-label-xs text-gold-600">
                {String(t.pills.length).padStart(2, '0')}
              </span>
            </div>
          </RevealItem>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {t.pills.map((pill, i) => (
              <li
                key={pill.id}
                className="group flex items-center gap-2.5 rounded-full border border-navy-900/15 bg-white/70 px-4 py-2.5 text-body-sm font-semibold text-navy-800 transition-colors duration-300 hover:border-gold-600/50 hover:bg-white"
              >
                <span className="numeral text-[0.68rem] text-gold-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {isAr ? pill.labelAr : pill.labelEn}
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-gold-600/20 pt-5 font-display text-[1.2rem] font-bold text-navy-900">
            {isAr
              ? 'تجارياً: قرارات شراء حقيقية في توقيت واحد.'
              : 'Commercially: real buying decisions in one window.'}
          </p>
        </RevealGroup>
      </div>
    </Section>
  );
}
