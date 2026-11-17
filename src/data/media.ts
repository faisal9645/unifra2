// Optimized WebP renditions of the original photography (originals untouched in /public/images/mysa3d).
// Generated from the source images: full = large displays, sm = ~1000px for cards & mobile.
export interface Media { src: string; sm: string; w: number; h: number; smW: number }

export const MEDIA = {
  facade: { src: '/images/web/facade.webp', sm: '/images/web/facade-sm.webp', w: 1800, h: 2250, smW: 1000 },
  panorama: { src: '/images/web/panorama.webp', sm: '/images/web/panorama-sm.webp', w: 2600, h: 1314, smW: 1000 },
  entranceNight: { src: '/images/web/entrance-night.webp', sm: '/images/web/entrance-night-sm.webp', w: 2400, h: 1600, smW: 1000 },
  salon: { src: '/images/web/salon.webp', sm: '/images/web/salon-sm.webp', w: 2400, h: 1600, smW: 1000 },
  living: { src: '/images/web/living.webp', sm: '/images/web/living-sm.webp', w: 2400, h: 1361, smW: 1000 },
  kitchen: { src: '/images/web/kitchen.webp', sm: '/images/web/kitchen-sm.webp', w: 2000, h: 1617, smW: 1000 },
  lounge: { src: '/images/web/lounge.webp', sm: '/images/web/lounge-sm.webp', w: 2000, h: 1823, smW: 1000 },
  master: { src: '/images/web/master.webp', sm: '/images/web/master-sm.webp', w: 1884, h: 2157, smW: 1000 },
  bedroomFirst: { src: '/images/web/bedroom-first.webp', sm: '/images/web/bedroom-first-sm.webp', w: 2400, h: 1350, smW: 1000 },
  bedroomGround: { src: '/images/web/bedroom-ground.webp', sm: '/images/web/bedroom-ground-sm.webp', w: 2000, h: 1715, smW: 1000 },
  twilight: { src: '/images/web/twilight.webp', sm: '/images/web/twilight-sm.webp', w: 1114, h: 999, smW: 1000 },
  beachVilla: { src: '/images/web/beach-villa.webp', sm: '/images/web/beach-villa-sm.webp', w: 1376, h: 768, smW: 1000 },
  teakInterior: { src: '/images/web/teak-interior.webp', sm: '/images/web/teak-interior-sm.webp', w: 896, h: 1200, smW: 896 },
  coast: { src: '/images/web/coast.webp', sm: '/images/web/coast-sm.webp', w: 1376, h: 768, smW: 1000 },
  suite: { src: '/images/web/suite.webp', sm: '/images/web/suite-sm.webp', w: 1200, h: 896, smW: 1000 },
  oceanfront: { src: '/images/web/oceanfront.webp', sm: '/images/web/oceanfront-sm.webp', w: 1376, h: 768, smW: 1000 },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof MEDIA;
