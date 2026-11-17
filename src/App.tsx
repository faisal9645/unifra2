import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { MessageCircle } from 'lucide-react';

import { Navbar, AppPage } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll, useLenis } from './components/SmoothScroll';
import { FilmModal, ArticleReaderModal } from './components/Overlays';
import { VillaAccessModal, ClientDetails } from './components/VillaAccessModal';

import { HomePage } from './components/pages/HomePage';
import { AboutStoryPage } from './components/pages/AboutStoryPage';
import { OurTeamPage } from './components/pages/OurTeamPage';
import { SignatureProjectsPage } from './components/pages/SignatureProjectsPage';
import { MysaDetailPage } from './components/pages/MysaDetailPage';
import { ContactPage } from './components/pages/ContactPage';
import { JournalPage } from './components/pages/JournalPage';
import { VenturesCareersPage } from './components/pages/VenturesCareersPage';

import { gsap, ScrollTrigger, holdReveal, releaseReveal, prefersReducedMotion } from './lib/gsap';
import { isVillaAccessUnlocked, setVillaAccessUnlocked } from './utils/leadsStorage';
import { SIGNATURE_PROJECTS } from './data/mockData';
import { ProjectItem, BlogPost } from './types';

const PAGE_LABELS: Record<AppPage, string> = {
  home: 'Unifra',
  projects: 'Residences',
  'mysa-detail': 'MYSA Luxe Villas',
  'about-story': 'Our Story',
  'about-team': 'Leadership',
  blog: 'Journal',
  ventures: 'Ventures',
  careers: 'Careers',
  contact: 'Contact',
  admin: 'Client Leads'
};

const PAGE_TITLES: Record<AppPage, string> = {
  home: 'Unifra Properties — Coastal Sanctuaries, East Coast Road Chennai',
  projects: 'Residences — Unifra Properties',
  'mysa-detail': 'MYSA Luxe Villas, Vettuvankeni — Unifra Properties',
  'about-story': 'Our Story — Unifra Properties',
  'about-team': 'Leadership — Unifra Properties',
  blog: 'Journal — Unifra Properties',
  ventures: 'Joint Ventures & Land — Unifra Properties',
  careers: 'Careers — Unifra Properties',
  contact: 'Contact — Unifra Properties',
  admin: 'Client Leads — Unifra Properties'
};

// The internal CRM is only fetched when /admin is opened
const AdminLeadsPage = lazy(() => import('./components/pages/AdminLeadsPage').then((m) => ({ default: m.AdminLeadsPage })));

const isMysa = (p?: ProjectItem | null) => Boolean(p && (p.id === 'mysa' || p.id === 'mysa-villas'));

function AppContent() {
  const { scrollTo } = useLenis();
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const { pathname, hash } = window.location;
    return pathname.startsWith('/admin') || hash === '#admin' ? 'admin' : 'home';
  });

  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const [isVillaUnlocked, setIsVillaUnlocked] = useState<boolean>(() => isVillaAccessUnlocked());
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [gateProject, setGateProject] = useState<ProjectItem | null>(null);
  const [gateSource, setGateSource] = useState('Villa Showcase Gate');
  const [contactPresetInterest, setContactPresetInterest] = useState<string | undefined>(undefined);

  // Concierge button appears once the visitor has moved past the opening view
  const [showFab, setShowFab] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainLabelRef = useRef<HTMLSpanElement>(null);
  const transitioning = useRef(false);

  // Unlock state can change from the admin portal
  useEffect(() => {
    const sync = () => setIsVillaUnlocked(isVillaAccessUnlocked());
    window.addEventListener('unifra_unlock_state_changed', sync);
    return () => window.removeEventListener('unifra_unlock_state_changed', sync);
  }, []);

  // /admin deep link + back/forward
  useEffect(() => {
    const onPop = () => {
      if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') setCurrentPage('admin');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (currentPage === 'admin') {
      if (window.location.pathname !== '/admin') window.history.pushState(null, '', '/admin');
    } else if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  /** Curtain transition: cover, swap the page at the top, then lift. */
  const goTo = useCallback(
    (page: AppPage) => {
      if (transitioning.current) return;
      if (page === currentPage) {
        scrollTo(0, { duration: 1.6 });
        return;
      }

      const curtain = curtainRef.current;
      const label = curtainLabelRef.current;
      if (!curtain || !label || prefersReducedMotion()) {
        setCurrentPage(page);
        scrollTo(0, { immediate: true });
        return;
      }

      transitioning.current = true;
      label.textContent = PAGE_LABELS[page];
      holdReveal();
      const [under, over] = Array.from(curtain.querySelectorAll<HTMLElement>('[data-curtain]'));

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(curtain, { autoAlpha: 0, pointerEvents: 'none' });
            transitioning.current = false;
          }
        })
        .set(curtain, { autoAlpha: 1, pointerEvents: 'auto' })
        .fromTo(under, { yPercent: 100 }, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' })
        .fromTo(over, { yPercent: 100 }, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' }, 0.09)
        .fromTo(label, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' }, 0.5)
        .add(() => {
          scrollTo(0, { immediate: true });
          flushSync(() => setCurrentPage(page));
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        })
        .to(label, { yPercent: -110, duration: 0.55, ease: 'expo.in' }, '+=0.2')
        .add(() => releaseReveal(), '+=0.05')
        .to(over, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '<')
        .to(under, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '<0.1');
    },
    [currentPage, scrollTo]
  );

  const openVillaShowcase = (project?: ProjectItem | null, source = 'Villa Showcase Gate') => {
    setGateProject(project || SIGNATURE_PROJECTS.find((p) => p.id === 'mysa-villas') || null);
    setGateSource(source);
    if (isVillaUnlocked) goTo('mysa-detail');
    else setIsGateOpen(true);
  };

  const handleGateSuccess = (_details: ClientDetails) => {
    setIsVillaUnlocked(true);
    setIsGateOpen(false);
    goTo('mysa-detail');
  };

  const navigate = (page: AppPage) => {
    if (page === 'mysa-detail' && !isVillaUnlocked) {
      openVillaShowcase(null, 'Navigation — MYSA Villas');
      return;
    }
    if (page === 'contact') setContactPresetInterest(undefined);
    goTo(page);
  };

  // Upcoming (non-MYSA) enclaves are unannounced — they route to the pre-release list
  const openConsultation = (project?: ProjectItem) => {
    setContactPresetInterest(project && !isMysa(project) ? 'Upcoming enclaves — early access' : undefined);
    goTo('contact');
  };

  const selectProject = (project: ProjectItem, source: string) => {
    if (isMysa(project)) openVillaShowcase(project, source);
    else openConsultation(project);
  };

  const isAdmin = currentPage === 'admin';

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      {!isAdmin && <Preloader />}
      {!isAdmin && <CustomCursor />}

      <Navbar
        currentPage={currentPage}
        onNavigatePage={navigate}
        onOpenContact={() => openConsultation()}
        onOpenVillaAccess={(source) => openVillaShowcase(null, source || 'Navigation — MYSA Villas')}
        isVillaUnlocked={isVillaUnlocked}
        overlay={currentPage === 'mysa-detail' || isAdmin}
      />

      <main className="relative">
        {currentPage === 'home' && (
          <HomePage onNavigatePage={navigate} onSelectProject={(project) => selectProject(project, 'Home — Residences')} />
        )}

        {currentPage === 'projects' && (
          <SignatureProjectsPage
            onSelectProject={(project) => selectProject(project, 'Residences — Project card')}
            onDownloadBrochure={() => openConsultation()}
            isVillaUnlocked={isVillaUnlocked}
          />
        )}

        {currentPage === 'mysa-detail' && (
          <MysaDetailPage
            onOpenContact={() => openConsultation()}
            onOpenFilm={() => setIsFilmOpen(true)}
            onNavigateProjects={() => navigate('projects')}
            onLockVilla={() => {
              setVillaAccessUnlocked(false);
              setIsVillaUnlocked(false);
              goTo('projects');
            }}
            onNavigateAdmin={() => goTo('admin')}
          />
        )}

        {currentPage === 'about-story' && (
          <AboutStoryPage onNavigateTeam={() => navigate('about-team')} onNavigateProjects={() => navigate('projects')} />
        )}

        {currentPage === 'about-team' && <OurTeamPage onNavigateStory={() => navigate('about-story')} />}

        {currentPage === 'blog' && <JournalPage onReadArticle={setSelectedBlogPost} />}

        {(currentPage === 'ventures' || currentPage === 'careers') && (
          <VenturesCareersPage key={currentPage} type={currentPage} onOpenContact={() => openConsultation()} />
        )}

        {currentPage === 'contact' && <ContactPage presetInterest={contactPresetInterest} />}

        {isAdmin && (
          <Suspense fallback={<div className="min-h-screen bg-[#0b0c0e]" />}>
            <AdminLeadsPage onNavigateHome={() => goTo('home')} onNavigateVilla={() => goTo('mysa-detail')} />
          </Suspense>
        )}
      </main>

      {!isAdmin && <Footer onNavigatePage={navigate} onOpenContact={() => openConsultation()} />}

      {!isAdmin && (
        <a
          href="https://wa.me/917358222445?text=Hello%20Unifra%2C%20I%20would%20like%20to%20know%20more%20about%20MYSA%20Luxe%20Villas."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with the Unifra concierge on WhatsApp"
          className={`group fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_12px_40px_rgba(15,15,14,0.25)] transition-[transform,opacity] duration-500 ease-luxe hover:scale-110 sm:bottom-8 sm:right-8 ${
            showFab ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
          }`}
        >
          <MessageCircle className="h-5 w-5 text-gold" />
        </a>
      )}

      {/* Page curtain */}
      <div ref={curtainRef} className="pointer-events-none invisible fixed inset-0 z-[200] opacity-0" aria-hidden="true">
        <div data-curtain className="absolute inset-0 bg-stone" />
        <div data-curtain className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ink">
          <span className="overflow-hidden">
            <span ref={curtainLabelRef} className="block font-display text-[clamp(3rem,9vw,9rem)] italic leading-[1.1] text-paper" />
          </span>
        </div>
      </div>

      <FilmModal isOpen={isFilmOpen} onClose={() => setIsFilmOpen(false)} />
      <ArticleReaderModal post={selectedBlogPost} onClose={() => setSelectedBlogPost(null)} />
      <VillaAccessModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        project={gateProject}
        onSuccess={handleGateSuccess}
        source={gateSource}
      />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <AppContent />
    </SmoothScroll>
  );
}
