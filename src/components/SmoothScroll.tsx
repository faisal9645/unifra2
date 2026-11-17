import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

type ScrollTarget = string | HTMLElement | number;
interface ScrollOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
}

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
  setLocked: (locked: boolean) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  setLocked: () => {}
});

export const useLenis = () => useContext(LenisContext);

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Web fonts change line breaks — re-measure every trigger once they are in
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6
    });
    lenisRef.current = instance;
    setLenis(instance);
    (window as unknown as { __lenis?: Lenis }).__lenis = instance;

    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback((target: ScrollTarget, options?: ScrollOptions) => {
    const instance = lenisRef.current;
    if (instance) {
      instance.scrollTo(target, {
        offset: options?.offset ?? 0,
        immediate: options?.immediate ?? false,
        duration: options?.duration ?? 1.4,
        force: true
      });
      return;
    }
    const behavior: ScrollBehavior = options?.immediate ? 'auto' : 'smooth';
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior });
    }
  }, []);

  const setLocked = useCallback((locked: boolean) => {
    const instance = lenisRef.current;
    if (instance) {
      if (locked) instance.stop();
      else instance.start();
    }
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  }, []);

  const value = useMemo(() => ({ lenis, scrollTo, setLocked }), [lenis, scrollTo, setLocked]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
};
