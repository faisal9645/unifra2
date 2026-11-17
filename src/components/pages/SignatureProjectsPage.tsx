import React, { useRef, useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../../data/mockData';
import { ProjectItem } from '../../types';
import { isFlagshipMysaProject } from '../../utils/portfolioUtils';
import { gsap, useGSAP, prefersReducedMotion, whenRevealed } from '../../lib/gsap';
import { useScrollFx } from '../../hooks/useScrollFx';
import { ComingSoon, Roll } from '../ui';

interface SignatureProjectsPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onDownloadBrochure: (project: ProjectItem) => void;
  isVillaUnlocked?: boolean;
}

// Only MYSA is live; every other enclave is an upcoming, unannounced teaser.
const FILTERS = ['All', 'Now selling', 'Coming soon'] as const;
type Filter = (typeof FILTERS)[number];

const LIVE_COUNT = SIGNATURE_PROJECTS.filter(isFlagshipMysaProject).length;
const UPCOMING_COUNT = SIGNATURE_PROJECTS.length - LIVE_COUNT;

export const SignatureProjectsPage: React.FC<SignatureProjectsPageProps> = ({
  onSelectProject,
  onDownloadBrochure,
  isVillaUnlocked = false
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const projects = SIGNATURE_PROJECTS.filter((p) =>
    filter === 'All' ? true : filter === 'Now selling' ? isFlagshipMysaProject(p) : !isFlagshipMysaProject(p)
  );

  // Each card recedes as the next one slides over it (large landscape screens)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (orientation: landscape)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector('[data-card-inner]'), {
            scale: 0.9,
            autoAlpha: 0.35,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true }
          });
        });
      });
      const intro = gsap.from('[data-card]', { y: 90, autoAlpha: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out', paused: true });
      const off = whenRevealed(() => intro.play());
      return () => {
        off();
        mm.revert();
      };
    },
    { scope: stackRef, dependencies: [filter], revertOnUpdate: true }
  );

  useScrollFx(pageRef);

  return (
    <div ref={pageRef} className="bg-paper pb-24 pt-32 text-ink sm:pt-40">
      <header className="shell">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="meta mb-8 text-graphite" data-reveal="load">
              Residences — {String(LIVE_COUNT).padStart(2, '0')} now selling · {String(UPCOMING_COUNT).padStart(2, '0')} coming soon
            </p>
            <h1 className="font-display text-display">
              <span className="block" data-split="load">
                Signature
              </span>
              <span className="block serif-italic" data-split="load" data-delay="0.15">
                enclaves.
              </span>
            </h1>
          </div>
          <p className="max-w-md text-[17px] leading-relaxed text-graphite lg:col-span-4" data-reveal="load" data-delay="0.35">
            MYSA Luxe Villas is selling now on East Coast Road. Further enclaves are in private preparation — join the pre-release list for first access.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-2 border-y border-line py-4" role="tablist" aria-label="Filter residences" data-reveal="load" data-delay="0.45">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`h-10 cursor-pointer rounded-full px-5 text-[13px] transition-colors duration-500 ${
                filter === f ? 'bg-ink text-paper' : 'text-graphite hover:bg-stone hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[13px] tabular-nums text-graphite">
            {projects.length} {projects.length === 1 ? 'enclave' : 'enclaves'}
          </span>
        </div>
      </header>

      <div ref={stackRef} className="shell mt-12 space-y-8 desk:space-y-0">
        {projects.map((project, i) => {
          const live = isFlagshipMysaProject(project);
          const blurText = live ? '' : 'select-none blur-[6px]';
          return (
            <section
              key={project.id}
              data-card
              className="desk:sticky desk:top-[96px] desk:h-[calc(100svh-120px)] desk:pb-6"
              aria-label={live ? project.name : 'Upcoming enclave — details to be announced'}
            >
              <div data-card-inner className="grid h-full origin-top overflow-hidden border border-line bg-paper lg:grid-cols-12">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  data-cursor={live ? 'Explore' : 'Notify me'}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-stone lg:col-span-7 lg:aspect-auto"
                  aria-label={live ? `Open ${project.name}` : 'Join the pre-release list for this upcoming enclave'}
                >
                  <img
                    src={project.imageUrl}
                    alt={live ? project.name : ''}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={`img-cover transition-transform duration-[1.6s] ease-luxe ${
                      live ? 'group-hover:scale-[1.05]' : 'scale-110 blur-2xl'
                    }`}
                  />
                  {live ? (
                    <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 text-[12px] font-medium backdrop-blur">
                      {!isVillaUnlocked && <Lock className="h-3 w-3" />}
                      Ongoing · now selling
                    </span>
                  ) : (
                    <ComingSoon />
                  )}
                </button>

                <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5 lg:p-12">
                  <div>
                    <div className="flex items-center justify-between text-[13px] text-graphite">
                      <span className="tabular-nums">
                        {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </span>
                      <span aria-hidden={!live} className={blurText}>
                        {project.location}
                      </span>
                    </div>
                    {!live && <p className="meta mt-8 text-bronze-ink">Upcoming enclave — details to be announced</p>}
                    <div aria-hidden={!live} className={blurText}>
                      <h2 className={`${live ? 'mt-8' : 'mt-4'} font-display text-[clamp(2.5rem,4vw,4.2rem)] leading-[0.95] tracking-[-0.02em]`}>
                        {project.name}
                      </h2>
                      <p className="mt-4 text-[15px] font-medium">{project.tagline}</p>
                      <p className="mt-4 text-[15px] leading-relaxed text-graphite">{project.description}</p>
                    </div>
                  </div>

                  <div>
                    <dl aria-hidden={!live} className={`grid grid-cols-2 border-t border-line text-[14px] ${blurText}`}>
                      {[
                        ['Residences', project.units],
                        ['Carpet area', project.carpetArea],
                        ['Bedrooms', project.specs.bedrooms],
                        ['Levels', project.specs.levels],
                        ['Bathrooms', project.specs.bathrooms],
                        ['Parking', project.specs.parking]
                      ].map(([k, v], idx) => (
                        <div key={k} className={`border-b border-line py-3 ${idx % 2 === 0 ? 'pr-4' : 'border-l pl-4'}`}>
                          <dt className="text-[12px] text-ash">{k}</dt>
                          <dd className="mt-0.5 font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <button type="button" onClick={() => onSelectProject(project)} className="btn btn-ink group">
                        <Roll>{live ? (isVillaUnlocked ? 'View villa showcase' : 'Unlock villa showcase') : 'Join the pre-release list'}</Roll>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                      {live && (
                        <button type="button" onClick={() => onDownloadBrochure(project)} className="btn btn-line group">
                          <Roll>Brochure</Roll>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
};
