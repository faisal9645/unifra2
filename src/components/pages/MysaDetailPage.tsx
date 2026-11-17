import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Droplets,
  Layers,
  Shield,
  Sparkles,
  X,
  Zap
} from 'lucide-react';
import { MEDIA, Media } from '../../data/media';
import { Img } from '../ui';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { useScrollFx } from '../../hooks/useScrollFx';
import { useLenis } from '../SmoothScroll';
import { ScrollWorld, WorldChapter } from '../ScrollWorld';

export interface MysaPhoto {
  id: string;
  title: string;
  category: 'Facade' | 'Living' | 'Master Suite' | 'Kitchen & Dining';
  categoryLabel: string;
  location: string;
  area: string;
  media: Media;
  description: string;
}

export const MYSA_VILLA_PHOTOS: MysaPhoto[] = [
  {
    id: 'facade-butterfly',
    title: 'Scandinavian butterfly pitched roof & clerestory',
    category: 'Facade',
    categoryLabel: 'Facade & architecture',
    location: 'MYSA Villas, Vettuvankeni ECR',
    area: 'Villa 01 & 02 · Level 2 gable',
    media: MEDIA.facade,
    description: 'Signature Scandinavian butterfly pitched roof clad in dark bronze fascia with front-facing triangular clerestory gable glass and warm recessed soffit LED wash.'
  },
  {
    id: 'facade-granite',
    title: 'Coastal daylight facade & arrival courtyard',
    category: 'Facade',
    categoryLabel: 'Facade & architecture',
    location: 'West elevation & arrival portico',
    area: 'Villa 03 & 04 · Cantilever terrace',
    media: MEDIA.beachVilla,
    description: 'Deep cantilevered dark granite balcony block with toughened glass balustrade, dual architectural satin brass sconces, integrated planter box, and double-car portico.'
  },
  {
    id: 'facade-dusk',
    title: 'MYSA dusk elevation & golden interior illumination',
    category: 'Facade',
    categoryLabel: 'Facade & architecture',
    location: 'Main gated enclave avenue',
    area: 'Full 3-level elevation · 5,800 Sq.Ft.',
    media: MEDIA.twilight,
    description: 'Evening twilight view capturing warm 2700K interior illumination through double-height glass atriums and coastal reflection lap pool.'
  },
  {
    id: 'lotus-gate',
    title: 'Illuminated lotus gate & EV portico',
    category: 'Facade',
    categoryLabel: 'Facade & architecture',
    location: 'Gated enclave arrival boulevard',
    area: 'Monolithic gate monument & driveway',
    media: MEDIA.entranceNight,
    description: 'Monolithic black granite monument with illuminated brass lotus insignia, Belgian cobble arrival driveway, and covered executive EV portico.'
  },
  {
    id: 'furnished-salon',
    title: 'Completed furnished living salon & teak joinery',
    category: 'Living',
    categoryLabel: 'Living & great room',
    location: 'Ground level residence',
    area: '680 Sq.Ft. finished suite',
    media: MEDIA.salon,
    description: 'Authentic coastal salon featuring bespoke Burmese teak armchairs, honed travertine floors, sheer linen drapery, and warm architectural daylight.'
  },
  {
    id: 'grand-living',
    title: 'Double-height great room & floating oak staircase',
    category: 'Living',
    categoryLabel: 'Living & great room',
    location: 'Ground level central atrium',
    area: '920 Sq.Ft. · 22-ft ceiling volume',
    media: MEDIA.living,
    description: 'Expansive 22-foot double-height living room featuring floating timber cantilever staircase, double-ring gold chandelier, and imported composite Italian marble.'
  },
  {
    id: 'culinary-studio',
    title: 'Minimalist culinary studio & quartz waterfall island',
    category: 'Kitchen & Dining',
    categoryLabel: 'Dining & kitchen',
    location: 'Ground level culinary suite',
    area: '450 Sq.Ft. gourmet studio',
    media: MEDIA.kitchen,
    description: 'Seamless waterfall quartz kitchen island with breakfast bar, integrated premium appliances, Blum touch-to-open walnut joinery, and concealed ambient channels.'
  },
  {
    id: 'mezzanine-lounge',
    title: 'First floor family mezzanine lounge & media salon',
    category: 'Living',
    categoryLabel: 'Living & great room',
    location: 'First level entertainment wing',
    area: '580 Sq.Ft.',
    media: MEDIA.lounge,
    description: 'Intimate first-floor family salon and media lounge with bespoke floating credenza, designer sculptural seating, and warm engineered timber flooring.'
  },
  {
    id: 'master-sanctuary',
    title: 'Master sanctuary loft suite & timber rafters',
    category: 'Master Suite',
    categoryLabel: 'Suites & sanctuaries',
    location: 'First level east wing',
    area: '650 Sq.Ft. · cathedral volume',
    media: MEDIA.master,
    description: 'Cathedral volume master suite under the butterfly pitched roof with exposed natural timber rafters, plush king bed suite, and floor-to-ceiling balcony glazing.'
  },
  {
    id: 'first-floor-suite',
    title: 'First floor guest haven with wood slat accent',
    category: 'Master Suite',
    categoryLabel: 'Suites & sanctuaries',
    location: 'First level north wing',
    area: '480 Sq.Ft. ensuite',
    media: MEDIA.bedroomFirst,
    description: 'First floor ensuite bedroom featuring vertical wood slat headboard, integrated warm cove backlighting, and floor-to-ceiling garden glazing.'
  },
  {
    id: 'ground-floor-suite',
    title: 'Ground floor garden suite & pool walkout',
    category: 'Master Suite',
    categoryLabel: 'Suites & sanctuaries',
    location: 'Ground level garden wing',
    area: '460 Sq.Ft. ensuite',
    media: MEDIA.bedroomGround,
    description: 'Ground level bedroom with floor-to-ceiling acoustic sliding glass doors opening directly to the private garden courtyard and lap pool.'
  }
];

const FILTERS: Array<{ id: string; label: string }> = [
  { id: 'All', label: 'All' },
  { id: 'Facade', label: 'Facade' },
  { id: 'Living', label: 'Living' },
  { id: 'Master Suite', label: 'Suites' },
  { id: 'Kitchen & Dining', label: 'Culinary' }
];

const FACTS = [
  { value: '06', label: 'Exclusive villas' },
  { value: '4,450–5,800', label: 'Sq.Ft. built-up' },
  { value: '4 & 5', label: 'BHK, Swedish design' },
  { value: 'G + 2', label: 'Levels with private pool' },
  { value: 'Q1 2027', label: 'Scheduled handover' }
];

type FloorKey = 'ground' | 'first' | 'second';
interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

const FLOORS: Record<FloorKey, { tab: string; title: string; area: string; description: string; highlights: string[]; rooms: Room[] }> = {
  ground: {
    tab: 'Ground',
    title: 'Ground floor',
    area: '1,800 sq.ft.',
    description:
      'Grand entrance foyer leading to expansive double-height living room, guest bedroom suite, modern open kitchen with pantry, powder room, covered dual-car garage, and private outdoor swimming deck with landscaped plunge pool.',
    highlights: ['Double-height living & dining', 'Private lap pool & deck', 'Chef kitchen with prep island', 'Guest suite with garden view'],
    rooms: [
      { x: 10, y: 10, w: 170, h: 150, label: 'Double-height living' },
      { x: 180, y: 10, w: 100, h: 100, label: 'Dining' },
      { x: 280, y: 10, w: 110, h: 100, label: 'Kitchen' },
      { x: 180, y: 110, w: 120, h: 100, label: 'Guest suite' },
      { x: 300, y: 110, w: 90, h: 50, label: 'Powder' },
      { x: 300, y: 160, w: 90, h: 50, label: 'Stair' },
      { x: 10, y: 160, w: 170, h: 130, label: 'Covered garage' },
      { x: 180, y: 210, w: 210, h: 80, label: 'Lap pool & deck' }
    ]
  },
  first: {
    tab: 'First',
    title: 'First floor',
    area: '2,400 sq.ft.',
    description:
      'Master sanctuary suite with Scandinavian timber paneling, private sunrise balcony, walk-in dressing lounge, spa bathroom with freestanding soaking tub, plus two secondary ensuite bedrooms and family lounge.',
    highlights: ['Master suite with walk-in closet', 'Private sun deck balconies', 'Central family lounge', 'Luxury ensuite bathrooms'],
    rooms: [
      { x: 10, y: 10, w: 190, h: 150, label: 'Master sanctuary' },
      { x: 200, y: 10, w: 90, h: 70, label: 'Walk-in' },
      { x: 290, y: 10, w: 100, h: 70, label: 'Spa bath' },
      { x: 200, y: 80, w: 190, h: 80, label: 'Family lounge' },
      { x: 10, y: 160, w: 150, h: 130, label: 'Bedroom two' },
      { x: 160, y: 160, w: 140, h: 130, label: 'Bedroom three' },
      { x: 300, y: 160, w: 90, h: 130, label: 'Sun balcony' }
    ]
  },
  second: {
    tab: 'Second',
    title: 'Second floor & terrace',
    area: '1,600 sq.ft.',
    description:
      'Entertainment lounge / home theater studio, fitness wellness studio, barbecue terrace overlooking coastal treetops, covered pergola seating, and utility laundry area.',
    highlights: ['Rooftop stargazing terrace', 'Private gymnasium / studio', 'Pergola covered seating', 'Solar & DG integration zone'],
    rooms: [
      { x: 10, y: 10, w: 180, h: 140, label: 'Home theatre' },
      { x: 190, y: 10, w: 200, h: 140, label: 'Wellness studio' },
      { x: 10, y: 150, w: 260, h: 140, label: 'Pergola terrace' },
      { x: 270, y: 150, w: 120, h: 60, label: 'Utility' },
      { x: 270, y: 210, w: 120, h: 80, label: 'Solar & DG' }
    ]
  }
};

const AMENITIES = [
  { icon: Droplets, title: 'Private pools', desc: 'Dedicated temperature-balanced lap pools in each individual villa with perimeter timber sun deck.' },
  { icon: Zap, title: '24/7 power backup', desc: '100% DG generator backup covering all central air-conditioners, elevators, and appliances automatically.' },
  { icon: Sparkles, title: 'Smart home automation', desc: 'Integrated app-controlled mood lighting, digital smart door locks, and video door surveillance.' },
  { icon: Layers, title: 'Landscaped gardens', desc: 'Curated botanical courtyard gardens with native tropical flora and automatic drip irrigation.' },
  { icon: Shield, title: 'Biometric security', desc: 'Manned gated entry with computerized visitor verification, boom barriers, and HD infrared CCTV coverage.' },
  { icon: BatteryCharging, title: 'EV charging stations', desc: 'High-speed dedicated fast-charging wallbox provisions in every covered private two-car portico.' }
];

const SPECS: Array<{ key: string; label: string; items: Array<[string, string]> }> = [
  {
    key: 'painting',
    label: 'Painting & finishes',
    items: [
      ['External walls', 'Weather-resistant acrylic exterior emulsion with textured protective coating'],
      ['Internal walls', 'Smooth Asian Paints Royal Luxury plastic emulsion over dual skim coats of putty'],
      ['Ceilings', 'Premium acrylic emulsion paint in pure matte architectural white'],
      ['Driveway & car park', 'Heavy-duty exterior pavers with non-slip polyurethane sealant coating']
    ]
  },
  {
    key: 'plumbing',
    label: 'Plumbing & sanitary',
    items: [
      ['Sanitary ware', 'Wall-hung rimless ceramic water closets with soft-close seat covers (Kohler / Grohe)'],
      ['CP fittings', 'Premium concealed thermostatic diverters with multi-flow rain showerheads'],
      ['Hot water supply', 'Centralized heat-pump solar water heating with instant recirculation'],
      ['Piping', 'CPVC & UPVC lead-free piping with dedicated hydro-pneumatic pressure boosting']
    ]
  },
  {
    key: 'electrical',
    label: 'Electrical & automation',
    items: [
      ['Wiring & cables', 'Concealed copper wiring with FRLS (flame retardant low smoke) insulation'],
      ['Switches & plates', 'Legrand Arteor / Schneider modular switches with brushed metallic plates'],
      ['Power backup', '100% DG power backup with automatic changeover switch (AMF)'],
      ['Smart home', 'App-controlled lighting automation, video door phone, and motorized curtain provision']
    ]
  },
  {
    key: 'flooring',
    label: 'Flooring & wall tiling',
    items: [
      ['Living & dining', 'Imported Italian composite marble slabs with mirror polish finish'],
      ['Master bedroom', 'High-density engineered Scandinavian natural oak wooden flooring'],
      ['Bathrooms', 'Full-body vitrified anti-skid floor tiles with full-height designer wall dado'],
      ['Pool deck & balcony', 'Exterior weatherproof composite wood decking and flamed granite accents']
    ]
  },
  {
    key: 'joinery',
    label: 'Joinery & glazing',
    items: [
      ['Main entrance door', '8-foot high Burma teak wood frame and shutter with Yale biometric digital lock'],
      ['Internal doors', 'Solid core flush doors finished with natural timber veneer and Hafele hardware'],
      ['Windows & sliders', 'Schüco / Saint-Gobain heavy-gauge acoustic aluminum sliding doors with toughened DGU glass'],
      ['Balcony railings', 'Laminated toughened structural glass railings with minimalist SS 316 handrails']
    ]
  },
  {
    key: 'ventilation',
    label: 'Ventilation & air',
    items: [
      ['HVAC provisions', 'Concealed copper piping & drainage designed for Daikin / Mitsubishi VRV multi-split systems'],
      ['Cross-ventilation', 'Optimal Scandinavian passive airflow orientation capturing cool Bay of Bengal evening breezes'],
      ['Kitchen & bath exhaust', 'Low-noise inline acoustic centrifugal exhaust ducts in all wet zones'],
      ['Skylight wells', 'Thermal-insulated double-glazed skylight wells over internal courtyard atriums']
    ]
  }
];

const STAGES = [
  { title: 'Foundation & structure', status: '100% complete', state: 'done' },
  { title: 'Blockwork & plastering', status: '100% complete', state: 'done' },
  { title: 'Electrical & plumbing', status: 'In progress — 85%', state: 'active' },
  { title: 'Finishing touches', status: 'Q4 2026', state: 'next' },
  { title: 'Handover', status: 'Q1 2027', state: 'next' }
] as const;

const PLACES = [
  { min: 3, place: 'Prarthana Beach & ECR Drive-In' },
  { min: 8, place: 'The British International School & Gateway International' },
  { min: 12, place: 'Thiruvanmiyur & TIDEL IT Park, OMR' },
  { min: 18, place: 'Adyar, Boat Club & Apollo Hospital' }
];

const FAQ = [
  {
    q: 'What is the total area of the MYSA Luxe Villas?',
    a: 'Each MYSA Luxe Villa features a generous built-up area ranging from 4,450 to 5,800 square feet spread across three expansive levels, set on an individual land parcel of 2,800 to 3,600 square feet with a private pool and private parking for 2–3 luxury vehicles.'
  },
  {
    q: 'Are the villas part of a gated community?',
    a: 'Yes. MYSA is an exclusive, highly secure private gated enclave of only 6 bespoke residences in Vettuvankeni, ECR. The community features 24/7 security personnel, biometric gate access, CCTV perimeter coverage, and dedicated maintenance staff.'
  },
  {
    q: 'What smart home features are included?',
    a: 'Every villa is equipped with integrated home automation including smart app-controlled mood lighting, biometric front door access with digital passcode and mechanical override, integrated video door phone, smart climate control provisions, and sensor-activated security alerts.'
  },
  {
    q: 'Is there a power backup facility?',
    a: 'Yes, 100% complete diesel generator (DG) power backup is provided for every villa, including all air-conditioning units, home elevators, pool pumps, and general lighting with seamless automatic changeover switches.'
  },
  {
    q: 'What are the customization options available?',
    a: 'Homeowners who secure a villa during construction can select customized interior flooring materials, customized kitchen cabinetry designs, optional private hydraulic glass elevators, and bespoke landscape configurations for the poolside garden.'
  }
];

const WORLD_CHAPTERS: WorldChapter[] = [
  { t0: 0, t1: 1, label: 'Arrival', eyebrow: 'Vettuvankeni · East Coast Road · Chennai', title: 'MYSA Luxe Villas', body: 'A private gated enclave of six Scandinavian pool villas — arriving through the illuminated lotus gate.' },
  { t0: 1, t1: 2.5, label: 'Facade', eyebrow: 'Scandinavian elevation', title: 'Butterfly roofs, cedar & granite', body: 'Asymmetrical butterfly rooflines, triangular clerestory glass, horizontal cedar cladding and cantilevered dark granite.' },
  { t0: 2.5, t1: 4, label: 'Great room', eyebrow: '22-ft volume', title: 'The double-height great room', body: 'An architectural ring chandelier and full-height glazing beneath a 22-foot ceiling.' },
  { t0: 4, t1: 5.5, label: 'Living & dining', eyebrow: 'Ground level heart', title: 'A floating oak staircase', body: 'Cantilevered timber treads rise beside an open dining salon filled with coastal daylight.' },
  { t0: 5.5, t1: 7, label: 'Family lounge', eyebrow: 'Level 1 retreat', title: 'The family media salon', body: 'Acoustic timber slats, low-profile Scandinavian furnishings and views over the great room atrium.' },
  { t0: 7, t1: 8.5, label: 'Kitchen', eyebrow: 'Culinary studio', title: 'Minimal, made to cook', body: 'European modular cabinetry with Blum touch-to-open joinery, a bookmatched marble splashback and concealed appliances.' },
  { t0: 8.5, t1: 10, label: 'Suites', eyebrow: 'Master sanctuary', title: 'Suites that slow the day', body: 'Vertical fluted timber, floating bedside consoles and warm ambient cove light in every en-suite bedroom.' }
];

interface MysaDetailPageProps {
  onOpenContact: () => void;
  onOpenFilm: () => void;
  onNavigateProjects?: () => void;
  onLockVilla?: () => void;
  onNavigateAdmin?: () => void;
}

/* In-page archive viewer with keyboard navigation */
const ArchiveViewer: React.FC<{ index: number; onChange: (i: number) => void; onClose: () => void }> = ({ index, onChange, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setLocked } = useLenis();
  const photo = MYSA_VILLA_PHOTOS[index];
  const count = MYSA_VILLA_PHOTOS.length;

  useEffect(() => {
    setLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % count);
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      setLocked(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [index, count, onChange, onClose, setLocked]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo('[data-viewer-img]', { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'expo.out' });
      gsap.from('[data-viewer-copy] > *', { y: 20, autoAlpha: 0, stagger: 0.05, duration: 0.8, ease: 'expo.out' });
    },
    { dependencies: [index], scope: ref }
  );

  return (
    <div ref={ref} className="fixed inset-0 z-[120] flex flex-col bg-paper text-ink" role="dialog" aria-modal="true" aria-label={photo.title}>
      <div className="shell flex items-center justify-between py-4">
        <p className="text-[13px] tabular-nums text-graphite">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} — {photo.categoryLabel}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line-strong hover:bg-ink hover:text-paper"
          aria-label="Close"
        >
          <X className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>
      <div className="relative min-h-0 flex-1 px-4 sm:px-16">
        <img data-viewer-img key={photo.id} src={photo.media.src} alt={photo.title} className="h-full w-full object-contain" />
        <button
          type="button"
          onClick={() => onChange((index - 1 + count) % count)}
          className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-paper/90 shadow-sm hover:bg-ink hover:text-paper sm:left-6"
          aria-label="Previous photograph"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onChange((index + 1) % count)}
          className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-paper/90 shadow-sm hover:bg-ink hover:text-paper sm:right-6"
          aria-label="Next photograph"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div data-viewer-copy className="shell grid gap-2 py-5 sm:grid-cols-12 sm:items-end sm:gap-8">
        <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.05] sm:col-span-5">{photo.title}</h3>
        <p className="text-[14px] leading-relaxed text-graphite sm:col-span-5">{photo.description}</p>
        <p className="text-[13px] text-graphite sm:col-span-2 sm:text-right">{photo.area}</p>
      </div>
    </div>
  );
};

export const MysaDetailPage: React.FC<MysaDetailPageProps> = ({
  onOpenContact,
  onOpenFilm,
  onNavigateProjects,
  onLockVilla,
  onNavigateAdmin
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const planCopyRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const settled = useRef({ floor: false, spec: false });
  const [filter, setFilter] = useState('All');
  const [viewer, setViewer] = useState<number | null>(null);
  const [floor, setFloor] = useState<FloorKey>('ground');
  const [spec, setSpec] = useState(SPECS[0].key);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const photos = filter === 'All' ? MYSA_VILLA_PHOTOS : MYSA_VILLA_PHOTOS.filter((p) => p.category === filter);
  const activeSpec = SPECS.find((s) => s.key === spec) || SPECS[0];
  const plan = FLOORS[floor];

  // Hero image settles as the page scrolls; progress line & ruler draw in
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-progress-fill]', {
        scaleX: 0,
        scaleY: 0,
        duration: 2.2,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '[data-progress]', start: 'top 80%', once: true }
      });
      gsap.from('[data-ruler-mark]', {
        scale: 0,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '[data-ruler]', start: 'top 80%', once: true }
      });
    },
    { scope: pageRef }
  );

  // Floor plan draws itself whenever the floor changes
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ paused: true });
      tl.fromTo('[data-plan-line]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.07, ease: 'power2.inOut' }).from(
        '[data-plan-label]',
        { autoAlpha: 0, y: 6, stagger: 0.05, duration: 0.6 },
        0.6
      );
      const st = ScrollTrigger.create({ trigger: planRef.current, start: 'top 75%', once: true, onEnter: () => tl.play() });
      if (settled.current.floor && planCopyRef.current) {
        gsap.from(planCopyRef.current.children, { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out' });
      }
      settled.current.floor = true;
      return () => st.kill();
    },
    { scope: planRef, dependencies: [floor], revertOnUpdate: true }
  );

  // FAQ accordion
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('[data-faq-panel]').forEach((panel, i) => {
        gsap.to(panel, { height: openFaq === i ? 'auto' : 0, duration: prefersReducedMotion() ? 0 : 0.7, ease: 'expo.inOut' });
      });
    },
    { scope: pageRef, dependencies: [openFaq] }
  );

  // Archive items rise in, and re-flow whenever the filter changes
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('[data-archive-item]').forEach((el) => {
        gsap.from(el, { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
    },
    { scope: archiveRef, dependencies: [filter], revertOnUpdate: true }
  );

  // Specification rows crossfade on tab change
  useGSAP(
    () => {
      if (prefersReducedMotion() || !settled.current.spec) {
        settled.current.spec = true;
        return;
      }
      gsap.from('[data-spec-row]', { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out' });
    },
    { scope: specRef, dependencies: [spec] }
  );

  useScrollFx(pageRef);

  return (
    <div ref={pageRef} className="bg-paper text-ink">
      {/* Scroll-world walkthrough — the scroll drives the camera */}
      <ScrollWorld
        chapters={WORLD_CHAPTERS}
        src="/videos/mysa-world.mp4"
        srcPortrait="/videos/mysa-world-m.mp4"
        poster="/images/web/world-poster.webp"
        posterPortrait="/images/web/world-poster-m.webp"
        onPlayFilm={onOpenFilm}
        onOpenContact={onOpenContact}
      />

      {/* Access bar */}
      <div className="shell flex flex-wrap items-center justify-between gap-4 border-b border-line py-4 text-[13px]">
        {onNavigateProjects && (
          <button type="button" onClick={onNavigateProjects} className="group flex cursor-pointer items-center gap-2 text-graphite hover:text-ink">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
            All residences
          </button>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-2 text-bronze-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze" /> Private showcase unlocked
          </span>
          {onLockVilla && (
            <button type="button" onClick={onLockVilla} className="u-draw cursor-pointer text-graphite hover:text-ink" title="Lock the showcase to test the gate form again">
              Lock & re-test gate
            </button>
          )}
          {onNavigateAdmin && (
            <button type="button" onClick={onNavigateAdmin} className="u-draw cursor-pointer text-graphite hover:text-ink">
              View leads in /admin
            </button>
          )}
        </div>
      </div>

      {/* Facts */}
      <section className="shell">
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" data-stagger>
          {FACTS.map((f, i) => (
            <div key={f.label} className={`border-b border-line py-8 lg:border-b-0 ${i > 0 ? 'lg:border-l lg:pl-8' : ''}`}>
              <dt className="font-display text-[clamp(2.2rem,3.4vw,3.4rem)] leading-none tabular-nums">{f.value}</dt>
              <dd className="mt-3 text-[13px] text-graphite">{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Concept */}
      <section className="shell grid gap-10 border-t border-line py-28 sm:py-36 lg:grid-cols-12">
        <p className="meta text-graphite lg:col-span-3" data-reveal>
          The concept — Mysa
        </p>
        <div className="lg:col-span-9">
          <p className="font-display text-statement" data-split>
            ‘Mysa’ — the Swedish art of cozy contentment — sits at the heart of six contemporary villas designed for a serene and{' '}
            <span className="serif-italic text-bronze">inspired life.</span>
          </p>
          <div className="mt-12 flex flex-wrap gap-3" data-reveal>
            <button type="button" onClick={onOpenContact} className="btn btn-ink">
              Schedule a private viewing
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="bg-mist py-24 sm:py-32">
        <div className="shell">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="meta mb-5 text-graphite">The visual archive</p>
              <h2 className="font-display text-headline">
                Eleven <span className="serif-italic">photographs.</span>
              </h2>
            </div>
            <div className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`h-10 shrink-0 cursor-pointer rounded-full px-5 text-[13px] transition-colors duration-500 ${
                    filter === f.id ? 'bg-ink text-paper' : 'bg-paper text-graphite hover:text-ink'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={archiveRef} className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {photos.map((photo) => {
              const globalIndex = MYSA_VILLA_PHOTOS.findIndex((p) => p.id === photo.id);
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setViewer(globalIndex)}
                  data-cursor="View"
                  data-archive-item
                  className="group mb-6 block w-full cursor-pointer break-inside-avoid text-left"
                >
                  <span className="relative block overflow-hidden bg-stone" style={{ aspectRatio: `${photo.media.w} / ${photo.media.h}` }}>
                    <Img media={photo.media} alt={photo.title} sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="img-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.05]" />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="text-[14px] font-medium leading-snug">{photo.title}</span>
                    <span className="shrink-0 text-[12px] text-ash">{photo.categoryLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floor plans */}
      <section className="shell py-28 sm:py-36">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="meta mb-5 text-graphite" data-reveal>
              Layout blueprints
            </p>
            <h2 className="font-display text-headline" data-split>
              Three levels, <span className="serif-italic">one flow.</span>
            </h2>
          </div>
          <div className="flex gap-1 rounded-full border border-line-strong p-1" role="tablist" aria-label="Choose a floor">
            {(Object.keys(FLOORS) as FloorKey[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={floor === key}
                onClick={() => setFloor(key)}
                className={`h-10 cursor-pointer rounded-full px-5 text-[13px] transition-colors duration-500 ${floor === key ? 'bg-ink text-paper' : 'text-graphite hover:text-ink'}`}
              >
                {FLOORS[key].tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div ref={planRef} className="border border-line bg-mist p-4 sm:p-8 lg:col-span-7">
            <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label={`${plan.title} schematic`}>
              {plan.rooms.map((room) => (
                <g key={`${floor}-${room.label}`}>
                  <rect
                    data-plan-line
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    pathLength={1}
                    strokeDasharray="1"
                    fill="none"
                    stroke="#0f0f0e"
                    strokeWidth={0.9}
                  />
                  <text
                    data-plan-label
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-graphite"
                    style={{ fontSize: 9, fontFamily: 'Geist, sans-serif', letterSpacing: '0.04em' }}
                  >
                    {room.label}
                  </text>
                </g>
              ))}
              <g data-plan-label transform="translate(372 278)">
                <circle r="9" fill="none" stroke="#a9814a" strokeWidth="0.8" />
                <text textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 8, fontFamily: 'Geist, sans-serif' }} className="fill-bronze">
                  N
                </text>
              </g>
            </svg>
            <p className="mt-4 flex justify-between text-[12px] text-ash">
              <span>Schematic — not to scale</span>
              <span>100% Vastu compliant</span>
            </p>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9">
            <div ref={planCopyRef}>
              <p className="text-[13px] text-graphite">Built-up {plan.area}</p>
              <h3 className="mt-3 font-display text-[2.6rem] leading-[1]">{plan.title}</h3>
              <p className="mt-5 text-[15px] leading-relaxed text-graphite">{plan.description}</p>
              <ul className="mt-8 border-t border-line">
                {plan.highlights.map((h) => (
                  <li key={h} className="border-b border-line py-3 text-[14px]">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={onOpenContact} className="btn btn-line self-start">
              Request CAD blueprints & brochure
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="shell pb-28 sm:pb-36">
        <h2 className="mb-14 font-display text-headline" data-split>
          Comforts, <span className="serif-italic">quietly considered.</span>
        </h2>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a) => (
            <div key={a.title} className="group bg-paper p-8 transition-colors duration-700 hover:bg-mist sm:p-10" data-reveal>
              <a.icon className="h-7 w-7 text-bronze transition-transform duration-700 ease-luxe group-hover:-translate-y-1" strokeWidth={1.2} />
              <h3 className="mt-10 font-display text-[1.9rem] leading-none">{a.title}</h3>
              <p className="mt-4 text-[14px] leading-relaxed text-graphite">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-stone py-28 sm:py-36">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="meta mb-5 text-graphite">Technical specifications</p>
              <h2 className="font-display text-headline">Tier-one, throughout.</h2>
              <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line-strong">
                {SPECS.map((s, i) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSpec(s.key)}
                    aria-pressed={spec === s.key}
                    className={`flex shrink-0 cursor-pointer items-center justify-between gap-6 rounded-full px-5 py-2.5 text-left text-[14px] transition-colors duration-500 lg:rounded-none lg:border-b lg:border-line-strong lg:px-0 lg:py-4 ${
                      spec === s.key ? 'bg-ink text-paper lg:bg-transparent lg:text-ink' : 'bg-paper/60 text-graphite hover:text-ink lg:bg-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="hidden tabular-nums text-ash lg:inline">{String(i + 1).padStart(2, '0')}</span>
                      {s.label}
                    </span>
                    <ArrowRight className={`hidden h-4 w-4 transition-all duration-500 lg:block ${spec === s.key ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div ref={specRef} className="lg:col-span-7 lg:col-start-6">
            <h3 data-spec-row className="font-display text-[2.4rem] leading-none">
              {activeSpec.label}
            </h3>
            <dl className="mt-10 border-t border-ink">
              {activeSpec.items.map(([label, value]) => (
                <div key={`${activeSpec.key}-${label}`} data-spec-row className="grid gap-2 border-b border-line-strong py-6 sm:grid-cols-12 sm:gap-6">
                  <dt className="text-[14px] font-medium sm:col-span-4">{label}</dt>
                  <dd className="text-[15px] leading-relaxed text-graphite sm:col-span-8">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Construction status */}
      <section className="shell py-28 sm:py-36">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-headline" data-split>
            From foundation <span className="serif-italic">to finish.</span>
          </h2>
          <p className="text-[15px] text-graphite" data-reveal>
            Live construction status
          </p>
        </div>
        <div data-progress className="relative">
          {/* desktop track */}
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line-strong md:block">
            <div data-progress-fill className="h-px origin-left bg-ink" style={{ width: '71%' }} />
          </div>
          {/* mobile track */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line-strong md:hidden">
            <div data-progress-fill className="w-px origin-top bg-ink" style={{ height: '62%' }} />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {STAGES.map((stage) => (
              <li key={stage.title} className="flex gap-6 md:block">
                <span
                  className={`relative z-10 mt-0.5 block h-[15px] w-[15px] shrink-0 rounded-full border ${
                    stage.state === 'done'
                      ? 'border-ink bg-ink'
                      : stage.state === 'active'
                        ? 'border-bronze bg-paper ring-4 ring-bronze/20'
                        : 'border-line-strong bg-paper'
                  }`}
                />
                <span className="block md:mt-8">
                  <span className={`block font-display text-[1.7rem] leading-[1.05] ${stage.state === 'next' ? 'text-ash' : ''}`}>{stage.title}</span>
                  <span className={`mt-2 block text-[13px] ${stage.state === 'active' ? 'text-bronze-ink' : 'text-graphite'}`}>{stage.status}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Location ruler */}
      <section className="border-t border-line bg-mist py-28 sm:py-36">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 className="font-display text-headline lg:col-span-6" data-split>
              Minutes from <span className="serif-italic">everything.</span>
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-graphite lg:col-span-5 lg:col-start-8" data-reveal>
              Situated in the serene locale of Vettuvankeni — peaceful coastal living with convenient urban access.
            </p>
          </div>

          <div data-ruler className="relative mt-20 hidden h-56 md:block">
            <div className="absolute inset-x-0 top-1/2 h-px bg-ink" />
            {[0, 5, 10, 15, 20].map((tick) => (
              <span key={tick} className="absolute top-1/2 -translate-x-1/2 pt-4 text-[11px] tabular-nums text-ash" style={{ left: `${(tick / 20) * 100}%` }}>
                {tick}′
              </span>
            ))}
            {PLACES.map((p, i) => (
              <div
                key={p.place}
                data-ruler-mark
                className={`absolute w-56 -translate-x-1/2 text-center ${i % 2 === 0 ? 'bottom-1/2 pb-6' : 'top-1/2 pt-12'}`}
                style={{ left: `${(p.min / 20) * 100}%` }}
              >
                <span className="font-display text-4xl tabular-nums">{String(p.min).padStart(2, '0')} min</span>
                <span className="mt-1 block text-[13px] leading-snug text-graphite">{p.place}</span>
              </div>
            ))}
            {PLACES.map((p) => (
              <span
                key={`${p.place}-dot`}
                data-ruler-mark
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze"
                style={{ left: `${(p.min / 20) * 100}%` }}
              />
            ))}
          </div>

          <ul className="mt-14 border-t border-ink md:hidden" data-stagger>
            {PLACES.map((p) => (
              <li key={p.place} className="flex items-baseline gap-5 border-b border-line-strong py-5">
                <span className="w-24 shrink-0 font-display text-3xl tabular-nums">{String(p.min).padStart(2, '0')} min</span>
                <span className="text-[14px] text-graphite">{p.place}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Client voice */}
      <section className="bg-ink py-32 text-paper sm:py-40">
        <div className="shell">
          <p className="meta mb-12 text-paper/60" data-reveal>
            In their words
          </p>
          <blockquote className="max-w-6xl font-display text-statement" data-split data-split-by="words">
            “Unifra didn’t just build houses; they crafted an architectural discipline with timeless calm. Our villa on ECR is more than a home — it is a sanctuary.”
          </blockquote>
          <div className="mt-14 flex items-center gap-5" data-reveal>
            <span className="h-px w-14 bg-gold" />
            <p className="text-[14px]">
              Mr. Vikram Chandran <span className="text-paper/60">— Resident, MYSA ECR · Architectural Patron</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell grid gap-12 py-28 sm:py-36 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="font-display text-headline lg:sticky lg:top-32" data-split>
            Common <span className="serif-italic">questions.</span>
          </h2>
        </div>
        <div className="border-t border-ink lg:col-span-7 lg:col-start-6">
          {FAQ.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q} className="border-b border-line-strong">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.15]">{item.q}</span>
                  <span className="relative mt-3 h-3 w-3 shrink-0" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-3 bg-ink" />
                    <span className={`absolute left-1/2 top-0 h-3 w-px bg-ink transition-transform duration-500 ${open ? 'scale-y-0' : 'scale-y-100'}`} />
                  </span>
                </button>
                <div data-faq-panel className="h-0 overflow-hidden">
                  <p className="max-w-2xl pb-8 text-[15px] leading-relaxed text-graphite">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {viewer !== null && <ArchiveViewer index={viewer} onChange={setViewer} onClose={() => setViewer(null)} />}
    </div>
  );
};
