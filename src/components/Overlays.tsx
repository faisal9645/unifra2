import React, { useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { useLenis } from './SmoothScroll';
import { GalleryItem, BlogPost } from '../types';

/**
 * Shared overlay behaviour: scroll lock, Escape to close, and an animated
 * exit that runs before the parent unmounts the overlay.
 */
function useOverlay(open: boolean, onClose: () => void, exit: () => gsap.core.Timeline | null) {
  const { setLocked } = useLenis();
  const closing = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const close = useCallback(() => {
    if (closing.current) return;
    const tl = prefersReducedMotion() ? null : exit();
    if (!tl) {
      onCloseRef.current();
      return;
    }
    closing.current = true;
    tl.eventCallback('onComplete', () => {
      closing.current = false;
      onCloseRef.current();
    });
  }, [exit]);

  useEffect(() => {
    if (!open) return;
    setLocked(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      setLocked(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, setLocked]);

  return close;
}

const CloseButton: React.FC<{ onClick: () => void; tone?: 'ink' | 'paper' }> = ({ onClick, tone = 'ink' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex h-12 cursor-pointer items-center gap-3 text-[13px] font-medium ${tone === 'paper' ? 'text-paper' : 'text-ink'}`}
    aria-label="Close"
  >
    <span className="hidden sm:inline">Close</span>
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-500 ${
        tone === 'paper' ? 'border-paper/30 group-hover:bg-paper group-hover:text-ink' : 'border-line-strong group-hover:bg-ink group-hover:text-paper'
      }`}
    >
      <X className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
    </span>
  </button>
);

/* ── Film ─────────────────────────────────────────────────────────────── */
export const FilmModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  const exit = useCallback(
    () => (ref.current ? gsap.timeline().to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' }) : null),
    []
  );
  const close = useOverlay(isOpen, onClose, exit);

  useGSAP(
    () => {
      if (!isOpen || !ref.current || prefersReducedMotion()) return;
      gsap
        .timeline()
        .fromTo(ref.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
        .from('[data-film-player]', { scale: 0.92, autoAlpha: 0, duration: 1.2, ease: 'expo.out' }, 0.55);
    },
    { dependencies: [isOpen], scope: ref }
  );

  if (!isOpen) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[120] flex flex-col bg-ink text-paper" role="dialog" aria-modal="true" aria-label="MYSA Luxe Villas film">
      <div className="shell flex items-center justify-between py-5">
        <p className="meta text-paper/70">MYSA Luxe Villas — Official walkthrough</p>
        <CloseButton onClick={close} tone="paper" />
      </div>
      <div className="shell flex flex-1 items-center justify-center pb-10">
        <div data-film-player className="aspect-video w-full max-w-[1400px] overflow-hidden bg-black">
          <iframe
            src="https://www.youtube.com/embed/XuMGAoSu3HE?autoplay=1&rel=0&modestbranding=1"
            title="MYSA Luxe Villas — Official Walkthrough Film"
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

/* ── Lightbox ─────────────────────────────────────────────────────────── */
export const GalleryLightbox: React.FC<{ item: GalleryItem | null; onClose: () => void }> = ({ item, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  const exit = useCallback(
    () => (ref.current ? gsap.timeline().to(ref.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }) : null),
    []
  );
  const close = useOverlay(Boolean(item), onClose, exit);

  useGSAP(
    () => {
      if (!item || !ref.current || prefersReducedMotion()) return;
      gsap
        .timeline()
        .from(ref.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo('[data-lb-frame]', { clipPath: 'inset(8% 8% 8% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0)
        .from('[data-lb-frame] img', { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.1)
        .from('[data-lb-copy] > *', { y: 30, autoAlpha: 0, stagger: 0.07, duration: 1, ease: 'expo.out' }, 0.45);
    },
    { dependencies: [item?.id], scope: ref }
  );

  if (!item) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[120] flex flex-col bg-paper text-ink" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="shell flex items-center justify-between py-5">
        <p className="meta text-graphite">{item.categoryLabel || item.category}</p>
        <CloseButton onClick={close} />
      </div>
      <div className="shell grid min-h-0 flex-1 gap-8 pb-8 lg:grid-cols-12 lg:gap-12" data-lenis-prevent>
        <div data-lb-frame className="relative min-h-[48vh] overflow-hidden bg-stone lg:col-span-8 lg:min-h-0">
          <img src={item.imageUrl} alt={item.title} className="img-cover" />
        </div>
        <div data-lb-copy className="flex flex-col justify-end gap-5 overflow-y-auto lg:col-span-4">
          <p className="text-[13px] text-graphite">{item.location}</p>
          <h2 className="font-display text-[clamp(2.2rem,3.4vw,3.6rem)] leading-[1]">{item.title}</h2>
          <p className="text-[15px] leading-relaxed text-graphite">{item.description}</p>
          <p className="border-t border-line pt-5 text-[13px] font-medium">{item.area}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Essay reader ─────────────────────────────────────────────────────── */
export const ArticleReaderModal: React.FC<{ post: BlogPost | null; onClose: () => void }> = ({ post, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  const exit = useCallback(() => {
    if (!ref.current) return null;
    return gsap
      .timeline()
      .to(ref.current.querySelector('[data-panel]'), { xPercent: 100, duration: 0.8, ease: 'expo.inOut' })
      .to(ref.current.querySelector('[data-scrim]'), { autoAlpha: 0, duration: 0.5 }, 0.2);
  }, []);
  const close = useOverlay(Boolean(post), onClose, exit);

  useGSAP(
    () => {
      if (!post || !ref.current || prefersReducedMotion()) return;
      gsap
        .timeline()
        .from('[data-scrim]', { autoAlpha: 0, duration: 0.6 })
        .from('[data-panel]', { xPercent: 100, duration: 1, ease: 'expo.inOut' }, 0)
        .from('[data-article] > *', { y: 30, autoAlpha: 0, stagger: 0.06, duration: 1, ease: 'expo.out' }, 0.55);
    },
    { dependencies: [post?.id], scope: ref }
  );

  if (!post) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label={post.title}>
      <div data-scrim className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={close} />
      <div data-panel className="absolute inset-y-0 right-0 flex w-full flex-col bg-paper text-ink md:w-[min(760px,92vw)]">
        <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-10">
          <p className="meta text-graphite">Journal — {post.tag}</p>
          <CloseButton onClick={close} />
        </div>
        <div className="flex-1 overflow-y-auto" data-lenis-prevent>
          <article data-article className="px-6 pb-20 pt-10 sm:px-10">
            <p className="text-[13px] text-graphite">
              {post.date} · {post.readTime}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.4vw,3.8rem)] leading-[1]">{post.title}</h2>
            <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-stone">
              <img src={post.imageUrl} alt={post.title} className="img-cover" />
            </div>
            <p className="mt-10 font-display text-[1.65rem] leading-snug text-ink-soft">{post.summary}</p>
            {post.content.map((para, i) => (
              <p key={i} className="mt-6 text-[17px] leading-[1.75] text-graphite">
                {para}
              </p>
            ))}
            <p className="mt-12 border-t border-line pt-6 text-[13px] text-graphite">Unifra Properties — Editorial Journal</p>
          </article>
        </div>
      </div>
    </div>
  );
};
