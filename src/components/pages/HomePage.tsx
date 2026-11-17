import React, { useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { AppPage } from '../Navbar';
import { ProjectItem } from '../../types';
import { SIGNATURE_PROJECTS } from '../../data/mockData';
import { MEDIA, Media } from '../../data/media';
import { Img, Magnetic, Marquee, Roll, Tilt } from '../ui';
import { isFlagshipMysaProject } from '../../utils/portfolioUtils';
import { gsap, useGSAP, isFinePointer, prefersReducedMotion, whenRevealed } from '../../lib/gsap';
import { useScrollFx } from '../../hooks/useScrollFx';

interface HomePageProps {
  onNavigatePage: (page: AppPage) => void;
  onSelectProject: (project: ProjectItem) => void;
}

/* Photography is used purely as imagery on the home page — each photo once. */

// 3D fly-through: exteriors floating at depth around the headline
const TUNNEL: Array<{ media: Media; x: number; y: number; mx: number; my: number; z: number; w: number; mw: number; ratio: string; alt: string }> = [
  { media: MEDIA.facade, x: 5.1, y: 21.6, mx: 12.2, my: 2.7, z: -200, w: 20, mw: 34, ratio: '4 / 5', alt: 'Butterfly-roof villa elevation' },
  { media: MEDIA.oceanfront, x: 102.4, y: 6.4, mx: 87.8, my: -11.1, z: -500, w: 30, mw: 50, ratio: '16 / 10', alt: 'Coastal residence at twilight' },
  { media: MEDIA.twilight, x: 89.8, y: 86.4, mx: 84.1, my: 93.2, z: -150, w: 17, mw: 32, ratio: '1 / 1', alt: 'Villas glowing at dusk' },
  { media: MEDIA.entranceNight, x: -5.6, y: 105.6, mx: 4.2, my: 115.5, z: -700, w: 28, mw: 52, ratio: '3 / 2', alt: 'Illuminated arrival at night' },
  { media: MEDIA.beachVilla, x: -22.0, y: 60.9, mx: 50.0, my: -15.5, z: -1300, w: 36, mw: 60, ratio: '16 / 9', alt: 'Villa with pool by the sea' },
  { media: MEDIA.panorama, x: 50.0, y: 134.0, mx: 50.0, my: 99.6, z: -1000, w: 40, mw: 70, ratio: '2 / 1', alt: 'Row of contemporary villas' },
  { media: MEDIA.suite, x: 143.3, y: 54.9, mx: 133.5, my: -18.7, z: -1600, w: 34, mw: 40, ratio: '4 / 3', alt: 'Suite opening onto a garden' },
];

// 3D ring: interiors
const RING: Array<{ media: Media; label: string }> = [
  { media: MEDIA.living, label: 'Great room' },
  { media: MEDIA.kitchen, label: 'Culinary studio' },
  { media: MEDIA.lounge, label: 'Family lounge' },
  { media: MEDIA.master, label: 'Loft suite' },
  { media: MEDIA.bedroomFirst, label: 'Timber suite' },
  { media: MEDIA.bedroomGround, label: 'Garden suite' },
  { media: MEDIA.salon, label: 'Teak salon' },
  { media: MEDIA.teakInterior, label: 'Travertine living' }
];

const STATS = [
  { display: '2022', value: 0, pad: 0, unit: '', label: 'Founded in Chennai' },
  { display: '100', value: 100, pad: 0, unit: '%', label: 'Independent land titles' },
  { display: '80', value: 80, pad: 0, unit: '%', label: 'Greenery & open courtyards' },
  { display: '02', value: 2, pad: 2, unit: 'hrs', label: 'Private advisory response' }
];

// Upcoming enclaves are unannounced: soft colour fields stand in for imagery
const TEASER_FIELDS = [
  'radial-gradient(circle at 28% 30%, #f1c98f 0%, transparent 55%), radial-gradient(circle at 72% 72%, #2f4d6b 0%, transparent 58%), #c7b7a2',
  'radial-gradient(circle at 62% 38%, #dcab6c 0%, transparent 55%), radial-gradient(circle at 22% 80%, #5b3b22 0%, transparent 58%), #e7dac7',
  'radial-gradient(circle at 40% 62%, #a9b98b 0%, transparent 56%), radial-gradient(circle at 80% 18%, #f3e7d1 0%, transparent 55%), #cdd5c0'
];

type Discipline = { title: string; tag: string; desc: string; tone: string; art: 'elevation' | 'airflow' | 'swatches' | 'key' };
const DISCIPLINES: Discipline[] = [
  {
    title: 'Bespoke architecture',
    tag: 'Personalized · Contextual',
    desc: 'Site-specific architectural solutions calibrated for coastal light, sea breezes, and private family living.',
    tone: 'bg-stone text-ink',
    art: 'elevation'
  },
  {
    title: 'Innovative engineering',
    tag: 'Biophilic · Smart-ready',
    desc: 'Passive thermal comfort, acoustic glazing, and discreet smart-home orchestration woven seamlessly into each home.',
    tone: 'bg-[#2d2d2c] text-paper',
    art: 'airflow'
  },
  {
    title: 'Timeless materiality',
    tag: 'Stone · Timber · Brass',
    desc: 'Honed natural stone, seasoned Burmese teak, and weathered brass details chosen to age gracefully over decades.',
    tone: 'bg-[#7d5636] text-paper',
    art: 'swatches'
  },
  {
    title: 'Turnkey delivery',
    tag: 'Concept to handover',
    desc: 'Single-point accountability from architectural conception and structural execution to bespoke interior completion.',
    tone: 'bg-[#c9a46e] text-ink',
    art: 'key'
  }
];

const SWATCHES = ['#a4774c', '#2d2d2c', '#ece8e1', '#d3a866'];

/* Line drawings that draw themselves (stroke offset animated by GSAP) */
const LineArt: React.FC<{ kind: Discipline['art'] }> = ({ kind }) => {
  const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, pathLength: 1, strokeDasharray: '1', 'data-draw': true } as const;
  if (kind === 'swatches') {
    return (
      <div className="flex gap-3" aria-hidden="true">
        {SWATCHES.map((tone) => (
          <span key={tone} data-swatch className="h-12 w-12 rounded-full ring-1 ring-white/30" style={{ backgroundColor: tone }} />
        ))}
      </div>
    );
  }
  return (
    <svg viewBox="0 0 200 110" className="h-24 w-auto opacity-80 sm:h-28" aria-hidden="true">
      {kind === 'elevation' && (
        <>
          <path {...line} d="M4 104 H196" />
          <path {...line} d="M30 104 V50 L100 64 L170 34 V104" />
          <path {...line} d="M44 104 V78 H62 V104" />
          <path {...line} d="M80 66 H116 V86 H80 Z" />
          <path {...line} d="M128 58 L156 46 V70 H128 Z" />
        </>
      )}
      {kind === 'airflow' && (
        <>
          <path {...line} d="M40 104 V54 L100 30 L160 54 V104 Z" />
          <path {...line} d="M4 70 C40 52 70 92 100 72 S160 52 196 66" />
          <path {...line} d="M4 86 C46 70 76 104 110 88 S168 72 196 84" />
          <path {...line} d="M10 50 C48 34 82 64 118 48 S172 36 196 46" />
        </>
      )}
      {kind === 'key' && (
        <>
          <circle {...line} cx="48" cy="55" r="22" />
          <circle {...line} cx="48" cy="55" r="8" />
          <path {...line} d="M70 55 H186 M150 55 V72 M166 55 V68 M182 55 V74" />
        </>
      )}
    </svg>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigatePage, onSelectProject }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLElement>(null);
  const shoreRef = useRef<HTMLElement>(null);
  const buildRef = useRef<HTMLElement>(null);

  // Bespoke 3D choreography — created top-to-bottom, before the generic scroll FX
  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const cleanups: Array<() => void> = [];
      const mm = gsap.matchMedia();

      /* ── Hero: camera flies through floating photographs ─────────── */
      const hero = heroRef.current;
      if (hero) {
        const scene = hero.querySelector<HTMLElement>('[data-scene]');
        const cards = Array.from(hero.querySelectorAll<HTMLElement>('[data-tile]'));
        const inners = Array.from(hero.querySelectorAll<HTMLElement>('[data-tile-inner]'));
        cards.forEach((card, i) => gsap.set(card, { xPercent: -50, yPercent: -50, z: TUNNEL[i].z }));

        if (!reduce) {
          // Arrival: tiles drift in from deep space
          const intro = gsap.fromTo(
            inners,
            { z: -1600, autoAlpha: 0 },
            { z: 0, autoAlpha: 1, duration: 2.4, stagger: 0.09, ease: 'expo.out', paused: true }
          );
          cleanups.push(whenRevealed(() => intro.play()));

          // Scroll: dolly forward; tiles fade as they pass the lens; the statement resolves
          const tl = gsap.timeline({
            scrollTrigger: { trigger: hero, start: 'top top', end: '+=170%', pin: true, scrub: 1.2, anticipatePin: 1 }
          });
          cards.forEach((card, i) => {
            const t = TUNNEL[i];
            tl.to(card, { z: t.z + 2400, ease: 'none', duration: 1 }, 0);
            tl.to(card, { autoAlpha: 0, ease: 'none', duration: 0.1 }, Math.min(0.9, Math.max(0, (420 - t.z) / 2400)));
          });
          tl.to('[data-hero-copy]', { scale: 1.3, autoAlpha: 0, ease: 'power1.in', duration: 0.4 }, 0.12).fromTo(
            '[data-hero-statement]',
            { autoAlpha: 0, scale: 0.88 },
            { autoAlpha: 1, scale: 1, ease: 'power2.out', duration: 0.3 },
            0.66
          );

          // Pointer: the whole scene leans with the cursor
          if (scene && isFinePointer()) {
            const rx = gsap.quickTo(scene, 'rotationX', { duration: 1.2, ease: 'power3.out' });
            const ry = gsap.quickTo(scene, 'rotationY', { duration: 1.2, ease: 'power3.out' });
            const onMove = (e: MouseEvent) => {
              rx(((e.clientY / window.innerHeight) - 0.5) * -9);
              ry(((e.clientX / window.innerWidth) - 0.5) * 12);
            };
            window.addEventListener('mousemove', onMove);
            cleanups.push(() => window.removeEventListener('mousemove', onMove));
          }
        }
      }

      /* ── Ring: interiors around a rotating cylinder ──────────────── */
      const ringSection = ringRef.current;
      if (ringSection) {
        const ring = ringSection.querySelector<HTMLElement>('[data-ring]');
        const faces = Array.from(ringSection.querySelectorAll<HTMLElement>('[data-face]'));
        const label = ringSection.querySelector<HTMLElement>('[data-ring-label]');
        const count = ringSection.querySelector<HTMLElement>('[data-ring-count]');
        const step = 360 / RING.length;
        const layout = () => {
          if (!ring || !faces.length) return;
          const radius = (faces[0].offsetWidth / 2 / Math.tan(Math.PI / RING.length)) * 1.12;
          faces.forEach((face, i) => {
            face.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
          });
          gsap.set(ring, { z: -radius });
        };
        layout();
        window.addEventListener('resize', layout);
        cleanups.push(() => window.removeEventListener('resize', layout));

        if (ring && !reduce) {
          gsap.to(ring, {
            rotationY: -(360 - step),
            ease: 'none',
            scrollTrigger: {
              trigger: ringSection,
              start: 'top top',
              end: '+=260%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate(self) {
                const i = Math.min(RING.length - 1, Math.round(self.progress * (RING.length - 1)));
                if (label && label.dataset.i !== String(i)) {
                  label.dataset.i = String(i);
                  label.textContent = RING[i].label;
                  gsap.fromTo(label, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out' });
                }
                if (count) count.textContent = String(i + 1).padStart(2, '0');
              }
            }
          });
        }
      }

      /* ── Shoreline: the coast settles out of a slow zoom ─────────── */
      const shore = shoreRef.current;
      if (shore && !reduce) {
        gsap.fromTo(
          shore.querySelector('[data-zoom]'),
          { scale: 1.3 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: shore, start: 'top bottom', end: 'bottom top', scrub: true } }
        );
      }

      /* ── How we build: panels slide sideways with a coverflow swing ─ */
      const build = buildRef.current;
      if (build && !reduce) {
        gsap
          .timeline({ scrollTrigger: { trigger: build, start: 'top 65%', once: true } })
          .fromTo(build.querySelectorAll('[data-draw]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, stagger: 0.12, ease: 'power2.inOut' })
          .from(build.querySelectorAll('[data-swatch]'), { scale: 0, stagger: 0.08, duration: 0.9, ease: 'back.out(2)' }, 0.4);

        mm.add('(min-width: 768px)', () => {
          const track = build.querySelector<HTMLElement>('[data-track]');
          const bar = build.querySelector<HTMLElement>('[data-bar]');
          const counter = build.querySelector<HTMLElement>('[data-counter]');
          if (!track) return;
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const slide = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: build,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                if (bar) gsap.set(bar, { scaleX: self.progress });
                if (counter) {
                  counter.textContent = String(Math.min(DISCIPLINES.length, Math.floor(self.progress * DISCIPLINES.length) + 1)).padStart(2, '0');
                }
              }
            }
          });
          build.querySelectorAll<HTMLElement>('[data-panel]').forEach((panel) => {
            gsap.fromTo(
              panel,
              { rotationY: -26, transformPerspective: 1400 },
              {
                rotationY: 26,
                ease: 'none',
                scrollTrigger: { trigger: panel, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true }
              }
            );
          });
        });
      }

      return () => {
        mm.revert();
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: pageRef }
  );

  useScrollFx(pageRef);

  const live = SIGNATURE_PROJECTS.find(isFlagshipMysaProject);
  const upcoming = SIGNATURE_PROJECTS.filter((p) => !isFlagshipMysaProject(p));

  return (
    <div ref={pageRef} className="bg-paper text-ink">
      {/* ── 3D fly-through hero ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-paper">
        {/* The 3D stage starts below the (tall, transparent) header so tiles never sit under the logo or nav */}
        <div className="absolute inset-x-0 bottom-0 top-[92px] lg:top-[128px]" style={{ perspective: '1100px' }}>
          <div data-scene className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {TUNNEL.map((t, i) => (
              <div
                key={t.alt}
                data-tile
                className="tunnel-card absolute"
                style={{
                  transformStyle: 'preserve-3d',
                  ['--x' as string]: `${t.x}%`,
                  ['--y' as string]: `${t.y}%`,
                  ['--mx' as string]: `${t.mx}%`,
                  ['--my' as string]: `${t.my}%`,
                  ['--w' as string]: `${t.w}vw`,
                  ['--mw' as string]: `${t.mw}vw`
                }}
              >
                <div data-tile-inner className="relative overflow-hidden bg-stone shadow-[0_40px_90px_rgba(15,15,14,0.22)]" style={{ aspectRatio: t.ratio }}>
                  <Img media={t.media} alt={t.alt} priority={i < 4} sizes="(min-width: 768px) 26vw, 50vw" className="img-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-hero-copy className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <p className="meta text-graphite" data-reveal="load">
            Unifra Properties — Home builders, Chennai
          </p>
          <h1 className="mt-6 font-display text-display">
            <span className="block" data-split="load" data-split-by="chars">
              Whispering
            </span>
            <span className="block serif-italic" data-split="load" data-split-by="chars" data-delay="0.2">
              sanctuaries.
            </span>
          </h1>
          <div className="pointer-events-auto mt-9 flex flex-wrap justify-center gap-3" data-reveal="load" data-delay="0.6">
            <button type="button" onClick={() => onNavigatePage('projects')} className="btn btn-ink group">
              <Roll>Explore residences</Roll>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => onNavigatePage('contact')} className="btn btn-line group bg-paper/70 backdrop-blur-sm">
              <Roll>Talk to us</Roll>
            </button>
          </div>
        </div>

        <div data-hero-statement className="pointer-events-none invisible absolute inset-0 z-10 flex items-center justify-center px-6 opacity-0">
          <p className="max-w-5xl text-center font-display text-statement">
            Considered craftsmanship, architectural restraint and transparent stewardship — converging into{' '}
            <span className="serif-italic text-bronze">remarkable residences that endure.</span>
          </p>
        </div>
      </section>

      {/* ── Unifra in numbers ──────────────────────────────────────────── */}
      <section className="shell pb-24 pt-16 sm:pb-32">
        <p className="meta mb-10 text-graphite" data-reveal>
          (01) — Unifra in numbers
        </p>
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-b border-line py-8 lg:border-b-0 lg:px-8 lg:first:pl-0 ${i % 2 === 0 ? 'border-r pr-6' : 'pl-6'} ${
                i < 3 ? 'lg:border-r' : 'lg:border-r-0'
              }`}
            >
              <dt className="flex items-baseline font-display text-[clamp(3.4rem,6.6vw,7rem)] leading-none tracking-[-0.03em]">
                <span className="tabular-nums" {...(stat.value ? { 'data-count': stat.value, 'data-pad': stat.pad } : {})}>
                  {stat.display}
                </span>
                {stat.unit && <span className="ml-1 text-[0.4em] text-bronze">{stat.unit}</span>}
              </dt>
              <dd className="mt-4 max-w-[14rem] text-sm leading-relaxed text-graphite">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── 3D ring of interiors ───────────────────────────────────────── */}
      <section ref={ringRef} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-mist">
        <div className="shell relative z-10 flex items-start justify-between gap-6 pt-28 sm:pt-32">
          <div>
            <p className="meta mb-4 text-graphite">(02) — Inside</p>
            <h2 className="font-display text-headline">
              Rooms, <span className="serif-italic">in the round.</span>
            </h2>
          </div>
          <p className="hidden text-right font-display text-4xl tabular-nums sm:block">
            <span data-ring-count>01</span>
            <span className="text-ash"> / {String(RING.length).padStart(2, '0')}</span>
          </p>
        </div>

        <div className="absolute inset-0 top-[18%] flex items-center justify-center" style={{ perspective: '1700px' }}>
          <div style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-5deg)' }}>
            <div data-ring className="relative aspect-[4/5] w-[58vw] sm:w-[38vw] lg:w-[23vw]" style={{ transformStyle: 'preserve-3d' }}>
              {RING.map((r) => (
                <div key={r.label} data-face className="absolute inset-0 overflow-hidden bg-stone shadow-[0_30px_70px_rgba(15,15,14,0.18)]" style={{ backfaceVisibility: 'hidden' }}>
                  <Img media={r.media} alt={r.label} sizes="(min-width: 1024px) 24vw, 60vw" className="img-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="shell absolute inset-x-0 bottom-8 z-10 flex items-end justify-between sm:bottom-10">
          <span className="overflow-hidden">
            <span data-ring-label data-i="0" className="block font-display text-[clamp(2rem,3.4vw,3.4rem)] italic leading-[1.1]">
              {RING[0].label}
            </span>
          </span>
          <span className="meta text-graphite">Scroll to turn</span>
        </div>
      </section>

      {/* ── Shoreline + landowners ─────────────────────────────────────── */}
      <section ref={shoreRef} className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Img media={MEDIA.coast} alt="Chennai’s East Coast Road shoreline from above" sizes="100vw" data-zoom className="img-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
        </div>
        <div className="shell relative grid gap-10 pb-12 pt-40 text-paper sm:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="meta text-paper/80" data-reveal>
              For landowners — ECR & OMR
            </p>
            <p className="mt-6 font-display text-headline" data-split>
              Own land by the coast? <span className="serif-italic text-gold">Build with Unifra.</span>
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end" data-reveal>
            <Magnetic>
              <button
                type="button"
                onClick={() => onNavigatePage('ventures')}
                data-cursor="Partner"
                className="group flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-full bg-paper text-[12px] font-medium text-ink transition-colors duration-700 hover:bg-gold"
              >
                <ArrowUpRight className="h-5 w-5 transition-transform duration-700 ease-luxe group-hover:rotate-45" />
                Joint ventures
              </button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ── Residences — 3D tilt cards ─────────────────────────────────── */}
      <section className="shell py-28 sm:py-36">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="meta mb-5 text-graphite" data-reveal>
              (03) — Residences
            </p>
            <h2 className="font-display text-headline" data-split>
              Homes we are <span className="serif-italic">building.</span>
            </h2>
          </div>
          <button type="button" onClick={() => onNavigatePage('projects')} className="btn btn-line group" data-reveal>
            <Roll>All residences</Roll>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div
          className="no-scrollbar -mx-[clamp(1.25rem,4vw,4.5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,4.5rem)] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          data-stagger
        >
          {live && (
            <Tilt className="w-[78vw] shrink-0 snap-start sm:w-auto">
              <button
                type="button"
                onClick={() => onSelectProject(live)}
                data-cursor="Explore"
                className="group relative flex aspect-[3/4] w-full cursor-pointer flex-col justify-between overflow-hidden bg-ink p-7 text-left text-paper"
              >
                <img
                  src="/images/web/world-poster-m.webp"
                  alt="MYSA Luxe Villas at twilight, Vettuvankeni"
                  loading="lazy"
                  className="img-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/45" />
                <span className="relative flex items-center justify-between text-[12px]">
                  <span className="tabular-nums text-paper/70">01</span>
                  <span className="flex items-center gap-2 rounded-full bg-ink/40 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Now selling
                  </span>
                </span>
                <span className="relative">
                  <span className="block font-display text-[clamp(2.6rem,3.6vw,3.8rem)] leading-[0.92]">
                    MYSA
                    <br />
                    <span className="serif-italic text-gold">Luxe Villas</span>
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-4 text-[13px] text-paper/80">
                    Vettuvankeni, East Coast Road
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/30 transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </span>
              </button>
            </Tilt>
          )}
          {upcoming.map((project, i) => (
            <Tilt key={project.id} className="w-[78vw] shrink-0 snap-start sm:w-auto">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                data-cursor="Notify me"
                aria-label="Upcoming enclave — details to be announced"
                className="group relative flex aspect-[3/4] w-full cursor-pointer flex-col justify-between overflow-hidden p-7 text-left"
              >
                <span
                  className="absolute inset-[-20%] animate-[drift_18s_ease-in-out_infinite_alternate] blur-2xl"
                  style={{ background: TEASER_FIELDS[i % TEASER_FIELDS.length], animationDelay: `${i * -4}s` }}
                />
                <span className="relative flex items-center justify-between text-[12px] text-ink">
                  <span className="tabular-nums opacity-60">{String(i + 2).padStart(2, '0')}</span>
                  <span className="flex items-center gap-2 rounded-full bg-paper/80 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-bronze" /> Coming soon
                  </span>
                </span>
                <span className="relative" aria-hidden="true">
                  <span className="block select-none font-display text-[clamp(2.2rem,3vw,3rem)] leading-[0.95] text-ink/70 blur-[6px]">{project.name}</span>
                  <span className="mt-4 block text-[13px] text-ink/70">Details to be announced</span>
                </span>
              </button>
            </Tilt>
          ))}
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────────────────────── */}
      <Marquee className="border-y border-line py-10 sm:py-14">
        {['Quiet luxury', 'Scandinavian discipline', 'Coastal serenity', 'Generational permanence'].map((word, i) => (
          <span key={word} className="flex items-center gap-[4vw] pr-[4vw] font-display text-[13vw] leading-[1.05] tracking-[-0.03em] sm:text-[9vw]">
            <span className={i % 2 === 0 ? 'serif-italic' : ''}>{word}</span>
            <img src="/images/unifra-emblem-gold.png" alt="" className="h-[0.42em] w-[0.42em] object-contain" />
          </span>
        ))}
      </Marquee>

      {/* ── How we build — coverflow disciplines ───────────────────────── */}
      <section ref={buildRef} className="relative overflow-hidden bg-paper md:h-[100svh]">
        <div className="flex h-full flex-col justify-center py-20 md:py-0">
          <div className="shell mb-10 flex items-end justify-between gap-6 md:mb-12">
            <div>
              <p className="meta mb-5 text-graphite">(04) — How we build</p>
              <h2 className="font-display text-headline">
                From first sketch <span className="serif-italic">to final key.</span>
              </h2>
            </div>
            <div className="hidden items-center gap-5 md:flex">
              <span className="font-display text-4xl tabular-nums">
                <span data-counter>01</span>
                <span className="text-ash"> / {String(DISCIPLINES.length).padStart(2, '0')}</span>
              </span>
              <span className="relative block h-px w-40 bg-line-strong">
                <span data-bar className="absolute inset-0 origin-left scale-x-0 bg-ink" />
              </span>
            </div>
          </div>

          <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto md:snap-none md:overflow-visible">
            <div data-track className="flex w-max items-stretch gap-4 px-[clamp(1.25rem,4vw,4.5rem)] md:gap-6">
              {DISCIPLINES.map((d, i) => (
                <article
                  key={d.title}
                  data-panel
                  className={`flex w-[82vw] shrink-0 snap-start flex-col justify-between gap-12 p-8 sm:p-10 md:h-[62vh] md:w-[44vw] lg:w-[36vw] ${d.tone}`}
                >
                  <div className="flex items-start justify-between text-[13px] opacity-80">
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span>{d.tag}</span>
                  </div>
                  <LineArt kind={d.art} />
                  <div>
                    <h3 className="font-display text-[clamp(2.4rem,3.6vw,3.8rem)] leading-[0.95]">{d.title}</h3>
                    <p className="mt-5 max-w-md text-[15px] leading-relaxed opacity-80">{d.desc}</p>
                  </div>
                </article>
              ))}
              <div className="w-[6vw] shrink-0" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
