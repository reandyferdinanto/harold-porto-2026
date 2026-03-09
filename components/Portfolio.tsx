'use client';
import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const SectionParticles = dynamic(() => import('./SectionParticles'), { ssr: false });

interface PortfolioItem {
  id: string; category: string; title: string;
  image: string; href?: string; timeSpent: string; description: string;
}
const CATEGORIES = ['All', '3D Art', 'Animations', 'Videos'];

function Modal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const isVideo = item.href && (item.href.endsWith('.mp4') || item.href.includes('drive.google'));
  return (
    <div className="modal-3d-overlay" onClick={onClose}>
      <div className="modal-3d-backdrop" />
      <div className="modal-3d-container" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="modal-3d-close">&times;</button>
        <div className="relative w-full bg-black/50 flex-shrink-0" style={{ aspectRatio: '16/9' }}>
          <Image src={item.image} alt={item.title} fill className="object-cover opacity-90" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto">
          <span className="highlight-badge-3d">{item.category}</span>
          <h3 className="text-base sm:text-xl font-bold text-white mt-2 mb-1.5">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <i className="fas fa-clock text-orange-400 text-xs" />
            <span className="text-gray-500 text-xs">Time: <span className="text-gray-300">{item.timeSpent}</span></span>
          </div>
          {item.href && (
            <a href={item.href} target="_blank" rel="noreferrer" className="hero-btn-primary mt-4 text-sm w-full justify-center sm:w-auto">
              {isVideo ? <><i className="fas fa-play" /> Watch Video</> : <><i className="fas fa-expand" /> View Full</>}
              <span className="hero-btn-glow" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const filtered = active === 'All' ? items : items.filter(i => i.category === active);

  return (
    <>
      <section id="portfolio" className="section-3d section-pad">
        <SectionParticles variant="cool" />
        <div className="section-3d-content container-max mx-auto px-4 sm:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-8 sm:mb-12">
              <div className="section-label-3d justify-center">
                <span className="section-label-line" />
                <span>My Creative Work</span>
                <span className="section-label-line" />
              </div>
              <h2 className="section-title-3d">
                All of My <span className="gradient-text-gold">Works</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">3D Works, Video Editing, Animations and more.</p>
            </div>
          </ScrollReveal>

          {/* Filter buttons */}
          <ScrollReveal direction="up" delay={200}>
            <div className="flex gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 sm:justify-center scrollbar-none">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  className={`filter-btn-3d flex-shrink-0 ${active === cat ? 'filter-btn-3d-active' : ''}`}>
                  {cat === '3D Art' && <i className="fas fa-cube text-xs" />}
                  {cat === 'Animations' && <i className="fas fa-film text-xs" />}
                  {cat === 'Videos' && <i className="fas fa-video text-xs" />}
                  {cat === 'All' && <i className="fas fa-th text-xs" />}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} direction="up" delay={i * 100}>
                <TiltCard className="portfolio-card-3d" maxTilt={8} glareOpacity={0.1}>
                  <div className="portfolio-card-inner group" onClick={() => setSelected(item)}>
                    <div className="relative w-full bg-black/50 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <Image src={item.image} alt={item.title} fill
                        sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                      {/* Hover overlay */}
                      <div className="portfolio-hover-overlay">
                        <div className="portfolio-hover-icon">
                          <i className="fas fa-expand text-orange-400 text-lg" />
                        </div>
                        <span className="text-white text-xs font-semibold mt-2">View Details</span>
                      </div>
                    </div>
                    <div className="portfolio-card-info">
                      <div className="flex items-center justify-between gap-2">
                        <span className="highlight-badge-3d text-[10px]">{item.category}</span>
                        <span className="text-gray-600 text-[10px] flex items-center gap-1">
                          <i className="fas fa-clock" /> {item.timeSpent}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm leading-tight mt-2 line-clamp-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
