'use client';
import { useState } from 'react';
import Image from 'next/image';

interface PortfolioItem {
  id: string; category: string; title: string;
  image: string; href?: string; timeSpent: string; description: string;
}
const CATEGORIES = ['All', '3D Art', 'Animations', 'Videos'];

function Modal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const isVideo = item.href && (item.href.endsWith('.mp4') || item.href.includes('drive.google'));
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      {/* Sheet on mobile, centred card on sm+ */}
      <div className="relative glass-dark w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl overflow-hidden orange-border shadow-2xl z-10 max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 glass-orange rounded-full flex items-center justify-center text-orange-400 hover:text-white text-lg font-bold">
          &times;
        </button>
        <div className="relative w-full bg-black flex-shrink-0" style={{ aspectRatio:'16/9' }}>
          <Image src={item.image} alt={item.title} fill className="object-cover opacity-90" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto">
          <span className="badge-orange text-xs">{item.category}</span>
          <h3 className="text-base sm:text-xl font-bold text-white mt-2 mb-1.5">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <i className="fas fa-clock text-orange-400 text-xs" />
            <span className="text-gray-500 text-xs">Time: <span className="text-gray-300">{item.timeSpent}</span></span>
          </div>
          {item.href && (
            <a href={item.href} target="_blank" rel="noreferrer" className="btn-primary mt-4 text-sm px-5 py-2.5 w-full justify-center sm:w-auto">
              {isVideo ? <><i className="fas fa-play" /> Watch Video</> : <><i className="fas fa-expand" /> View Full</>}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ items }: { items: PortfolioItem[] }) {
  const [active,   setActive]   = useState('All');
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const filtered = active === 'All' ? items : items.filter(i => i.category === active);

  return (
    <>
      <section id="portfolio" className="section-pad section-bg-alt">
        <div className="container-max mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-label">My Creative Work</div>
            <h2 className="section-title">All of My Works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">3D Works, Video Editing, Animations and more.</p>
          </div>
          {/* Filter buttons — scroll horizontally on tiny screens */}
          <div className="flex gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 sm:justify-center scrollbar-none">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`filter-btn flex-shrink-0 text-xs sm:text-sm ${active === cat ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
                {cat}
              </button>
            ))}
          </div>
          {/* 1 col → 2 col → 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map(item => (
              <div key={item.id} className="portfolio-card group" onClick={() => setSelected(item)}>
                <div className="relative w-full bg-black/50" style={{ aspectRatio:'4/3' }}>
                  <Image src={item.image} alt={item.title} fill
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="badge-orange text-xs mb-1 block w-fit">{item.category}</span>
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-tight line-clamp-1">{item.title}</h4>
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 glass-orange rounded-full flex items-center justify-center">
                    <i className="fas fa-expand text-orange-400 text-base sm:text-lg" />
                  </div>
                  <span className="text-white text-xs font-semibold">View Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
