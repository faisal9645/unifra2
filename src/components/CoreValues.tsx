import React from 'react';
import { Compass, Zap, Shield } from 'lucide-react';
import { CORE_VALUES } from '../data/mockData';

export const CoreValues: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#b88c52]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#b88c52]" />;
      case 'Shield':
      default:
        return <Shield className="w-5 h-5 text-[#b88c52]" />;
    }
  };

  return (
    <section id="values" className="py-16 bg-[#f2ece2] text-[#161513] border-y border-[#e5ddd0]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] mb-2 block">
            Foundational Pillars
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#161513] tracking-tight mb-3">
            Our Core <span className="italic text-[#b88c52]">Values</span>
          </h2>
          <p className="text-[#5a544e] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            The principles that define our architecture and our commitment to every family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((val, idx) => (
            <div
              key={val.id}
              className="bg-white rounded-[16px] p-8 border border-[#e5ddd0] hover:border-[#b88c52] transition-colors flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-[#b88c52] tabular-nums">
                    0{idx + 1}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#faf7f2] border border-[#e5ddd0] flex items-center justify-center">
                    {getIcon(val.iconName)}
                  </div>
                </div>
                <h3 className="font-serif-luxury text-2xl font-normal text-[#161513] mb-3">
                  {val.title}
                </h3>
                <p className="text-[#5a544e] text-xs sm:text-sm leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
