import React, { useRef, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { MEDIA } from '../../data/media';
import { Img } from '../ui';
import { gsap, useGSAP, prefersReducedMotion, whenRevealed } from '../../lib/gsap';
import { useScrollFx } from '../../hooks/useScrollFx';

interface VenturesCareersPageProps {
  type: 'ventures' | 'careers';
  onOpenContact: () => void;
}

const VENTURE_MODELS = [
  {
    title: 'Prime land acquisition',
    desc: 'Direct outright purchase of clear-titled residential land plots in Chennai from 2 grounds up to 5 acres.'
  },
  {
    title: 'Joint development',
    desc: 'Attractive revenue or area-sharing models backed by bank guarantees, architectural excellence, and fast turnarounds.'
  },
  {
    title: 'Turnkey villa development',
    desc: 'End-to-end bespoke villa construction for private landowners seeking Swedish or European contemporary design.'
  }
];

const OPEN_ROLES = [
  {
    title: 'Senior Architectural Project Manager',
    type: 'Full-time',
    location: 'Chennai — T. Nagar HQ & ECR sites',
    exp: '5–8 years',
    desc: 'Lead execution of luxury villa enclaves, oversee structural contractors, and enforce high-tolerance finishes.'
  },
  {
    title: 'Interior Design Curator & 3D Visualizer',
    type: 'Full-time',
    location: 'Chennai HQ',
    exp: '3–5 years',
    desc: 'Curate Scandinavian and European interior palettes, millwork joinery details, and spatial styling.'
  },
  {
    title: 'Luxury Real Estate Client Relationship Manager',
    type: 'Full-time',
    location: 'Chennai & ECR Experience Center',
    exp: '2–4 years',
    desc: 'Manage high-net-worth client relationships, coordinate private villa viewings, and guide buying journeys.'
  }
];

export const VenturesCareersPage: React.FC<VenturesCareersPageProps> = ({ type, onOpenContact }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'ventures' | 'careers'>(type);
  const [openRole, setOpenRole] = useState<number | null>(0);

  // Crossfade the body when the tab changes
  useGSAP(
    () => {
      if (prefersReducedMotion() || !bodyRef.current) return;
      const anim = gsap.from(bodyRef.current.children, { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', paused: true });
      return whenRevealed(() => anim.play());
    },
    { dependencies: [tab], scope: bodyRef, revertOnUpdate: true }
  );

  // Accordion height
  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-role-panel]');
      panels.forEach((panel, i) => {
        gsap.to(panel, {
          height: openRole === i ? 'auto' : 0,
          duration: prefersReducedMotion() ? 0 : 0.8,
          ease: 'expo.inOut'
        });
      });
    },
    { dependencies: [openRole, tab], scope: bodyRef }
  );

  useScrollFx(pageRef, [tab]);

  return (
    <div ref={pageRef} className="bg-paper pb-32 pt-36 text-ink sm:pt-44">
      <div className="shell">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-[clamp(3rem,8vw,8.5rem)] leading-[0.95] tracking-[-0.03em]" role="tablist" aria-label="Ventures or careers">
          {(['ventures', 'careers'] as const).map((key, i) => (
            <React.Fragment key={key}>
              {i === 1 && <span className="text-line-strong">/</span>}
              <button
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`cursor-pointer capitalize transition-colors duration-700 ${tab === key ? 'serif-italic text-ink' : 'text-line-strong hover:text-ash'}`}
              >
                {key}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div ref={bodyRef} className="shell">
        {tab === 'ventures' ? (
          <>
            <section className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <p className="meta text-graphite">Partnerships & acquisition</p>
                <h1 className="mt-6 font-display text-headline">
                  Partner with us on <span className="serif-italic">land & development.</span>
                </h1>
                <p className="mt-8 max-w-md text-[17px] leading-relaxed text-graphite">
                  Own prime residential land along Chennai’s ECR, OMR or in the city? Unlock its full value through transparent joint ventures and custom luxury villa developments with Unifra.
                </p>
                <button type="button" onClick={onOpenContact} className="btn btn-ink mt-10">
                  Propose a land parcel
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
              <div className="relative aspect-[5/4] overflow-hidden bg-stone lg:col-span-6 lg:col-start-7" data-clip="up">
                <Img media={MEDIA.oceanfront} alt="Coastal residence at twilight" sizes="(min-width: 1024px) 50vw, 100vw" className="parallax-img" data-parallax="8" />
              </div>
            </section>

            <section className="mt-28 grid gap-px bg-line md:grid-cols-3">
              {VENTURE_MODELS.map((model, i) => (
                <div key={model.title} className="flex min-h-[320px] flex-col justify-between bg-paper p-8 pt-10 md:first:pl-0">
                  <span className="font-display text-[5.5rem] leading-none text-line-strong">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="font-display text-[2.2rem] leading-[1.02]">{model.title}</h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-graphite">{model.desc}</p>
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
          <>
            <section className="mt-20 grid gap-10 lg:grid-cols-12">
              <h1 className="font-display text-headline lg:col-span-7">
                Build the future of <span className="serif-italic">luxury living.</span>
              </h1>
              <p className="max-w-md text-[17px] leading-relaxed text-graphite lg:col-span-4 lg:col-start-9">
                Join architects, project engineers, interior curators and client concierges redefining contemporary residential design in South India.
              </p>
            </section>

            <section className="mt-20 border-t border-ink">
              {OPEN_ROLES.map((role, i) => {
                const open = openRole === i;
                return (
                  <div key={role.title} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setOpenRole(open ? null : i)}
                      aria-expanded={open}
                      className="group grid w-full cursor-pointer items-center gap-4 py-8 text-left sm:grid-cols-12"
                    >
                      <span className="text-[13px] tabular-nums text-ash sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-[clamp(1.9rem,3.2vw,3.2rem)] leading-[1.02] sm:col-span-7">{role.title}</span>
                      <span className="text-[13px] text-graphite sm:col-span-3">
                        {role.type} · {role.exp}
                      </span>
                      <span className="flex sm:col-span-1 sm:justify-end">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-700 ease-luxe ${open ? 'rotate-45 border-ink bg-ink text-paper' : 'border-line-strong'}`}>
                          <Plus className="h-4 w-4" />
                        </span>
                      </span>
                    </button>
                    <div data-role-panel className="h-0 overflow-hidden">
                      <div className="grid gap-6 pb-10 sm:grid-cols-12">
                        <div className="sm:col-span-6 sm:col-start-2">
                          <p className="text-[17px] leading-relaxed text-ink-soft">{role.desc}</p>
                          <p className="mt-4 text-[14px] text-graphite">{role.location}</p>
                        </div>
                        <div className="sm:col-span-4 sm:col-start-9 sm:justify-self-end">
                          <button type="button" onClick={onOpenContact} className="btn btn-line">
                            Apply now
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            <p className="mt-12 text-[15px] text-graphite">
              Don’t see your role? Write to{' '}
              <a href="mailto:careers@unifra.in" className="u-draw text-ink">
                careers@unifra.in
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
