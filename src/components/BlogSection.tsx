import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onReadArticle: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadArticle }) => {
  return (
    <section id="blog" className="py-12 sm:py-16 bg-[#faf7f2] text-[#161513]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#9a6f36] mb-3 block">
            Editorial Journal
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#161513] tracking-tight mb-4">
            From Our <span className="italic text-[#b88c52]">Journal</span>
          </h1>
          <p className="text-[#5a544e] text-sm leading-relaxed max-w-xl mx-auto font-light">
            Architectural perspectives, Scandinavian craftsmanship, and the evolution of coastal living in Chennai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadArticle(post)}
              className="group bg-white rounded-[16px] overflow-hidden border border-[#e5ddd0] hover:border-[#b88c52] transition-all duration-300 flex flex-col cursor-pointer shadow-sm hover:shadow-[0_20px_44px_rgba(22,21,19,0.08)]"
            >
              <div className="relative h-56 overflow-hidden bg-[#e6dfd3]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Zero-pill unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[#7c746b] mb-3 uppercase tracking-[0.14em]">
                    <span className="text-[#9a6f36] font-semibold">{post.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-serif-luxury text-xl font-normal text-[#161513] leading-snug group-hover:text-[#9a6f36] transition-colors mb-2.5">
                    {post.title}
                  </h2>

                  <p className="text-[#5a544e] text-xs line-clamp-3 leading-relaxed font-light">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#efe8dc] flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#161513] group-hover:text-[#9a6f36] transition-colors">
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#b88c52] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
