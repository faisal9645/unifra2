import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../data/mockData';
import { groupProjectsByStatus, isFlagshipMysaProject } from '../utils/portfolioUtils';

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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenContact,
  onOpenVillaAccess,
  isVillaUnlocked = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 36;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (projectsRef.current && !projectsRef.current.contains(target)) {
        setProjectsDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(target)) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleNavClick = (page: AppPage) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setProjectsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const groupedProjects = groupProjectsByStatus(SIGNATURE_PROJECTS);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e5ddd0] py-3 shadow-[0_8px_28px_rgba(22,21,19,0.04)]'
          : 'bg-[#faf7f2]/90 backdrop-blur-sm border-b border-[#e5ddd0]/50 py-3.5 lg:py-4'
      }`}
    >
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88c52] rounded-sm"
            aria-label="Unifra Properties Home"
          >
            <img
              src="/images/unifra-logo-stacked.png"
              alt="Unifra Properties"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-10 sm:h-11' : 'h-11 sm:h-12'
              }`}
            />
          </button>

          {/* Zone 2: Clean Typographic Nav Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary Navigation">
            {/* Projects Dropdown */}
            <div
              ref={projectsRef}
              className="relative"
              onMouseEnter={() => {
                if (projectsTimerRef.current) clearTimeout(projectsTimerRef.current);
                setProjectsDropdownOpen(true);
                setAboutDropdownOpen(false);
              }}
              onMouseLeave={() => {
                projectsTimerRef.current = setTimeout(() => setProjectsDropdownOpen(false), 220);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setProjectsDropdownOpen((prev) => !prev);
                  setAboutDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  currentPage === 'projects' || currentPage === 'mysa-detail'
                    ? 'text-[#161513] font-semibold'
                    : 'text-[#5a544e] hover:text-[#9a6f36]'
                }`}
                aria-expanded={projectsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Projects</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    projectsDropdownOpen ? 'rotate-180 text-[#b88c52]' : 'text-[#8a8278]'
                  }`}
                />
              </button>

              {projectsDropdownOpen && (
                <div className="absolute top-full -left-4 w-80 pt-2.5 z-50">
                  <div className="bg-white border border-[#e5ddd0] shadow-[0_24px_48px_rgba(22,21,19,0.10)] rounded-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleNavClick('projects')}
                      className="w-full text-left px-5 py-3.5 border-b border-[#efe8dc] hover:bg-[#faf7f2] transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                          All Developments
                        </span>
                        <p className="text-[11px] text-[#8a8278] mt-0.5">
                          Explore our Chennai coastal portfolio
                        </p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b88c52] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <div className="py-2">
                      {groupedProjects.map(({ status, projects }) => (
                        <div key={status} className="pt-2 first:pt-0 border-t border-[#f2ece2] first:border-t-0">
                          <div className="px-5 py-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#8a8278]">
                            <span>{status}</span>
                            <span>{projects.length}</span>
                          </div>

                          {projects.map((proj) => {
                            const isMysa = isFlagshipMysaProject(proj);
                            return (
                              <button
                                key={proj.id}
                                type="button"
                                onClick={() => {
                                  if (!isMysa) {
                                    handleNavClick('projects');
                                    return;
                                  }
                                  if (!isVillaUnlocked && onOpenVillaAccess) {
                                    setProjectsDropdownOpen(false);
                                    onOpenVillaAccess('Navbar Dropdown - Mysa Villas');
                                  } else {
                                    handleNavClick('mysa-detail');
                                  }
                                }}
                                className="w-full text-left px-5 py-2.5 hover:bg-[#faf7f2] transition-colors flex items-center justify-between cursor-pointer group"
                              >
                                <div className="min-w-0 pr-3">
                                  <div className="text-xs font-medium text-[#161513] group-hover:text-[#9a6f36] transition-colors truncate">
                                    {proj.name}
                                  </div>
                                  <div className="text-[11px] text-[#8a8278] truncate">
                                    {proj.location} · {proj.specs.bedrooms}
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#b88c52] shrink-0">
                                  {isMysa ? (isVillaUnlocked ? 'Open' : 'Flagship') : 'Private'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div
              ref={aboutRef}
              className="relative"
              onMouseEnter={() => {
                if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
                setAboutDropdownOpen(true);
                setProjectsDropdownOpen(false);
              }}
              onMouseLeave={() => {
                aboutTimerRef.current = setTimeout(() => setAboutDropdownOpen(false), 220);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setAboutDropdownOpen((prev) => !prev);
                  setProjectsDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  currentPage === 'about-story' || currentPage === 'about-team'
                    ? 'text-[#161513] font-semibold'
                    : 'text-[#5a544e] hover:text-[#9a6f36]'
                }`}
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    aboutDropdownOpen ? 'rotate-180 text-[#b88c52]' : 'text-[#8a8278]'
                  }`}
                />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2.5 z-50">
                  <div className="bg-white border border-[#e5ddd0] shadow-[0_24px_48px_rgba(22,21,19,0.10)] rounded-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleNavClick('about-story')}
                      className="w-full text-left px-5 py-3.5 hover:bg-[#faf7f2] transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                          Our Story
                        </span>
                        <p className="text-[11px] text-[#8a8278] mt-0.5">Heritage & design ethos</p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b88c52]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('about-team')}
                      className="w-full text-left px-5 py-3.5 border-t border-[#f2ece2] hover:bg-[#faf7f2] transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                          Leadership Team
                        </span>
                        <p className="text-[11px] text-[#8a8278] mt-0.5">Founders & master builders</p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b88c52]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Lifestyle Journal */}
            <button
              type="button"
              onClick={() => handleNavClick('blog')}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium py-2 transition-colors cursor-pointer relative whitespace-nowrap shrink-0 ${
                currentPage === 'blog'
                  ? 'text-[#161513] font-semibold after:content-[""] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-px after:bg-[#b88c52]'
                  : 'text-[#5a544e] hover:text-[#9a6f36]'
              }`}
            >
              Journal
            </button>

            {/* Ventures */}
            <button
              type="button"
              onClick={() => handleNavClick('ventures')}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium py-2 transition-colors cursor-pointer relative whitespace-nowrap shrink-0 ${
                currentPage === 'ventures' || currentPage === 'careers'
                  ? 'text-[#161513] font-semibold after:content-[""] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-px after:bg-[#b88c52]'
                  : 'text-[#5a544e] hover:text-[#9a6f36]'
              }`}
            >
              Ventures
            </button>

            {/* Contact */}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium py-2 transition-colors cursor-pointer relative whitespace-nowrap shrink-0 ${
                currentPage === 'contact'
                  ? 'text-[#161513] font-semibold after:content-[""] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-px after:bg-[#b88c52]'
                  : 'text-[#5a544e] hover:text-[#9a6f36]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-2 bg-[#161513] hover:bg-[#2a2723] text-[#faf7f2] px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase rounded-sm transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Book Private Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c59b67]" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm text-[#161513] hover:bg-[#efe8dc] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Full-Height Drawer (sibling of header so backdrop-filter never clips fixed positioning) */}
      {mobileMenuOpen && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="fixed inset-0 z-[100] mobile-menu-overlay lg:hidden flex flex-col justify-between bg-[#faf7f2] text-[#161513] animate-in fade-in duration-200"
      >
        <div className="px-6 py-4 border-b border-[#e5ddd0] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer py-1"
            aria-label="Unifra Properties Home"
          >
            <img
              src="/images/unifra-logo-stacked.png"
              alt="Unifra Properties"
              className="h-10 w-auto object-contain"
            />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm border border-[#d9cfc0] text-[#161513] hover:bg-[#efe8dc] transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col divide-y divide-[#e5ddd0]">
            <div className="py-3">
              <button
                type="button"
                onClick={() => setMobileProjectsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-2 text-sm uppercase tracking-[0.18em] font-medium text-[#161513] cursor-pointer"
              >
                <span>Projects</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8a8278] transition-transform duration-200 ${
                    mobileProjectsOpen ? 'rotate-180 text-[#b88c52]' : ''
                  }`}
                />
              </button>

              {mobileProjectsOpen && (
                <div className="mt-2 pl-4 space-y-2 border-l border-[#e5ddd0] py-1">
                  <button
                    type="button"
                    onClick={() => handleNavClick('projects')}
                    className="w-full text-left py-2 text-xs uppercase tracking-wider font-semibold text-[#161513] flex items-center justify-between"
                  >
                    <span>All Developments</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#b88c52]" />
                  </button>
                  {SIGNATURE_PROJECTS.map((proj) => {
                    const isMysa = isFlagshipMysaProject(proj);
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => {
                          if (isMysa) {
                            if (!isVillaUnlocked && onOpenVillaAccess) {
                              setMobileMenuOpen(false);
                              onOpenVillaAccess('Mobile Menu - Mysa Villas');
                            } else {
                              handleNavClick('mysa-detail');
                            }
                          } else {
                            handleNavClick('projects');
                          }
                        }}
                        className="w-full text-left py-2 text-xs flex items-center justify-between text-[#5a544e]"
                      >
                        <span>{proj.name}</span>
                        <span className="text-[10px] font-mono uppercase text-[#b88c52]">
                          {isMysa ? 'Flagship' : proj.statusBadge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('about-story')}
              className="text-left py-4 text-sm uppercase tracking-[0.18em] font-medium text-[#161513]"
            >
              Our Story
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about-team')}
              className="text-left py-4 text-sm uppercase tracking-[0.18em] font-medium text-[#161513]"
            >
              Leadership Team
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('blog')}
              className="text-left py-4 text-sm uppercase tracking-[0.18em] font-medium text-[#161513]"
            >
              Editorial Journal
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('ventures')}
              className="text-left py-4 text-sm uppercase tracking-[0.18em] font-medium text-[#161513]"
            >
              Ventures & Careers
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="text-left py-4 text-sm uppercase tracking-[0.18em] font-medium text-[#161513]"
            >
              Contact
            </button>
          </div>

          <div className="pt-4 flex flex-col gap-3 shrink-0">
            <a
              href="tel:+917358222445"
              className="flex items-center justify-center gap-2 text-xs font-mono py-3.5 rounded-sm border border-[#d9cfc0] text-[#161513]"
            >
              <Phone className="w-4 h-4 text-[#b88c52]" />
              <span>+91 73582 22445</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-4 bg-[#161513] text-[#faf7f2] text-xs font-medium tracking-[0.2em] uppercase text-center rounded-sm cursor-pointer"
            >
              Book Private Tour
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};
