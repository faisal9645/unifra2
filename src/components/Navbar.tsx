import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { Roll } from './ui';
import { useLenis } from './SmoothScroll';

export type AppPage =
  | 'home'
  | 'about-story'
  | 'about-team'
  | 'projects'
  | 'mysa-detail'
  | 'contact'
  | 'blog'
  | 'ventures'
  | 'careers'
  | 'admin';

interface NavbarProps {
  currentPage: AppPage;
  onNavigatePage: (page: AppPage) => void;
  onOpenContact: () => void;
  onOpenVillaAccess?: (source?: string) => void;
  isVillaUnlocked?: boolean;
  /** Page opens on a full-bleed image: start with light text until scrolled. */
  overlay?: boolean;
}

const DESKTOP_LINKS: { label: string; page: AppPage; match: AppPage[] }[] = [
  { label: 'Residences', page: 'projects', match: ['projects'] },
  { label: 'MYSA Villas', page: 'mysa-detail', match: ['mysa-detail'] },
  { label: 'Story', page: 'about-story', match: ['about-story', 'about-team'] },
  { label: 'Journal', page: 'blog', match: ['blog'] },
  { label: 'Ventures', page: 'ventures', match: ['ventures', 'careers'] }
];

const MENU_LINKS: { label: string; page: AppPage; note: string }[] = [
  { label: 'Home', page: 'home', note: 'Whispering sanctuaries' },
  { label: 'Residences', page: 'projects', note: 'MYSA now selling · more to come' },
  { label: 'MYSA Villas', page: 'mysa-detail', note: 'The flagship dossier' },
  { label: 'Our Story', page: 'about-story', note: 'Since 2022' },
  { label: 'Leadership', page: 'about-team', note: 'The people behind Unifra' },
  { label: 'Journal', page: 'blog', note: 'Essays on coastal living' },
  { label: 'Ventures & Careers', page: 'ventures', note: 'Land, partnerships, roles' },
  { label: 'Contact', page: 'contact', note: 'Private client advisory' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenContact,
  onOpenVillaAccess,
  isVillaUnlocked = false,
  overlay = false
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { setLocked } = useLenis();

  // Hide on scroll down, reveal on scroll up
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      gsap.set(header, { yPercent: 0 });
      const show = gsap.quickTo(header, 'yPercent', { duration: 0.6, ease: 'expo.out' });
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate(self) {
          const y = self.scroll();
          setAtTop(y < 40);
          if (y < 140) show(0);
          else show(self.direction === 1 ? -110 : 0);
        }
      });
      return () => st.kill();
    },
    { dependencies: [currentPage] }
  );

  // Menu overlay choreography
  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      if (menuOpen) {
        gsap.set(menu, { autoAlpha: 1 });
        gsap
          .timeline()
          .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
          .from('[data-menu-item]', { yPercent: 110, duration: 1.1, stagger: 0.05, ease: 'expo.out' }, 0.35)
          .from('[data-menu-foot]', { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.06 }, 0.6);
      } else {
        gsap.to(menu, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.7,
          ease: 'expo.inOut',
          onComplete: () => {
            gsap.set(menu, { autoAlpha: 0 });
          }
        });
      }
    },
    { dependencies: [menuOpen], scope: menuRef }
  );

  useEffect(() => {
    setLocked(menuOpen);
  }, [menuOpen, setLocked]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (page: AppPage) => {
    setMenuOpen(false);
    if (page === 'mysa-detail' && !isVillaUnlocked && onOpenVillaAccess) {
      onOpenVillaAccess('Navigation — MYSA Villas');
      return;
    }
    onNavigatePage(page);
  };

  const light = overlay && atTop && !menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,color] duration-500 ${
          atTop || menuOpen
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-line bg-paper/90 backdrop-blur-md'
        } ${light ? 'text-paper' : 'text-ink'}`}
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-[height] duration-700 ease-luxe ${
            atTop && !menuOpen ? 'h-[92px] lg:h-[128px]' : 'h-[68px] lg:h-[80px]'
          }`}
        >
          <button
            type="button"
            onClick={() => go('home')}
            className="relative z-10 shrink-0 cursor-pointer"
            aria-label="Unifra Properties — Home"
          >
            <img
              src={light ? '/images/unifra-wordmark-white.png' : '/images/unifra-wordmark-gold.png'}
              alt="Unifra Properties — Creating Desires"
              width={365}
              height={132}
              className={`w-auto transition-[height] duration-700 ease-luxe ${
                atTop && !menuOpen ? 'h-14 lg:h-[88px]' : 'h-9 lg:h-11'
              }`}
            />
          </button>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {DESKTOP_LINKS.map((link) => {
              const active = link.match.includes(currentPage);
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => go(link.page)}
                  className="group relative flex cursor-pointer items-center gap-2 text-[13px] font-medium tracking-[0.01em]"
                >
                  {link.page === 'mysa-detail' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  )}
                  <Roll>{link.label}</Roll>
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-700 ease-luxe ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className={`btn hidden h-11 px-5 sm:inline-flex ${light ? 'btn-light' : 'btn-ink'}`}
            >
              <Roll>Private Tour</Roll>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="group flex h-11 cursor-pointer items-center gap-3 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="meta hidden sm:block">{menuOpen ? 'Close' : 'Menu'}</span>
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-luxe ${
                    menuOpen ? 'top-1.5 rotate-[20deg]' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-luxe ${
                    menuOpen ? 'top-1.5 -rotate-[20deg]' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="mobile-menu-overlay invisible fixed inset-0 z-[55] flex flex-col bg-paper pt-[88px] text-ink opacity-0"
        data-lenis-prevent
      >
        <nav className="shell flex-1 overflow-y-auto pb-8" aria-label="Menu">
          <ul className="divide-y divide-line border-y border-line">
            {MENU_LINKS.map((link, i) => (
              <li key={link.page} className="overflow-hidden">
                <button
                  type="button"
                  data-menu-item
                  onClick={() => go(link.page)}
                  className="group flex w-full cursor-pointer items-baseline justify-between gap-4 py-4 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 text-[11px] tabular-nums text-ash">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`font-display text-[2.6rem] leading-none tracking-[-0.02em] transition-colors duration-500 sm:text-6xl ${
                        currentPage === link.page ? 'text-bronze' : 'group-hover:text-bronze'
                      }`}
                    >
                      {link.label}
                    </span>
                  </span>
                  <span className="hidden text-sm text-ash sm:block">{link.note}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shell grid grid-cols-2 gap-6 border-t border-line py-6 text-sm">
          <a data-menu-foot href="tel:+917358222445" className="tabular-nums">
            +91 73582 22445
          </a>
          <a data-menu-foot href="mailto:info@unifra.in" className="text-right">
            info@unifra.in
          </a>
          <button
            data-menu-foot
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenContact();
            }}
            className="btn btn-ink col-span-2 w-full"
          >
            Book a private tour
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};
