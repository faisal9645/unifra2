import React from 'react';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';

interface OurTeamPageProps {
  onNavigateContact: () => void;
  onNavigateStory: () => void;
}

export const OurTeamPage: React.FC<OurTeamPageProps> = ({
  onNavigateContact,
  onNavigateStory
}) => {
  const teamMembers = [
    {
      name: 'Mr. Siddiq Ahmed',
      role: 'Founder',
      index: '01',
      initials: 'SA',
      image: '/images/team/siddiq-ahmed.png',
      bio: 'With a vision to redefine coastal living in Chennai, Mr. Siddiq Ahmed founded Unifra to create homes that blend contemporary Scandinavian discipline with timeless warmth.',
      linkedin: 'https://linkedin.com',
      email: 'siddiq@unifra.in'
    },
    {
      name: 'Nikesh Jothi Rajan',
      role: 'Project Manager',
      index: '02',
      initials: 'NR',
      image: '/images/team/nikesh-rajan.png',
      bio: 'Nikesh orchestrates every phase of execution with structural precision and foresight, ensuring each residence meets exacting architectural tolerances and schedule discipline.',
      linkedin: 'https://linkedin.com',
      email: 'nikesh@unifra.in'
    },
    {
      name: 'Thunku Abdel Rehman',
      role: 'General Manager',
      index: '03',
      initials: 'TR',
      image: null,
      bio: 'Thunku brings operational rigor and a client-first ethos to every Unifra engagement, guiding families seamlessly from initial briefing through final private handover.',
      linkedin: 'https://linkedin.com',
      email: 'info@unifra.in'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-[#faf7f2] text-[#161513]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] mb-3 block">
            Leadership &amp; Master Builders
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-[#161513] tracking-tight mb-5">
            Our <span className="italic text-[#b88c52]">Team</span>
          </h1>
          <p className="text-sm text-[#5a544e] font-light leading-relaxed">
            Founded by Mr. Siddiq Ahmed, our studio unites architectural curators, structural engineers, and private client advisors dedicated to enduring craft.
          </p>
        </div>

        {/* 3-Column Editorial Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {teamMembers.map((member) => (
            <article key={member.name} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-t-[200px] rounded-b-[16px] border border-[#e5ddd0] bg-[#e6dfd3] shadow-[0_18px_46px_rgba(22,21,19,0.06)]">
                <div className="aspect-[4/5]">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#efe8dc] flex flex-col items-center justify-center p-8">
                      <div className="w-28 h-28 rounded-full border border-[#cbbda8] flex items-center justify-center mb-4 bg-[#faf7f2]">
                        <span className="font-serif-luxury italic text-4xl text-[#9a6f36]">
                          {member.initials}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#7c746b]">
                        Unifra Leadership
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#9a6f36] mb-1 tabular-nums">
                    {member.index} · {member.role} · Unifra
                  </div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#161513] tracking-tight">
                    {member.name}
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-[#5a544e] leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5ddd0] flex items-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-sm border border-[#d6cbb9] text-[#5a544e] hover:border-[#161513] hover:text-[#161513] transition-colors"
                    aria-label={`Connect with ${member.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2.5 rounded-sm border border-[#d6cbb9] text-[#5a544e] hover:border-[#161513] hover:text-[#161513] transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <span className="text-[11px] font-mono text-[#7c746b] truncate">
                    {member.email}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#f2ece2] rounded-[24px] p-10 sm:p-14 border border-[#e5ddd0] text-center max-w-4xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36]">
            Collaborate
          </span>
          <h3 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-normal text-[#161513] tracking-tight mb-4">
            Speak directly with <span className="italic text-[#b88c52]">our leadership.</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#5a544e] max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Whether exploring a MYSA residence or architectural consultancy for your coastal land parcel in Chennai, our studio is at your service.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#161513] hover:bg-[#2a2723] text-[#faf7f2] text-xs font-mono uppercase tracking-[0.18em] transition-colors cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b67]" />
            </button>
            <button
              type="button"
              onClick={onNavigateStory}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-[#cbbda8] text-[#161513] text-xs font-mono uppercase tracking-[0.18em] hover:border-[#161513] transition-colors cursor-pointer"
            >
              <span>Read Our Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
