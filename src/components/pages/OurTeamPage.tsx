import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollFx } from '../../hooks/useScrollFx';

interface OurTeamPageProps {
  onNavigateStory: () => void;
}

const TEAM = [
  {
    name: 'Mr. Siddiq Ahmed',
    role: 'Founder',
    initials: 'SA',
    image: '/images/team/siddiq-ahmed.png',
    bio: 'With a vision to redefine coastal living in Chennai, Mr. Siddiq Ahmed founded Unifra to create homes that blend contemporary Scandinavian discipline with timeless warmth.',
    linkedin: 'https://linkedin.com',
    email: 'siddiq@unifra.in'
  },
  {
    name: 'Nikesh Jothi Rajan',
    role: 'Project Manager',
    initials: 'NR',
    image: '/images/team/nikesh-rajan.png',
    bio: 'Nikesh orchestrates every phase of execution with structural precision and foresight, ensuring each residence meets exacting architectural tolerances and schedule discipline.',
    linkedin: 'https://linkedin.com',
    email: 'nikesh@unifra.in'
  },
  {
    name: 'Thunku Abdel Rehman',
    role: 'General Manager',
    initials: 'TR',
    image: null,
    bio: 'Thunku brings operational rigor and a client-first ethos to every Unifra engagement, guiding families seamlessly from initial briefing through final private handover.',
    linkedin: 'https://linkedin.com',
    email: 'info@unifra.in'
  }
];

export const OurTeamPage: React.FC<OurTeamPageProps> = ({ onNavigateStory }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  useScrollFx(pageRef);

  return (
    <div ref={pageRef} className="bg-paper pb-32 pt-36 text-ink sm:pt-44">
      <header className="shell grid items-end gap-10 lg:grid-cols-12">
        <h1 className="font-display text-display lg:col-span-8">
          <span className="block" data-split="load">
            The people
          </span>
          <span className="block" data-split="load" data-delay="0.12">
            behind <span className="serif-italic">Unifra.</span>
          </span>
        </h1>
        <p className="max-w-md text-[17px] leading-relaxed text-graphite lg:col-span-4" data-reveal="load" data-delay="0.3">
          Founded by Mr. Siddiq Ahmed, our studio unites architectural curators, structural engineers and private client advisors dedicated to enduring craft.
        </p>
      </header>

      <div className="shell mt-24 border-t border-ink">
        {TEAM.map((member, i) => (
          <article
            key={member.name}
            className={`group grid items-center gap-10 border-b border-line py-14 sm:py-20 lg:grid-cols-12 ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
          >
            <div className="lg:col-span-4 lg:[direction:ltr]">
              <div className="relative mx-auto aspect-[9/8] w-full max-w-[360px] overflow-hidden bg-stone" data-clip={i % 2 === 1 ? 'right' : 'left'}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="img-cover object-top transition-transform duration-1000 ease-luxe group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <span className="font-display text-8xl italic text-bronze">{member.initials}</span>
                    <img src="/images/unifra-emblem-gold.png" alt="" className="h-8 w-8 object-contain opacity-70" />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 lg:[direction:ltr]">
              <div className="flex items-baseline justify-between gap-6 text-[13px] text-graphite">
                <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="meta">{member.role}</span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em]" data-split>
                {member.name}
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-graphite" data-reveal>
                {member.bio}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px]" data-reveal>
                <a href={`mailto:${member.email}`} className="u-draw">
                  {member.email}
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="u-draw text-graphite hover:text-ink">
                  LinkedIn
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="shell mt-20 flex justify-end">
        <button type="button" onClick={onNavigateStory} className="group flex cursor-pointer items-center gap-3 text-[15px] font-medium" data-reveal>
          <span className="u-draw">Read our story</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
