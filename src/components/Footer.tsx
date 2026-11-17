import React, { useState } from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { AppPage } from './Navbar';

interface FooterProps {
  onNavigatePage: (page: AppPage) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4500);
  };

  const handleLinkClick = (page: AppPage) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f2ece2] text-[#161513] border-t border-[#e0d6c6] pt-14 pb-10">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#dfd5c5]">
          {/* Column 1: Brand & Ethos */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="cursor-pointer focus:outline-none block text-left"
              aria-label="Unifra Properties Home"
            >
              <img
                src="/images/unifra-logo-stacked.png"
                alt="Unifra Properties"
                className="h-14 w-auto object-contain"
              />
            </button>

            <p className="text-[#5a544e] text-sm font-light leading-relaxed max-w-sm">
              Where considered Scandinavian discipline, natural materials, and coastal serenity converge into enduring residences along Chennai’s East Coast Road.
            </p>

            <div>
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] text-[#9a6f36] hover:text-[#161513] uppercase transition-colors cursor-pointer group"
              >
                <span>Begin a Conversation</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://x.com' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-sm border border-[#d6cbb9] hover:border-[#161513] text-[#5a544e] hover:text-[#161513] flex items-center justify-center transition-colors duration-200"
                >
                  <item.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.22em] text-[#9a6f36] uppercase font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#5a544e] tracking-wider">
              <li>
                <button type="button" onClick={() => handleLinkClick('about-story')} className="hover:text-[#161513] transition-colors cursor-pointer uppercase">
                  Our Story
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('mysa-detail')} className="hover:text-[#161513] transition-colors cursor-pointer uppercase">
                  MYSA Residences
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('projects')} className="hover:text-[#161513] transition-colors cursor-pointer uppercase">
                  All Projects
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('about-team')} className="hover:text-[#161513] transition-colors cursor-pointer uppercase">
                  Leadership Team
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('ventures')} className="hover:text-[#161513] transition-colors cursor-pointer uppercase">
                  Ventures & Careers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleLinkClick('blog')} className="hover:text-[#161513] transition-colors cursor-pointer uppercase">
                  Editorial Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Visit & Connect */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.22em] text-[#161513] uppercase font-semibold">
              Visit & Connect
            </h4>
            <div className="space-y-3.5 text-xs text-[#5a544e] font-light">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8a8278] block mb-0.5">Corporate Studio</span>
                <p className="leading-relaxed">
                  4/11, G R Mansion, 2nd Floor, Srinivasa Rd,<br />
                  T. Nagar, Chennai, Tamil Nadu 600017
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#8a8278] block mb-0.5">Private Desk</span>
                <a href="tel:+917358222445" className="hover:text-[#161513] transition-colors font-mono block tabular-nums">
                  +91 73582 22445
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#8a8278] block mb-0.5">Email</span>
                <a href="mailto:info@unifra.in" className="hover:text-[#161513] transition-colors font-mono">
                  info@unifra.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Private Releases */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.22em] text-[#161513] uppercase font-semibold">
              Private Releases
            </h4>
            <p className="text-xs text-[#5a544e] font-light leading-relaxed">
              Receive discreet dispatches on upcoming coastal enclaves and private viewings.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex items-center border-b border-[#cbbda8] focus-within:border-[#161513] transition-colors py-2">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-transparent text-xs text-[#161513] placeholder-[#8a8278] focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#161513] hover:text-[#9a6f36] transition-colors cursor-pointer ml-3 whitespace-nowrap font-semibold"
                >
                  {isSubscribed ? <Check className="w-4 h-4 text-[#9a6f36]" /> : 'Join'}
                </button>
              </div>

              {isSubscribed && (
                <p className="text-[11px] text-[#9a6f36] font-mono mt-2">
                  Subscribed. Private dispatches will arrive shortly.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#7c746b] uppercase tracking-[0.16em]">
          <div>© 2026 Unifra Properties. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <button type="button" onClick={() => handleLinkClick('contact')} className="hover:text-[#161513] transition-colors cursor-pointer">
              Privacy
            </button>
            <button type="button" onClick={() => handleLinkClick('contact')} className="hover:text-[#161513] transition-colors cursor-pointer">
              Terms
            </button>
            <span className="hidden md:inline text-[#d0c6b7]" aria-hidden="true">·</span>
            <span className="text-[#9a6f36]">Chennai · East Coast Road</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
