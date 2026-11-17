import React, { useRef, useState } from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { AppPage } from './Navbar';
import { Magnetic, Roll } from './ui';
import { useScrollFx } from '../hooks/useScrollFx';
import { useLenis } from './SmoothScroll';

interface FooterProps {
  onNavigatePage: (page: AppPage) => void;
  onOpenContact: () => void;
}

const INDEX: { label: string; page: AppPage }[] = [
  { label: 'Residences', page: 'projects' },
  { label: 'MYSA Villas', page: 'mysa-detail' },
  { label: 'Our Story', page: 'about-story' },
  { label: 'Leadership', page: 'about-team' },
  { label: 'Journal', page: 'blog' },
  { label: 'Ventures & Careers', page: 'ventures' },
  { label: 'Contact', page: 'contact' }
];

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'X', href: 'https://x.com' }
];

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onOpenContact }) => {
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const { scrollTo } = useLenis();
  useScrollFx(ref);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail('');
  };

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-mist text-ink">
      {/* Closing invitation */}
      <div className="shell pt-24 sm:pt-32">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="meta mb-8 text-graphite" data-reveal>
              Private client advisory — reply within two business hours
            </p>
            <h2 className="font-display text-display" data-split>
              Begin a <span className="serif-italic text-bronze">conversation.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-8 lg:col-span-4 lg:items-end" data-reveal data-delay="0.2">
            <p className="max-w-sm text-[15px] leading-relaxed text-graphite lg:text-right">
              Private site previews with chauffeur pick-up, villa acquisitions, joint ventures and bespoke turnkey builds.
            </p>
            <Magnetic>
              <button
                type="button"
                onClick={onOpenContact}
                data-cursor="Begin"
                className="group flex h-36 w-36 cursor-pointer items-center justify-center rounded-full bg-ink text-paper transition-colors duration-700 ease-luxe hover:bg-bronze sm:h-40 sm:w-40"
              >
                <span className="flex flex-col items-center gap-2 text-[13px] font-medium">
                  <ArrowUpRight className="h-6 w-6 transition-transform duration-700 ease-luxe group-hover:rotate-45" />
                  Book a visit
                </span>
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="mt-24 h-px w-full bg-line-strong" data-line />

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4" data-stagger>
            <div>
              <p className="meta mb-3 text-ash">Corporate Studio</p>
              <p className="text-[15px] leading-relaxed">
                4/11, G R Mansion, 2nd Floor, Srinivasa Rd,
                <br />
                T. Nagar, Chennai 600017
              </p>
            </div>
            <div>
              <p className="meta mb-3 text-ash">Experience Pavilion</p>
              <p className="text-[15px] leading-relaxed">
                MYSA Enclave, 122 East Coast Road,
                <br />
                Vettuvankeni, Chennai 600115
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-3" data-stagger>
            <div>
              <p className="meta mb-3 text-ash">Concierge</p>
              <a href="tel:+917358222445" className="u-draw text-[15px] tabular-nums">
                +91 73582 22445
              </a>
            </div>
            <div>
              <p className="meta mb-3 text-ash">Write to us</p>
              <a href="mailto:info@unifra.in" className="u-draw text-[15px]">
                info@unifra.in
              </a>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="u-draw text-sm text-graphite hover:text-ink">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="meta mb-4 text-ash">Index</p>
            <ul className="space-y-2.5" data-stagger>
              {INDEX.map((item) => (
                <li key={item.page}>
                  <button
                    type="button"
                    onClick={() => onNavigatePage(item.page)}
                    className="group cursor-pointer text-[15px]"
                  >
                    <Roll>{item.label}</Roll>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="meta mb-4 text-ash">Private releases</p>
            <p className="mb-6 text-sm leading-relaxed text-graphite">
              Discreet dispatches on upcoming coastal enclaves and private viewings.
            </p>
            {joined ? (
              <p className="text-sm text-bronze-ink">Thank you — private dispatches will arrive shortly.</p>
            ) : (
              <form onSubmit={subscribe} className="flex items-end gap-4">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="field"
                />
                <button type="submit" className="group shrink-0 cursor-pointer border-b border-ink pb-3 text-sm font-medium">
                  <Roll>Join</Roll>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Monumental wordmark */}
      <div className="relative select-none px-[2vw]" aria-hidden="true">
        <p
          data-split
          data-split-by="chars"
          className="text-center font-display text-[30vw] leading-[0.74] tracking-[-0.05em] text-ink"
        >
          Unifra
        </p>
      </div>

      <div className="shell flex flex-col items-start justify-between gap-4 border-t border-line py-6 text-[13px] text-graphite sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Unifra Properties. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => onNavigatePage('contact')} className="u-draw cursor-pointer">
            Privacy
          </button>
          <button type="button" onClick={() => onNavigatePage('contact')} className="u-draw cursor-pointer">
            Terms
          </button>
          <button
            type="button"
            onClick={() => scrollTo(0, { duration: 2 })}
            className="flex cursor-pointer items-center gap-2 text-ink"
            aria-label="Back to top"
          >
            Top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
