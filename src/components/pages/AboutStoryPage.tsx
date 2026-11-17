import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CORE_VALUES } from '../../data/mockData';
import { MEDIA } from '../../data/media';
import { Img } from '../ui';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { useScrollFx } from '../../hooks/useScrollFx';

interface AboutStoryPageProps {
  onNavigateTeam: () => void;
  onNavigateProjects: () => void;
}

const MILESTONES = [
  {
    year: '2022',
    title: 'A vision for Chennai',
    desc: 'Unifra was founded with a clear mission: to craft coastal residences in Chennai uniting Scandinavian architectural calm, natural materials, and enduring build quality.',
    media: MEDIA.coast,
    clip: 'left'
  },
  {
    year: '2023',
    title: 'Bringing MYSA to life',
    desc: 'Construction began on MYSA Luxe Villas in Vettuvankeni, ECR — defined by asymmetrical butterfly roofs, deep stone cantilevers, and rigorous structural tolerances.',
    media: MEDIA.panorama,
    clip: 'up'
  },
  {
    year: '2024—26',
    title: 'A legacy of trust',
    desc: 'Following landmark structural milestones and private family reservations at MYSA, Unifra expanded its architectural pipeline across Chennai’s premier coastal enclaves.',
    media: MEDIA.twilight,
    clip: 'right'
  }
];

const MISSION = [
  'Bespoke architectural customization tailored to your family',
  'Spaces calibrated for daylight, airflow, and acoustic calm',
  'Clear independent land titles and milestone transparency'
];

export const AboutStoryPage: React.FC<AboutStoryPageProps> = ({ onNavigateTeam, onNavigateProjects }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeValue, setActiveValue] = useState(0);

  // The emblem turns with the scroll
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to('[data-emblem]', {
        rotation: 180,
        ease: 'none',
        scrollTrigger: { trigger: '[data-emblem]', start: 'top 80%', end: '+=900', scrub: true }
      });
    },
    { scope: pageRef }
  );

  useScrollFx(pageRef);

  return (
    <div ref={pageRef} className="bg-paper text-ink">
      {/* Hero */}
      <section className="shell pb-28 pt-36 sm:pt-48">
        <p className="meta text-center text-graphite" data-reveal="load">
          Our story — Unifra Properties, Chennai
        </p>
        <h1 className="mt-12 flex flex-col items-center justify-center gap-4 text-center font-display text-display lg:flex-row lg:gap-[3vw]">
          <span data-split="load" data-split-by="chars">
            Creating
          </span>
          <img data-emblem src="/images/unifra-emblem-gold.png" alt="" className="h-[0.8em] w-[0.8em] object-contain" />
          <span className="serif-italic" data-split="load" data-split-by="chars" data-delay="0.2">
            desires.
          </span>
        </h1>
        <p className="mx-auto mt-16 max-w-3xl text-center font-display text-subhead" data-reveal="load" data-delay="0.4">
          Dreams are meant to come true.
        </p>
      </section>

      {/* Chronicle */}
      <section className="shell pb-32">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-headline" data-split>
            The chronicle
          </h2>
          <p className="max-w-xs text-[15px] text-graphite" data-reveal>
            Building enduring sanctuaries along Chennai’s East Coast Road.
          </p>
        </div>
        {MILESTONES.map((m) => (
          <article key={m.year} className="grid gap-8 border-t border-line py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-5">
              <p className="font-display text-[clamp(3.6rem,7.4vw,8rem)] leading-[0.9] tracking-[-0.04em] lg:sticky lg:top-32">{m.year}</p>
            </div>
            <div className="lg:col-span-3">
              <h3 className="font-display text-[2.2rem] leading-[1.05]" data-split>
                {m.title}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-graphite" data-reveal>
                {m.desc}
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone lg:col-span-4" data-clip={m.clip}>
              <Img media={m.media} alt={m.title} sizes="(min-width: 1024px) 30vw, 100vw" className="img-cover" />
            </div>
          </article>
        ))}
      </section>

      {/* Values — expanding panels */}
      <section className="bg-stone py-28 sm:py-36">
        <div className="shell">
          <div className="mb-14 grid gap-6 lg:grid-cols-12">
            <p className="meta text-graphite lg:col-span-4" data-reveal>
              Foundational pillars
            </p>
            <h2 className="font-display text-headline lg:col-span-8" data-split>
              The principles behind every <span className="serif-italic">family we build for.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-px bg-line-strong lg:h-[480px] lg:flex-row">
            {CORE_VALUES.map((value, i) => {
              const open = activeValue === i;
              return (
                <div
                  key={value.id}
                  tabIndex={0}
                  onMouseEnter={() => setActiveValue(i)}
                  onFocus={() => setActiveValue(i)}
                  className={`flex flex-col justify-between gap-10 bg-stone p-8 outline-none transition-[flex-grow] duration-[900ms] ease-luxe sm:p-10 ${
                    open ? 'lg:flex-[2.4]' : 'lg:flex-1'
                  }`}
                >
                  <span className="font-display text-6xl italic text-bronze">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-[clamp(2rem,2.8vw,2.9rem)] leading-[1]">{value.title}</h3>
                    <p
                      className={`mt-5 max-w-md text-[15px] leading-relaxed text-graphite transition-opacity duration-700 ${
                        open ? 'lg:opacity-100' : 'lg:opacity-0'
                      }`}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="shell grid gap-20 py-32 sm:py-40 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="meta text-graphite" data-reveal>
            Mission
          </p>
          <p className="mt-6 font-display text-subhead" data-reveal>
            We craft extraordinary homes that surpass expectations through thoughtful architecture, natural materials and transparent execution.
          </p>
          <ol className="mt-12 border-t border-line" data-stagger>
            {MISSION.map((item, i) => (
              <li key={item} className="flex gap-6 border-b border-line py-5 text-[15px]">
                <span className="tabular-nums text-ash">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="meta text-graphite" data-reveal>
            Vision
          </p>
          <p className="mt-6 font-display text-statement" data-split data-split-by="words">
            To stand as South India’s benchmark for quiet coastal luxury — uniting Scandinavian spatial clarity with{' '}
            <span className="serif-italic text-bronze">warm local craft.</span>
          </p>
          <button type="button" onClick={onNavigateProjects} className="group mt-12 flex cursor-pointer items-center gap-3 text-[14px] font-medium" data-reveal>
            <span className="u-draw">See the residences</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* People */}
      <section className="shell pb-32 text-center">
        <button type="button" onClick={onNavigateTeam} data-cursor="Meet" className="group mx-auto block cursor-pointer" data-reveal>
          <span className="flex justify-center -space-x-5">
            {['/images/team/siddiq-ahmed.png', '/images/team/nikesh-rajan.png'].map((src) => (
              <img key={src} src={src} alt="" className="h-24 w-24 rounded-full object-cover ring-4 ring-paper sm:h-28 sm:w-28" />
            ))}
          </span>
          <span className="mt-8 block font-display text-headline">
            The people behind <span className="serif-italic">Unifra</span>
          </span>
          <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium">
            <span className="u-draw">Meet the leadership</span>
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
      </section>
    </div>
  );
};
