import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../../data/mockData';
import { BlogPost } from '../../types';
import { useScrollFx } from '../../hooks/useScrollFx';

interface JournalPageProps {
  onReadArticle: (post: BlogPost) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onReadArticle }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [featured, ...rest] = BLOG_POSTS;
  useScrollFx(pageRef);

  return (
    <div ref={pageRef} className="bg-paper pb-32 pt-36 text-ink sm:pt-44">
      <header className="shell flex flex-wrap items-end justify-between gap-10 border-b border-ink pb-10">
        <h1 className="font-display text-mega">
          <span data-split="load" data-split-by="chars">
            Journal
          </span>
        </h1>
        <p className="max-w-sm pb-4 text-[17px] leading-relaxed text-graphite" data-reveal="load" data-delay="0.3">
          Architectural perspectives, Scandinavian craftsmanship and the evolution of coastal living in Chennai.
        </p>
      </header>

      {/* Featured essay */}
      <article className="shell mt-16">
        <button
          type="button"
          onClick={() => onReadArticle(featured)}
          data-cursor="Read"
          className="group grid w-full cursor-pointer gap-10 text-left lg:grid-cols-12 lg:items-end"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-stone lg:col-span-8" data-clip="up" data-clip-mode="load">
            <img src={featured.imageUrl} alt={featured.title} className="img-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.04]" />
          </div>
          <div className="lg:col-span-4">
            <p className="text-[13px] text-graphite" data-reveal="load" data-delay="0.4">
              Featured · {featured.tag} · {featured.date}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,3.6vw,3.8rem)] leading-[0.98]" data-reveal="load" data-delay="0.5">
              {featured.title}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-graphite" data-reveal="load" data-delay="0.6">
              {featured.summary}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium" data-reveal="load" data-delay="0.7">
              <span className="u-draw">Read the essay — {featured.readTime}</span>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </button>
      </article>

      {/* Index */}
      <section className="shell mt-28">
        <p className="meta mb-8 text-graphite" data-reveal>
          More essays
        </p>
        <div className="border-t border-line">
          {rest.map((post, i) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onReadArticle(post)}
              className="group grid w-full cursor-pointer items-center gap-6 border-b border-line py-8 text-left sm:grid-cols-12 sm:gap-8"
              data-reveal
              data-delay={String(i * 0.08)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone sm:col-span-3 lg:col-span-2">
                <img src={post.imageUrl} alt="" loading="lazy" className="img-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.08]" />
              </div>
              <div className="sm:col-span-9 lg:col-span-7">
                <p className="text-[13px] text-graphite">
                  {post.tag} · {post.date}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.02] transition-colors duration-500 group-hover:text-bronze">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-graphite">{post.summary}</p>
              </div>
              <div className="hidden items-center justify-end gap-4 text-[13px] text-graphite lg:col-span-3 lg:flex">
                {post.readTime}
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
