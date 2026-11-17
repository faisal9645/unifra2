import { RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion, whenRevealed } from '../lib/gsap';

/**
 * Declarative scroll choreography. Mark up elements with data attributes:
 *
 *  data-split[="load"]        masked line reveal (data-split-by="words|chars" to vary)
 *  data-reveal[="load"]       rise + fade
 *  data-stagger[="load"]      children rise in sequence
 *  data-clip="up|down|left|right|center"   clip-path wipe with media settle
 *  data-line                  hairline draws from the left
 *  data-count="80"            number counter (data-pad="2")
 *  data-parallax="8"          media drifts inside its frame (yPercent)
 *  data-speed="0.12"          element floats against the scroll
 *  data-scrub-words           words ink in with scroll progress
 *  data-delay="0.2"           delay (seconds) for any of the above
 *
 * "load" variants wait for the preloader / page curtain instead of the scroll.
 */
export function useScrollFx(scope: RefObject<HTMLElement | null>, dependencies: unknown[] = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const cleanups: Array<() => void> = [];
      const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
      const delayOf = (el: HTMLElement) => parseFloat(el.dataset.delay || '0');

      const start = (el: HTMLElement, mode: string | undefined, play: () => void) => {
        if (mode === 'load') {
          cleanups.push(whenRevealed(play));
        } else {
          ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: play });
        }
      };

      // Masked text reveals
      all('[data-split]').forEach((el) => {
        const by = el.dataset.splitBy || 'lines';
        let started = false;
        let anim: gsap.core.Tween | null = null;
        SplitText.create(el, {
          type: by === 'lines' ? 'lines' : `lines,${by}`,
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            const targets = by === 'chars' ? self.chars : by === 'words' ? self.words : self.lines;
            anim = gsap.from(targets, {
              yPercent: 135,
              opacity: 0,
              duration: by === 'chars' ? 1.5 : 1.35,
              ease: 'expo.out',
              stagger: by === 'chars' ? 0.028 : by === 'words' ? 0.045 : 0.1,
              delay: delayOf(el),
              paused: !started
            });
            return anim;
          }
        });
        start(el, el.dataset.split, () => {
          started = true;
          anim?.play();
        });
      });

      // Rise + fade
      all('[data-reveal]').forEach((el) => {
        const anim = gsap.from(el, {
          y: 56,
          autoAlpha: 0,
          duration: 1.5,
          delay: delayOf(el),
          paused: true
        });
        start(el, el.dataset.reveal, () => anim.play());
      });

      // Children in sequence
      all('[data-stagger]').forEach((el) => {
        const anim = gsap.from(el.children, {
          y: 44,
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.09,
          delay: delayOf(el),
          paused: true
        });
        start(el, el.dataset.stagger, () => anim.play());
      });

      // Clip-path wipes
      const clipFrom: Record<string, string> = {
        up: 'inset(100% 0% 0% 0%)',
        down: 'inset(0% 0% 100% 0%)',
        left: 'inset(0% 100% 0% 0%)',
        right: 'inset(0% 0% 0% 100%)',
        center: 'inset(22% 22% 22% 22%)'
      };
      all('[data-clip]').forEach((el) => {
        const dir = el.dataset.clip && clipFrom[el.dataset.clip] ? el.dataset.clip : 'up';
        const media = el.querySelector<HTMLElement>('[data-clip-media]') || el.querySelector<HTMLElement>('img, video');
        const tl = gsap.timeline({ paused: true, delay: delayOf(el) });
        tl.fromTo(
          el,
          { clipPath: clipFrom[dir] },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }
        );
        if (media) tl.from(media, { scale: 1.32, duration: 2.3, ease: 'expo.out' }, 0.1);
        start(el, el.dataset.clipMode, () => tl.play());
      });

      // Hairlines
      all('[data-line]').forEach((el) => {
        const anim = gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.8,
          ease: 'expo.inOut',
          delay: delayOf(el),
          paused: true
        });
        start(el, el.dataset.line, () => anim.play());
      });

      // Counters
      all('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count || '0');
        const pad = parseInt(el.dataset.pad || '0', 10);
        const counter = { v: 0 };
        const render = () => {
          el.textContent = String(Math.round(counter.v)).padStart(pad, '0');
        };
        render();
        const anim = gsap.to(counter, {
          v: end,
          duration: 2.4,
          ease: 'power3.out',
          delay: delayOf(el),
          paused: true,
          onUpdate: render
        });
        start(el, el.dataset.countMode, () => anim.play());
      });

      // Parallax media
      all('[data-parallax]').forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || '8');
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // Floating elements
      all('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.12');
        gsap.to(el, {
          y: () => -speed * window.innerHeight,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      });

      // Words ink in with scroll
      all('[data-scrub-words]').forEach((el) => {
        SplitText.create(el, {
          type: 'words',
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.13 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 52%', scrub: 0.6 }
              }
            );
          }
        });
      });

      // Media frames have fixed aspect ratios, so lazy images never shift layout —
      // no per-image refreshes (they cause mid-scroll jank on long pages).
      return () => {
        cleanups.forEach((fn) => fn());
      };
    },
    { scope, dependencies, revertOnUpdate: true }
  );
}
