import React, { useState, useEffect } from 'react';
import { Navbar, AppPage } from './components/Navbar';
import { UnifraEditorialTemplate } from './components/UnifraEditorialTemplate';
import { UnifraCompanyHero } from './components/UnifraCompanyHero';
import { ThreeHeroVilla } from './components/ThreeHeroVilla';
import { ThreeCarousel } from './components/ThreeCarousel';
import { EditorialSections } from './components/EditorialSections';
import { VirtualTourSection } from './components/VirtualTourSection';
import { BlogSection } from './components/BlogSection';
import { SignatureProjects } from './components/SignatureProjects';
import { Footer } from './components/Footer';
import { SmoothScroll, useLenis } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';

// Full dedicated subpages matching Unifra's complete award-winning website
import { AboutStoryPage } from './components/pages/AboutStoryPage';
import { OurTeamPage } from './components/pages/OurTeamPage';
import { SignatureProjectsPage } from './components/pages/SignatureProjectsPage';
import { MysaDetailPage } from './components/pages/MysaDetailPage';
import { ContactPage } from './components/pages/ContactPage';
import { VenturesCareersPage } from './components/pages/VenturesCareersPage';
import { AdminLeadsPage } from './components/pages/AdminLeadsPage';

import {
  VirtualTourModal,
  GalleryLightbox,
  ArticleReaderModal
} from './components/Modals';
import { VillaAccessModal, ClientDetails } from './components/VillaAccessModal';
import { isVillaAccessUnlocked, setVillaAccessUnlocked } from './utils/leadsStorage';
import { SIGNATURE_PROJECTS } from './data/mockData';
import { Hotspot, GalleryItem, ProjectItem, BlogPost } from './types';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

function AppContent() {
  const { scrollTo } = useLenis();

  // Editorial Ivory Luxury Theme
  const theme = 'light';

  useEffect(() => {
    document.body.classList.add('theme-light');
    try {
      localStorage.setItem('unifra_theme', 'light');
    } catch {
      // ignore
    }
  }, []);

  // Page routing state
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  // Modal states
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Villa showcase gated access state
  const [isVillaUnlocked, setIsVillaUnlocked] = useState<boolean>(() => isVillaAccessUnlocked());
  const [isVillaAccessModalOpen, setIsVillaAccessModalOpen] = useState(false);
  const [pendingVillaProject, setPendingVillaProject] = useState<ProjectItem | null>(null);
  const [villaAccessSource, setVillaAccessSource] = useState<string>('Villa Showcase Gate');

  // Listen for unlock state changes from admin portal or other components
  useEffect(() => {
    const handleUnlockChange = () => {
      setIsVillaUnlocked(isVillaAccessUnlocked());
    };
    window.addEventListener('unifra_unlock_state_changed', handleUnlockChange);
    return () => window.removeEventListener('unifra_unlock_state_changed', handleUnlockChange);
  }, []);

  // Support direct navigation to /admin or #admin
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin') {
        setCurrentPage('admin');
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Sync URL when page changes to admin
  useEffect(() => {
    if (currentPage === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
  }, [currentPage]);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenVillaShowcase = (project?: ProjectItem | null, source = 'Villa Showcase Gate') => {
    const targetProject = project || SIGNATURE_PROJECTS.find(p => p.id === 'mysa-villas') || null;
    setPendingVillaProject(targetProject);
    setVillaAccessSource(source);
    if (isVillaUnlocked) {
      setCurrentPage('mysa-detail');
      scrollTo(0, { immediate: true });
    } else {
      setIsVillaAccessModalOpen(true);
    }
  };

  const handleVillaAccessSuccess = (_clientDetails: ClientDetails) => {
    setIsVillaUnlocked(true);
    setIsVillaAccessModalOpen(false);
    setCurrentPage('mysa-detail');
    scrollTo(0, { immediate: true });
  };

  const handleNavigatePage = (page: AppPage) => {
    if (page === 'mysa-detail' && !isVillaUnlocked) {
      handleOpenVillaShowcase(SIGNATURE_PROJECTS.find(p => p.id === 'mysa-villas'), 'Navbar Menu - The Residences');
      return;
    }
    setCurrentPage(page);
    scrollTo(0, { immediate: true });
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        scrollTo(`#${id}`, { offset: -70, duration: 1.2 });
      }, 120);
    } else {
      scrollTo(`#${id}`, { offset: -70, duration: 1.2 });
    }
  };

  // Unified inquiry form page: every general CTA routes to the Contact page.
  // `contactPresetInterest` preselects the "I'm interested in" field.
  const [contactPresetInterest, setContactPresetInterest] = useState<string | undefined>(undefined);

  const handleOpenConsultation = (project?: ProjectItem) => {
    setContactPresetInterest(
      project && project.name !== 'MYSA Luxe Villas' ? `Project: ${project.name}` : undefined
    );
    setCurrentPage('contact');
    scrollTo(0, { immediate: true });
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-[#1a1918] font-sans antialiased selection:bg-[#c59b67]/25 selection:text-[#1a1918]">
      {/* Precision Luxury Custom Cursor */}
      <CustomCursor accentColor="#c59b67" />

      {/* 1. Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenContact={() => handleOpenConsultation()}
        onOpenVillaAccess={(source) => handleOpenVillaShowcase(null, source || 'Navbar Menu - Mysa Villas')}
        isVillaUnlocked={isVillaUnlocked}
      />

      {/* 2. Main Body Content Based on Active Page */}
      <main className="relative">
        {currentPage === 'home' && (
          <UnifraEditorialTemplate
            onOpenConsultation={() => handleOpenConsultation()}
            onNavigatePage={handleNavigatePage}
            onOpenVillaAccess={(source) => handleOpenVillaShowcase(null, source || 'Editorial Home — Mysa Villas')}
            onWatchFilm={() => setIsVirtualTourOpen(true)}
            onSelectGalleryItem={(item) => setSelectedGalleryItem(item)}
            onSelectProject={(project) => {
              if (project.id === 'mysa' || project.id === 'mysa-villas') {
                handleOpenVillaShowcase(project, 'Editorial Home — Select Card');
              } else {
                handleOpenConsultation(project);
              }
            }}
            isVillaUnlocked={isVillaUnlocked}
          />
        )}

        {currentPage === 'about-story' && (
          <AboutStoryPage
            onOpenContact={() => handleOpenConsultation()}
            onNavigateTeam={() => handleNavigatePage('about-team')}
            onNavigateContact={() => handleNavigatePage('contact')}
            onNavigateProjects={() => handleNavigatePage('projects')}
          />
        )}

        {currentPage === 'about-team' && (
          <OurTeamPage
            onNavigateContact={() => handleNavigatePage('contact')}
            onNavigateStory={() => handleNavigatePage('about-story')}
          />
        )}

        {currentPage === 'projects' && (
          <SignatureProjectsPage
            onSelectProject={(project) => {
              if (project.id === 'mysa' || project.id === 'mysa-villas') {
                handleOpenVillaShowcase(project, 'Projects Page - Select Card');
              } else {
                handleOpenConsultation(project);
              }
            }}
            onExploreShowcase={(project) => {
              if (project.id === 'mysa' || project.id === 'mysa-villas') {
                handleOpenVillaShowcase(project, 'Projects Page - Explore Showcase');
              } else {
                handleOpenConsultation(project);
              }
            }}
            onSelectMysa={() => handleOpenVillaShowcase(null, 'Projects Page - Hero Mysa')}
            onOpenContact={() => handleOpenConsultation()}
            isVillaUnlocked={isVillaUnlocked}
          />
        )}

        {currentPage === 'mysa-detail' && (
          <MysaDetailPage
            onOpenContact={() => handleOpenConsultation()}
            onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
            onOpenBrochure={() => handleOpenConsultation()}
            onNavigateProjects={() => handleNavigatePage('projects')}
            onLockVilla={() => {
              setVillaAccessUnlocked(false);
              setIsVillaUnlocked(false);
              handleNavigatePage('projects');
            }}
            onNavigateAdmin={() => handleNavigatePage('admin')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminLeadsPage
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateVilla={() => handleNavigatePage('mysa-detail')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage presetInterest={contactPresetInterest} />
        )}

        {currentPage === 'blog' && (
          <div className="pt-20">
            <BlogSection onReadArticle={(post) => setSelectedBlogPost(post)} />
          </div>
        )}

        {currentPage === 'ventures' && (
          <VenturesCareersPage
            type="ventures"
            onOpenContact={() => handleOpenConsultation()}
          />
        )}

        {currentPage === 'careers' && (
          <VenturesCareersPage
            type="careers"
            onOpenContact={() => handleOpenConsultation()}
          />
        )}
      </main>

      {/* 3. Global Comprehensive Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onOpenContact={() => handleOpenConsultation()}
      />

      {/* Floating Concierge Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-2.5">
        {showScrollTop && (
          <button
            type="button"
            onClick={() => scrollTo(0, { duration: 1.2 })}
            className="w-10 h-10 rounded-full bg-[#faf7f2]/95 backdrop-blur-md border border-[#d6cbb9] text-[#161513] shadow-lg flex items-center justify-center hover:border-[#b88c52] hover:text-[#b88c52] transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href="https://wa.me/917358222445?text=Hello%20Unifra%2C%20I%20would%20like%20to%20know%20more%20about%20MYSA%20Luxe%20Villas."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#161513] hover:bg-[#2a2723] border border-[#c59b67]/40 text-[#faf7f2] shadow-xl hover:scale-105 transition-all duration-200"
          aria-label="Direct WhatsApp with Unifra Concierge"
        >
          <MessageCircle className="w-5 h-5 text-[#c59b67]" />
        </a>
      </div>

      {/* Global Interactive Modals */}
      <VirtualTourModal
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
      />

      <GalleryLightbox
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />

      <ArticleReaderModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
      />

      {/* Gated Villa Showcase Registration Form Modal */}
      <VillaAccessModal
        isOpen={isVillaAccessModalOpen}
        onClose={() => setIsVillaAccessModalOpen(false)}
        project={pendingVillaProject}
        onSuccess={handleVillaAccessSuccess}
        source={villaAccessSource}
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

