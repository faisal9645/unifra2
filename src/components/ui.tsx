import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, isFinePointer, prefersReducedMotion } from '../lib/gsap';
import type { Media } from '../data/media';

/* Responsive image fed by the optimized media manifest */
type ImgProps = {
  media: Media;
  alt: string;
  sizes?: string;
  priority?: boolean;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'alt'>;

export const Img: React.FC<ImgProps> = ({ media, alt, sizes = '100vw', priority = false, ...rest }) => (
  <img
    src={media.src}
    srcSet={`${media.sm} ${media.smW}w, ${media.src} ${media.w}w`}
    sizes={sizes}
    alt={alt}
    width={media.w}
    height={media.h}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={priority ? 'high' : undefined}
    {...rest}
  />
);

/* Centered "Coming soon" badge laid over a blurred teaser image */
export const ComingSoon: React.FC<{ label?: string }> = ({ label = 'Coming soon' }) => (
  <span className="absolute inset-0 flex items-center justify-center">
    <span className="flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 text-[12px] font-medium tracking-[0.02em] text-ink backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
      {label}
    </span>
  </span>
);

/* Two stacked copies that roll on hover */
export const Roll: React.FC<{ children: string }> = ({ children }) => (
  <span className="roll">
    <span>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  </span>
);

/* Pulls its child toward the pointer, springs back on leave */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.32,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !isFinePointer() || prefersReducedMotion()) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
};

/* 3D tilt toward the pointer with a moving light glare (fine pointers only) */
export const Tilt: React.FC<{ children: React.ReactNode; className?: string; max?: number }> = ({
  children,
  className = '',
  max = 9
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !isFinePointer() || prefersReducedMotion()) return;
      const glare = el.querySelector<HTMLElement>('[data-glare]');
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * max * 2);
        rx(-py * max * 2);
        if (glare) {
          glare.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.45), transparent 55%)`;
          gsap.to(glare, { opacity: 1, duration: 0.3 });
        }
      };
      const leave = () => {
        rx(0);
        ry(0);
        if (glare) gsap.to(glare, { opacity: 0, duration: 0.6 });
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`relative will-change-transform ${className}`}>
      {children}
      <span data-glare className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-soft-light" />
    </div>
  );
};

/* Infinite band whose speed & direction follow scroll velocity */
export const Marquee: React.FC<{
  children: React.ReactNode;
  className?: string;
  speed?: number;
}> = ({ children, className = '', speed = 70 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || prefersReducedMotion()) return;
      let half = track.scrollWidth / 2;
      let x = 0;
      let boost = 0;
      let dir = 1;
      const setX = gsap.quickSetter(track, 'x', 'px');
      const onResize = () => {
        half = track.scrollWidth / 2;
      };
      window.addEventListener('resize', onResize);

      const tick = (_time: number, deltaMs: number) => {
        x -= dir * (1 + boost) * speed * (deltaMs / 1000);
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        setX(x);
        boost *= 0.93;
      };

      // Only animate while the band is on screen
      let running = false;
      const run = (on: boolean) => {
        if (on && !running) gsap.ticker.add(tick);
        if (!on && running) gsap.ticker.remove(tick);
        running = on;
      };
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => run(self.isActive),
        onUpdate(self) {
          dir = self.direction;
          boost = Math.min(Math.abs(self.getVelocity()) / 160, 9);
        }
      });
      run(st.isActive);

      return () => {
        run(false);
        window.removeEventListener('resize', onResize);
        st.kill();
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
