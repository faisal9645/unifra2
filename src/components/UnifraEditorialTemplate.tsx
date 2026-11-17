import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  Check,
  ChevronDown,
  Play,
  Maximize2,
  Compass
} from 'lucide-react';
import { AppPage } from './Navbar';
import { GalleryItem, ProjectItem } from '../types';
import {
  SIGNATURE_PROJECTS,
  GALLERY_ITEMS,
  archInteriorLiving,
  masterSuiteCoastal,
  oceanfrontVillaTwilight
} from '../data/mockData';

interface UnifraEditorialTemplateProps {
  onOpenConsultation: () => void;
  onNavigatePage: (page: AppPage) => void;
  onOpenVillaAccess?: (source?: string) => void;
  onSelectProject?: (project: ProjectItem) => void;
  onWatchFilm?: () => void;
  onSelectGalleryItem?: (item: GalleryItem) => void;
  isVillaUnlocked?: boolean;
}

const SANCTUARY_SPACES = [
  {
    id: 'mysa-facade-scandi',
    label: '01 · Facade',
    roomName: 'Scandinavian Butterfly Elevation',
    level: 'Exterior & Arrival',
    area: '4,150 Sq.Ft. Envelope',
    material: 'Cedar Cladding & Dark Bronze Fascia',
    galleryId: 'mysa-facade-scandi'
  },
  {
    id: 'mysa-living-atrium',
    label: '02 · Great Room',
    roomName: 'Double-Height Atrium & Floating Stairs',
    level: 'Ground Level Heart',
    area: '850 Sq.Ft. · 22-Ft Volume',
    material: 'Honed Italian Marble & Oak Treads',
    galleryId: 'mysa-living-atrium'
  },
  {
    id: 'mysa-culinary-studio',
    label: '03 · Culinary',
    roomName: 'Minimalist Culinary Studio',
    level: 'Ground Level Culinary Wing',
    area: '380 Sq.Ft. Gourmet Kitchen',
    material: 'Bookmatched Calacatta & Walnut',
    galleryId: 'mysa-culinary-studio'
  },
  {
    id: 'mysa-master-loft',
    label: '04 · Master Loft',
    roomName: 'Cathedral Master Sanctuary',
    level: 'Upper Level East Wing',
    area: '620 Sq.Ft. · Cathedral Ceiling',
    material: 'Exposed Burmese Teak Rafters',
    galleryId: 'mysa-master-loft'
  },
  {
    id: 'mysa-mezzanine-lounge',
    label: '05 · Mezzanine',
    roomName: 'Upper Family Media Salon',
    level: 'Level 1 Retreat',
    area: '460 Sq.Ft. Acoustic Lounge',
    material: 'Fluted Timber Slats & Engineered Oak',
    galleryId: 'mysa-mezzanine-lounge'
  },
  {
    id: 'mysa-avenue-gate',
    label: '06 · Twilight Court',
    roomName: 'Twilight Courtyard & Pool Deck',
    level: 'Enclave Grounds',
    area: 'Private Reflection Lap Pool',
    material: 'Monolithic Granite & 2700K Wash',
    galleryId: 'mysa-avenue-gate'
  }
];

const MATERIAL_SWATCHES = [
  { name: 'Burmese Teak', origin: 'Seasoned Timber', tone: '#7d5636' },
  { name: 'Dark Granite', origin: 'Monolithic Stone', tone: '#2d2d2c' },
  { name: 'Greek Thassos', origin: 'White Marble', tone: '#ece8e1' },
  { name: 'Satin Brass', origin: 'Weathered Brass', tone: '#b88c52' }
];

export const UnifraEditorialTemplate: React.FC<UnifraEditorialTemplateProps> = ({
  onOpenConsultation,
  onNavigatePage,
  onOpenVillaAccess,
  onSelectProject,
  onWatchFilm,
  onSelectGalleryItem,
  isVillaUnlocked = false
}) => {
  const [expandedSpec, setExpandedSpec] = useState<number | null>(0);
  const [activeSpaceIndex, setActiveSpaceIndex] = useState<number>(0);

  const handleOpenMysa = () => {
    const mysa = SIGNATURE_PROJECTS.find((p) => p.id === 'mysa-villas');
    if (mysa && onSelectProject) {
      onSelectProject(mysa);
    } else if (onOpenVillaAccess) {
      onOpenVillaAccess('Editorial Home — Mysa Villas');
    } else {
      onNavigatePage('projects');
    }
  };

  const activeSpace = SANCTUARY_SPACES[activeSpaceIndex];
  const activeGalleryItem =
    GALLERY_ITEMS.find((g) => g.id === activeSpace.galleryId) || GALLERY_ITEMS[0];

  const specifications = [
    {
      id: 0,
      number: '01',
      title: 'Materials & Stone',
      desc: 'Hand-selected Burmese teakwood, imported Greek Thassos & Italian Statuario marble, acoustic double-glazed Low-E thermal glass, and weathered satin brass hardware.'
    },
    {
      id: 1,
      number: '02',
      title: 'Biophilic Airflow',
      desc: 'Passive coastal ventilation engineered with Scandinavian asymmetrical butterfly rooflines that channel morning sea breezes from the Bay of Bengal through interior courtyards.'
    },
    {
      id: 2,
      number: '03',
      title: 'Spatial Volume',
      desc: '22-foot double-height living pavilions, cantilevered floating oak staircases, and seamless flush-threshold openings onto private reflection lap pools.'
    },
    {
      id: 3,
      number: '04',
      title: 'Net-Zero Infrastructure',
      desc: 'Concealed 10kW solar arrays, dual 22kW EV supercharging bays at each portico, zero-runoff rainwater percolation, and circadian 2700K architectural lighting.'
    }
  ];

  const secondaryResidences = SIGNATURE_PROJECTS.filter((p) => p.id !== 'mysa-villas');

  return (
    <div className="bg-[#faf7f2] text-[#161513] font-sans">
      {/* =========================================================================
          SECTION 1: ARCHITECTURAL HERO SPLIT + SPECIFICATION BAR
          ========================================================================= */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        {/* Hairline Architectural Geometry Backdrop */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[760px] h-[760px] pointer-events-none opacity-40"
          aria-hidden="true"
        >
          <svg viewBox="0 0 800 800" fill="none" className="w-full h-full stroke-[#dfd5c6]">
            <circle cx="400" cy="400" r="380" strokeWidth="0.75" strokeDasharray="4 6" />
            <circle cx="400" cy="400" r="280" strokeWidth="0.75" />
            <line x1="400" y1="20" x2="400" y2="780" strokeWidth="0.5" />
            <line x1="20" y1="400" x2="780" y2="400" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Editorial Monograph Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-7"
            >
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono uppercase tracking-[0.24em] text-[#7c746b]">
                <span>Vettuvankeni, ECR</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#9a6f36]">Chennai</span>
              </div>

              <h1 className="font-serif-luxury balance-text text-[44px] sm:text-[62px] lg:text-[72px] xl:text-[82px] font-normal tracking-tight text-[#161513] leading-[1.02]">
                Whispering{' '}
                <span className="block italic text-[#b88c52] font-normal">
                  Sanctuaries.
                </span>
              </h1>

              <p className="text-[#5a544e] text-base sm:text-lg font-light leading-relaxed max-w-lg">
                Independent coastal pool villas sculpted between the serenity of Chennai’s shoreline and Scandinavian architectural discipline. Crafted for stillness, privacy, and generational permanence.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-7">
                <button
                  type="button"
                  onClick={handleOpenMysa}
                  className="bg-[#161513] hover:bg-[#2a2723] text-[#faf7f2] px-7 py-4 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-200 flex items-center gap-3 group cursor-pointer rounded-sm"
                >
                  <span>{isVillaUnlocked ? 'Enter MYSA Showcase' : 'Explore Residences'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b67] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => (onWatchFilm ? onWatchFilm() : onOpenConsultation())}
                  className="text-[#161513] hover:text-[#9a6f36] text-[11px] font-medium tracking-[0.18em] uppercase transition-colors flex items-center gap-3 py-3 cursor-pointer group"
                >
                  <span className="w-9 h-9 rounded-full border border-[#cbbda8] group-hover:border-[#b88c52] flex items-center justify-center transition-colors">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </span>
                  <span>Watch Villa Film</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Signature Architectural Arch Viewport */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="lg:col-span-6 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[540px] xl:max-w-[580px] h-[440px] sm:h-[600px] xl:h-[660px] rounded-t-[280px] rounded-b-[16px] overflow-hidden shadow-[0_28px_70px_rgba(22,21,19,0.14)] border border-[#dfd5c5] bg-[#e6dfd3] group">
                <video
                  src="/videos/scrollvideo.mp4"
                  poster="/images/mysa3d/mysa-day.jpg"
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                  className="w-full h-full object-cover hidden md:block group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                />
                <video
                  src="/videos/mobile_friendly_v.mp4"
                  poster="/images/mysa3d/mysa-day.jpg"
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                  className="w-full h-full object-cover md:hidden group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-5 sm:p-6 bg-[#faf7f2]/95 backdrop-blur-md rounded-sm border border-[#e5ddd0]">
                  <p className="font-serif-luxury italic text-lg sm:text-xl text-[#161513] leading-snug">
                    “Where quiet luxury becomes your daily rhythm.”
                  </p>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-[#7c746b] uppercase mt-2 flex items-center gap-2">
                    <span>MYSA Enclave</span>
                    <span aria-hidden="true">·</span>
                    <span>Scandinavian Coastal Architecture</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-Width 4-Column Architectural Specification Bar */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-[#e5ddd0] grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="font-serif-luxury text-3xl sm:text-4xl text-[#161513] tabular-nums">
                06
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7c746b]">
                Private Pool Villas · 3 Reserved
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-serif-luxury text-3xl sm:text-4xl text-[#161513] tabular-nums">
                4,450–5,800
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7c746b]">
                Sq.Ft. Living Area · G + 2 Levels
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-serif-luxury text-3xl sm:text-4xl text-[#161513] tabular-nums">
                22 ft
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7c746b]">
                Double-Height Great Room Volume
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-serif-luxury text-3xl sm:text-4xl text-[#b88c52] tabular-nums">
                Q1 2027
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7c746b]">
                Scheduled Private Handover
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE SPATIAL EXPLORER ("Inside the Sanctuary")
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#f2ece2] border-t border-[#e5ddd0]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] block">
                Spatial Monograph · MYSA Luxe Villas
              </span>
              <h2 className="font-serif-luxury balance-text text-3xl sm:text-5xl font-normal text-[#161513] tracking-tight">
                Inside the <span className="italic text-[#b88c52]">Sanctuary.</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onWatchFilm && (
                <button
                  type="button"
                  onClick={onWatchFilm}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#cbbda8] hover:border-[#161513] bg-[#faf7f2] text-[#161513] text-[11px] font-mono uppercase tracking-[0.18em] rounded-sm transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#b88c52]" />
                  <span>360° Interactive Tour</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleOpenMysa}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#161513] hover:bg-[#2a2723] text-[#faf7f2] text-[11px] font-mono uppercase tracking-[0.18em] rounded-sm transition-colors cursor-pointer"
              >
                <span>{isVillaUnlocked ? 'Floorplans & Pricing' : 'Unlock Full Dossier'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c59b67]" />
              </button>
            </div>
          </div>

          {/* Interactive Room Selector Bar */}
          <div
            role="tablist"
            aria-label="Explore residence spaces"
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#dfd5c5]"
          >
            {SANCTUARY_SPACES.map((space, idx) => {
              const isSelected = idx === activeSpaceIndex;
              return (
                <button
                  key={space.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setActiveSpaceIndex(idx)}
                  className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.16em] rounded-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#161513] text-[#faf7f2]'
                      : 'bg-white/70 text-[#5a544e] hover:bg-white hover:text-[#161513] border border-[#e5ddd0]'
                  }`}
                >
                  {space.label}
                </button>
              );
            })}
          </div>

          {/* Active Spatial Frame + Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 relative rounded-sm overflow-hidden border border-[#dfd5c5] bg-[#e6dfd3] min-h-[340px] sm:min-h-[480px] group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGalleryItem.id}
                  src={activeGalleryItem.imageUrl}
                  alt={activeGalleryItem.title}
                  initial={{ opacity: 0.4, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div className="text-[#faf7f2]">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#dfc08f]">
                    {activeSpace.level} · {activeSpace.area}
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal mt-1">
                    {activeSpace.roomName}
                  </h3>
                </div>

                {onSelectGalleryItem && (
                  <button
                    type="button"
                    onClick={() => onSelectGalleryItem(activeGalleryItem)}
                    className="p-3 bg-[#faf7f2]/95 hover:bg-white text-[#161513] rounded-sm transition-colors cursor-pointer shrink-0"
                    aria-label={`Inspect ${activeSpace.roomName} full screen`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-[#e5ddd0] rounded-sm p-7 sm:p-9 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#9a6f36]">
                  Architectural Study {String(activeSpaceIndex + 1).padStart(2, '0')} / {String(SANCTUARY_SPACES.length).padStart(2, '0')}
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#161513] leading-snug">
                  {activeGalleryItem.title}
                </h3>

                <p className="text-sm text-[#5a544e] font-light leading-relaxed">
                  {activeGalleryItem.description}
                </p>

                <div className="pt-4 border-t border-[#eee7dc] space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono uppercase tracking-wider text-[#8a8278]">Zone</span>
                    <span className="font-medium text-[#161513] text-right">{activeSpace.level}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono uppercase tracking-wider text-[#8a8278]">Scale</span>
                    <span className="font-medium text-[#161513] tabular-nums text-right">{activeSpace.area}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono uppercase tracking-wider text-[#8a8278]">Finish</span>
                    <span className="font-medium text-[#161513] text-right">{activeSpace.material}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#eee7dc] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSpaceIndex(
                      (prev) => (prev - 1 + SANCTUARY_SPACES.length) % SANCTUARY_SPACES.length
                    )
                  }
                  className="text-xs font-mono uppercase tracking-[0.18em] text-[#5a544e] hover:text-[#161513] cursor-pointer py-1"
                >
                  ← Prev Space
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSpaceIndex((prev) => (prev + 1) % SANCTUARY_SPACES.length)
                  }
                  className="text-xs font-mono uppercase tracking-[0.18em] text-[#9a6f36] hover:text-[#161513] cursor-pointer py-1"
                >
                  Next Space →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE RESIDENCES PORTFOLIO
          ========================================================================= */}
      <section id="residences" className="py-16 sm:py-24 bg-[#faf7f2] border-t border-[#e5ddd0]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] block mb-2">
                Curated Coastal Portfolio
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161513] tracking-tight">
                The <span className="italic text-[#b88c52]">Residences.</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigatePage('projects')}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#161513] hover:text-[#9a6f36] uppercase transition-colors cursor-pointer group shrink-0"
            >
              <span>View All Developments</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#b88c52] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Primary 2-Column Arched Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12 mb-12">
            {/* Flagship Card 1: MYSA Villas */}
            <article
              data-cursor="EXPLORE"
              onClick={handleOpenMysa}
              className="group cursor-pointer bg-white rounded-t-[120px] rounded-b-[16px] overflow-hidden border border-[#e5ddd0] hover:border-[#b88c52] shadow-[0_14px_40px_rgba(22,21,19,0.04)] hover:shadow-[0_24px_60px_rgba(22,21,19,0.08)] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-[360px] sm:h-[460px] overflow-hidden bg-[#e6dfd3]">
                <img
                  src="/images/mysa3d/02A.jpg"
                  alt="MYSA Luxe Villas Scandinavian Butterfly Pitched Roof"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-8 sm:p-10 flex items-center justify-between gap-4 border-t border-[#f0e9dd]">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9a6f36] mb-1.5">
                    Flagship Enclave · Now Selling · 3 of 6 Reserved
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                    MYSA Luxe Villas
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a544e] font-light mt-1">
                    Vettuvankeni, East Coast Road · 4 &amp; 5 BHK Pool Villas
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#d6cbb9] flex items-center justify-center shrink-0 group-hover:bg-[#161513] group-hover:text-[#faf7f2] group-hover:border-[#161513] transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </article>

            {/* Card 2: Azure Enclave Oceanfront */}
            <article
              data-cursor="INQUIRE"
              onClick={() => onNavigatePage('projects')}
              className="group cursor-pointer bg-white rounded-t-[120px] rounded-b-[16px] overflow-hidden border border-[#e5ddd0] hover:border-[#b88c52] shadow-[0_14px_40px_rgba(22,21,19,0.04)] hover:shadow-[0_24px_60px_rgba(22,21,19,0.08)] transition-all duration-300 flex flex-col"
            >
              <div className="relative h-[360px] sm:h-[460px] overflow-hidden bg-[#1e1d1b]">
                <img
                  src={oceanfrontVillaTwilight}
                  alt="Azure Enclave Cantilevered Oceanfront Residence at Twilight"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-8 sm:p-10 flex items-center justify-between gap-4 border-t border-[#f0e9dd]">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7c746b] mb-1.5">
                    Private Release · Details on Request
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                    Azure Enclave Oceanfront
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a544e] font-light mt-1">
                    Akkarai, East Coast Road · 4 Ultra-Luxe Coastal Mansions
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#d6cbb9] flex items-center justify-center shrink-0 group-hover:bg-[#161513] group-hover:text-[#faf7f2] group-hover:border-[#161513] transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </article>
          </div>

          {/* Secondary Developments Index Row */}
          <div className="border-t border-[#e5ddd0] divide-y divide-[#e5ddd0]">
            {secondaryResidences.slice(1).map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => (onSelectProject ? onSelectProject(proj) : onNavigatePage('projects'))}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:bg-[#f2ece2]/60 px-2 transition-colors"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-xs font-mono text-[#b88c52] tabular-nums">
                    0{idx + 3}
                  </span>
                  <div>
                    <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                      {proj.name}
                    </h4>
                    <div className="text-xs text-[#7c746b] font-light mt-0.5">
                      {proj.location} · {proj.carpetArea} · {proj.specs.bedrooms}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.18em] text-[#5a544e] group-hover:text-[#161513]">
                  <span>{proj.status}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b88c52] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MATERIALITY & CRAFTSMANSHIP ("Detailing the Sublime")
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#f2ece2] border-t border-[#e5ddd0]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Arched Interior Window + Tactile Material Palette */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative max-w-[500px] mx-auto h-[460px] sm:h-[580px] rounded-t-[250px] rounded-b-[16px] overflow-hidden shadow-[0_24px_60px_rgba(22,21,19,0.1)] border border-[#dfd5c5] bg-[#e6dfd3]">
              <img
                src={archInteriorLiving}
                alt="Travertine & Burmese Teak Living Pavilion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 4 Material Swatches */}
            <div className="max-w-[500px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MATERIAL_SWATCHES.map((swatch) => (
                <div key={swatch.name} className="bg-white border border-[#e5ddd0] rounded-sm p-3">
                  <div
                    className="w-full h-5 rounded-xs mb-2 border border-black/10"
                    style={{ backgroundColor: swatch.tone }}
                  />
                  <div className="text-[11px] font-medium text-[#161513] truncate">{swatch.name}</div>
                  <div className="text-[10px] text-[#8a8278] truncate">{swatch.origin}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Numbered Architectural Specification Accordion */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36]">
                Materials &amp; Craftsmanship
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161513] tracking-tight mt-2">
                Detailing the <span className="italic text-[#b88c52]">Sublime.</span>
              </h2>
            </div>

            <div className="divide-y divide-[#dfd5c5] border-t border-b border-[#dfd5c5]">
              {specifications.map((spec) => {
                const isOpen = expandedSpec === spec.id;
                return (
                  <div key={spec.id} className="py-5 sm:py-6">
                    <button
                      type="button"
                      onClick={() => setExpandedSpec(isOpen ? null : spec.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-5">
                        <span className="text-xs font-mono text-[#b88c52] font-semibold tabular-nums">
                          {spec.number}
                        </span>
                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                          {spec.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7c746b] transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#b88c52]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <p className="mt-3 text-sm text-[#5a544e] font-light leading-relaxed pl-9">
                        {spec.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="text-[#161513] hover:text-[#9a6f36] text-xs font-medium tracking-[0.2em] uppercase transition-colors flex items-center gap-3 py-2 cursor-pointer group"
              >
                <span className="w-9 h-9 rounded-full border border-[#cbbda8] group-hover:border-[#b88c52] flex items-center justify-center transition-colors">
                  <FileText className="w-3.5 h-3.5 text-[#161513] group-hover:text-[#9a6f36]" />
                </span>
                <span>Request Architectural Specification Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ARTISTRY IN LIVING + PATRON QUOTE
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#faf7f2] border-t border-[#e5ddd0]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] block">
                The Sanctuary Experience
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161513] tracking-tight">
                Artistry in <span className="italic text-[#b88c52]">Living.</span>
              </h2>
              <p className="text-[#5a544e] text-base font-light leading-relaxed">
                Every proportion is calibrated to celebrate coastal tranquility. Double-height volumes, shaded verandahs, and natural ocean airflow create an effortless indoor-outdoor rhythm designed for generations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-[#e5ddd0]">
              <div>
                <div className="font-serif-luxury text-4xl sm:text-5xl text-[#161513] tabular-nums">
                  80%
                </div>
                <p className="text-[11px] font-mono tracking-[0.16em] text-[#7c746b] uppercase mt-1.5">
                  Greenery &amp; Open Courtyards
                </p>
              </div>
              <div>
                <div className="font-serif-luxury text-4xl sm:text-5xl text-[#161513] tabular-nums">
                  100%
                </div>
                <p className="text-[11px] font-mono tracking-[0.16em] text-[#7c746b] uppercase mt-1.5">
                  Independent Land Titles
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[380px] sm:h-[520px] rounded-[16px] overflow-hidden shadow-[0_24px_60px_rgba(22,21,19,0.1)] border border-[#e5ddd0]">
              <img
                src={masterSuiteCoastal}
                alt="Master Suite Opening to Coastal Courtyard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <button
                type="button"
                onClick={onOpenConsultation}
                className="absolute bottom-6 right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#161513] hover:bg-[#2a2723] text-[#faf7f2] flex flex-col items-center justify-center p-2 shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer group border border-[#c59b67]/40"
                aria-label="Book a Private Visit"
              >
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-center leading-tight">
                  Book a
                  <br />
                  <strong className="text-[#c59b67] font-serif-luxury text-sm">Visit</strong>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c59b67] mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Editorial Testimonial */}
        <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-10 mt-20 pt-16 border-t border-[#e5ddd0] text-center space-y-6">
          <blockquote className="font-serif-luxury italic text-2xl sm:text-4xl lg:text-[42px] text-[#161513] leading-[1.25] tracking-tight balance-text">
            “Unifra didn’t just build houses; they crafted an architectural discipline with timeless calm. Our villa on ECR is more than a home — it is a sanctuary.”
          </blockquote>
          <div className="pt-2">
            <div className="text-xs font-mono uppercase tracking-[0.24em] text-[#161513] font-semibold">
              Mr. Vikram Chandran
            </div>
            <div className="text-[11px] font-mono tracking-[0.18em] text-[#7c746b] uppercase mt-1">
              Resident, MYSA ECR · Architectural Patron
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: PRIVATE CLIENT ADVISORY (Obsidian Monolith Block)
          ========================================================================= */}
      <section id="contact" className="py-12 sm:py-20 bg-[#faf7f2]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="rounded-[24px] bg-[#161513] text-[#faf7f2] p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-[0_32px_80px_rgba(22,21,19,0.16)]">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#c59b67] block">
                Private Consultation
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#faf7f2]">
                Begin your <span className="italic text-[#c59b67]">journey.</span>
              </h2>
              <p className="text-[#cfc7bc] text-sm sm:text-base font-light leading-relaxed max-w-md">
                Schedule a discreet preview at our ECR Experience Pavilion or request a private architectural portfolio presentation with our senior leadership.
              </p>

              <div className="pt-2 space-y-3 text-xs sm:text-sm font-mono text-[#e8e1d7]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#c59b67] shrink-0" />
                  <span>Vettuvankeni, East Coast Road, Chennai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c59b67] shrink-0" />
                  <a href="tel:+917358222445" className="hover:text-[#c59b67] transition-colors tabular-nums">
                    +91 73582 22445 · Concierge Desk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c59b67] shrink-0" />
                  <a href="mailto:private@unifra.in" className="hover:text-[#c59b67] transition-colors">
                    private@unifra.in
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#211f1c] border border-white/10 p-8 sm:p-10 rounded-[16px] space-y-6">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#c59b67] block">
                Direct Advisory Desk
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#faf7f2] leading-snug font-normal">
                Private site previews with chauffeur pick-up, villa acquisitions, joint ventures &amp; bespoke turnkey builds.
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#d6cfc4] font-light">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#c59b67] shrink-0" />
                  <span>Advisory response within 2 business hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#c59b67] shrink-0" />
                  <span>Complimentary chauffeur pick-up for ECR site visits</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#c59b67] shrink-0" />
                  <span>Discreet, one-to-one architectural walkthroughs</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigatePage('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#faf7f2] hover:bg-[#e8e0d4] text-[#161513] px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-colors cursor-pointer rounded-sm"
              >
                <span>Open Inquiry Form</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9a6f36]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
