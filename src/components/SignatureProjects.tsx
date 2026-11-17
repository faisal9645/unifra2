import React, { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Maximize,
  FileText,
  Calendar,
  KeyRound,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../data/mockData';
import { ProjectItem } from '../types';
import { filterProjectsByStatus, isFlagshipMysaProject } from '../utils/portfolioUtils';

interface SignatureProjectsProps {
  onScheduleVisit: (project?: ProjectItem) => void;
  onDownloadBrochure: (project: ProjectItem) => void;
  onViewAllProjects?: () => void;
  onSelectProject?: (project: ProjectItem) => void;
  onExploreShowcase?: (project: ProjectItem) => void;
  isVillaUnlocked?: boolean;
}

export const SignatureProjects: React.FC<SignatureProjectsProps> = ({
  onScheduleVisit,
  onDownloadBrochure,
  onViewAllProjects,
  onSelectProject,
  onExploreShowcase,
  isVillaUnlocked = false
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filters = ['All', 'Under Construction', 'Ready to Move', 'Upcoming'];
  const filteredProjects = filterProjectsByStatus(SIGNATURE_PROJECTS, activeFilter);

  const handleCardClick = (project: ProjectItem) => {
    if (onExploreShowcase) {
      onExploreShowcase(project);
    } else if (onSelectProject) {
      onSelectProject(project);
    } else {
      onScheduleVisit(project);
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 bg-[#faf7f2] text-[#161513]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Editorial Title Row + Filter Tabs */}
        <div className="mb-10 pb-6 border-b border-[#e5ddd0]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] mb-2.5 block">
                Exclusive Villa Communities
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#161513] tracking-tight">
                Signature <span className="italic text-[#b88c52]">Enclaves</span>
              </h1>
            </div>

            {onViewAllProjects && (
              <button
                type="button"
                onClick={onViewAllProjects}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#9a6f36] hover:text-[#161513] uppercase transition-colors cursor-pointer group shrink-0"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-[11px] font-mono uppercase tracking-[0.16em] rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === f
                    ? 'bg-[#161513] text-[#faf7f2]'
                    : 'bg-[#f2ece2] text-[#5a544e] hover:text-[#161513]'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto hidden sm:inline text-[11px] font-mono tracking-[0.18em] text-[#7c746b] uppercase tabular-nums">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Residence' : 'Residences'}
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isMysa = isFlagshipMysaProject(project);
            return (
              <article
                key={project.id}
                data-cursor={isMysa ? 'EXPLORE' : 'INQUIRE'}
                onClick={() => handleCardClick(project)}
                className="group bg-white rounded-t-[60px] rounded-b-[16px] overflow-hidden border border-[#e5ddd0] hover:border-[#b88c52] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_24px_50px_rgba(22,21,19,0.08)] cursor-pointer"
              >
                <div className="relative h-72 sm:h-80 overflow-hidden bg-[#e6dfd3]">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isMysa ? '' : 'brightness-90'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf7f2]">
                    <span>{project.status}</span>
                    {isMysa ? (
                      <span className="text-[#dfc08f] flex items-center gap-1">
                        {isVillaUnlocked ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Unlocked</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Flagship Showcase</span>
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="text-[#e6dfd3]">Private Release</span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#9a6f36] mb-1.5">
                      <span>{project.badgeDays || project.status}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.units}</span>
                    </div>

                    <h2 className="font-serif-luxury text-2xl font-normal text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                      {project.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-[#7c746b] font-mono uppercase tracking-wider mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#b88c52] shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    <p className="text-xs text-[#5a544e] font-light leading-relaxed my-3.5 line-clamp-2">
                      {project.tagline}
                    </p>

                    <div className="grid grid-cols-4 gap-2 py-3.5 border-y border-[#efe8dc] text-center mb-4 text-[#5a544e] tabular-nums">
                      <div>
                        <BedDouble className="w-3.5 h-3.5 mx-auto text-[#b88c52] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.bedrooms}</div>
                      </div>
                      <div>
                        <Bath className="w-3.5 h-3.5 mx-auto text-[#b88c52] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.bathrooms}</div>
                      </div>
                      <div>
                        <Maximize className="w-3.5 h-3.5 mx-auto text-[#b88c52] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.levels}</div>
                      </div>
                      <div>
                        <Car className="w-3.5 h-3.5 mx-auto text-[#b88c52] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.parking}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(project);
                      }}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-sm text-xs font-mono uppercase tracking-wider text-[#161513] hover:bg-[#f2ece2] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        {isMysa ? (
                          isVillaUnlocked ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>View Villa Showcase</span>
                            </>
                          ) : (
                            <>
                              <KeyRound className="w-3.5 h-3.5 text-[#b88c52]" />
                              <span>Unlock Villa Showcase</span>
                            </>
                          )
                        ) : (
                          <span>Request Private Brief</span>
                        )}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#b88c52] group-hover:translate-x-1 transition-transform" />
                    </button>

                    {isMysa && (
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDownloadBrochure(project);
                          }}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm border border-[#d6cbb9] hover:border-[#161513] text-xs font-mono uppercase tracking-wider text-[#161513] transition-colors cursor-pointer"
                        >
                          <FileText className="w-3 h-3 text-[#b88c52]" />
                          <span>Brochure</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onScheduleVisit(project);
                          }}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-[#161513] hover:bg-[#2a2723] text-xs font-mono uppercase tracking-wider text-[#faf7f2] transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3 h-3 text-[#c59b67]" />
                          <span>Site Visit</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
