import React from 'react';
import { ArrowRight, Compass, Award, Hammer, CheckCircle2, Home } from 'lucide-react';
import { CoreValues } from '../CoreValues';

interface AboutStoryPageProps {
  onNavigateTeam: () => void;
  onNavigateContact?: () => void;
  onNavigateProjects?: () => void;
  onOpenContact?: () => void;
}

export const AboutStoryPage: React.FC<AboutStoryPageProps> = ({
  onNavigateTeam,
  onNavigateContact,
  onOpenContact
}) => {
  const milestones = [
    {
      year: '2022',
      title: 'A Vision for Chennai',
      desc: 'Unifra was founded with a clear mission: to craft coastal residences in Chennai uniting Scandinavian architectural calm, natural materials, and enduring build quality.'
    },
    {
      year: '2023',
      title: 'Bringing MYSA to Life',
      desc: 'Construction began on MYSA Luxe Villas in Vettuvankeni, ECR — defined by asymmetrical butterfly roofs, deep stone cantilevers, and rigorous structural tolerances.'
    },
    {
      year: '2024–2026',
      title: 'A Legacy of Trust',
      desc: 'Following landmark structural milestones and private family reservations at MYSA, Unifra expanded its architectural pipeline across Chennai’s premier coastal enclaves.'
    }
  ];

  const capabilities = [
    {
      icon: Compass,
      title: 'Bespoke Architecture',
      tag: 'Personalized · Contextual',
      desc: 'Site-specific architectural solutions calibrated for coastal light, sea breezes, and private family living.'
    },
    {
      icon: Home,
      title: 'Innovative Engineering',
      tag: 'Biophilic · Smart-Ready',
      desc: 'Passive thermal comfort, acoustic glazing, and discreet smart-home orchestration woven seamlessly into each home.'
    },
    {
      icon: Hammer,
      title: 'Timeless Materiality',
      tag: 'Stone · Timber · Brass',
      desc: 'Honed natural stone, seasoned Burmese teak, and weathered brass details chosen to age gracefully over decades.'
    },
    {
      icon: Award,
      title: 'Turnkey Delivery',
      tag: 'Concept to Handover',
      desc: 'Single-point accountability from architectural conception and structural execution to bespoke interior completion.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-[#faf7f2] text-[#161513]">
      {/* Hero Banner */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-16">
        <div className="bg-[#f2ece2] rounded-[24px] p-8 sm:p-14 lg:p-16 border border-[#e5ddd0] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36]">
              <span>The Unifra Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Creating Desires</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#161513] leading-[1.06]">
              About <span className="italic text-[#b88c52]">Unifra.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#5a544e] font-light leading-relaxed max-w-xl">
              Dreams are meant to come true. At Unifra Properties, considered craftsmanship, architectural restraint, and transparent stewardship converge to create remarkable residences that endure.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[#7c746b] tabular-nums">
              <div><strong className="text-[#161513] text-base font-serif-luxury font-normal block">2022</strong> Founded in Chennai</div>
              <div className="w-px h-7 bg-[#dfd5c5]" />
              <div><strong className="text-[#161513] text-base font-serif-luxury font-normal block">06 Villas</strong> MYSA Enclave</div>
              <div className="w-px h-7 bg-[#dfd5c5]" />
              <div><strong className="text-[#161513] text-base font-serif-luxury font-normal block">100%</strong> Independent Titles</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-t-[160px] rounded-b-[16px] overflow-hidden border border-[#dfd5c5] shadow-md h-[340px] sm:h-[420px] bg-[#e6dfd3]">
              <img
                src="/images/mysa3d/mysa.jpg"
                alt="MYSA Luxe Villas Twilight Elevation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 p-3.5 bg-[#faf7f2]/95 backdrop-blur-md rounded-sm border border-[#e5ddd0] text-center">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#161513] uppercase block font-medium">
                  Flagship Enclave · Vettuvankeni ECR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronicle Milestones */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] mb-2 block">
            Chronicle
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#161513] tracking-tight mb-3">
            Our <span className="italic text-[#b88c52]">Journey</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5a544e] font-light">
            Building enduring sanctuaries along Chennai’s East Coast Road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="bg-white rounded-[16px] p-8 border border-[#e5ddd0] hover:border-[#b88c52] transition-colors shadow-sm"
            >
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#9a6f36] mb-3 tabular-nums">
                {m.year} · {m.title}
              </div>
              <p className="text-xs sm:text-sm text-[#5a544e] leading-relaxed font-light">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <CoreValues />

      {/* Mission & Vision */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 my-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#f2ece2] rounded-[24px] p-8 sm:p-12 border border-[#e5ddd0]">
          <div className="space-y-4 text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#9a6f36] font-semibold">
              Core Purpose
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#161513]">
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-[#5a544e] leading-relaxed font-light">
              We craft extraordinary homes that surpass expectations through thoughtful architecture, natural materials, and transparent execution.
            </p>
            <div className="pt-2 space-y-2.5">
              {[
                'Bespoke architectural customization tailored to your family',
                'Spaces calibrated for daylight, airflow, and acoustic calm',
                'Clear independent land titles and milestone transparency'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-xs sm:text-sm text-[#161513]">
                  <CheckCircle2 className="w-4 h-4 text-[#b88c52] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#9a6f36] font-semibold">
              Our Vision
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#161513]">
              Where We’re Headed
            </h2>
            <p className="text-xs sm:text-sm text-[#5a544e] leading-relaxed font-light">
              To stand as South India’s benchmark for quiet coastal luxury — uniting Scandinavian spatial clarity with warm local craft.
            </p>
            <div className="rounded-[12px] overflow-hidden border border-[#dfd5c5] h-56 sm:h-64 bg-[#e6dfd3]">
              <img
                src="/images/mysa3d/KITCHEN.jpg"
                alt="MYSA Minimalist Culinary Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] mb-2 block">
            Capabilities
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#161513] tracking-tight mb-3">
            Array of <span className="italic text-[#b88c52]">Disciplines</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="bg-white rounded-[16px] p-6 border border-[#e5ddd0] hover:border-[#b88c52] transition-colors flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#f2ece2] border border-[#dfd5c5] flex items-center justify-center text-[#b88c52] mb-4">
                  <cap.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-xl font-normal text-[#161513] mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs text-[#5a544e] leading-relaxed font-light">
                  {cap.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#9a6f36] uppercase tracking-wider mt-4 pt-3 border-t border-[#f2ece2]">
                {cap.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team CTA */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="rounded-[24px] p-8 sm:p-14 bg-[#161513] text-[#faf7f2] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#c59b67] mb-2 block">
              The People Behind Unifra
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl font-normal mb-2">
              Meet Our Leadership Team
            </h3>
            <p className="text-xs sm:text-sm text-[#cfc7bc] font-light leading-relaxed">
              Discover the founders and master builders guiding every architectural milestone.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateTeam}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#faf7f2] hover:bg-[#e8e0d4] text-[#161513] font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View Our Team</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9a6f36]" />
            </button>
            {(onNavigateContact || onOpenContact) && (
              <button
                type="button"
                onClick={onNavigateContact || onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-white/25 hover:border-[#c59b67] text-[#faf7f2] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Inquire</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
