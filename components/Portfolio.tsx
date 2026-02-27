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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <div className="relative glass-dark rounded-2xl max-w-2xl w-full overflow-hidden orange-border shadow-2xl z-10"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-9 h-9 glass-orange rounded-full flex items-center justify-center text-orange-400 hover:text-white transition-colors text-lg font-bold">
          &times;
        </button>
        <div className="relative w-full bg-black" style={{ aspectRatio: '16/10' }}>
          <Image src={item.image} alt={item.title} fill className="object-cover opacity-90" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-6">
          <span className="badge-orange">{item.category}</span>
          <h3 className="text-xl font-bold text-white mt-3 mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <i className="fas fa-clock text-orange-400 text-xs" />
            <span className="text-gray-500 text-xs">Time spent: <span className="text-gray-300">{item.timeSpent}</span></span>
          </div>
          {item.href && (
            <a href={item.href} target="_blank" rel="noreferrer" className="btn-primary mt-5 text-sm">
              {isVideo ? <><i className="fas fa-play" /> Watch Video</> : <><i className="fas fa-expand" /> View Full</>}
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
      <section id="portfolio" className="section-pad section-bg-alt">
        <div className="container-max mx-auto">
          <div className="text-center mb-12">
            <div className="section-label">My Creative Work</div>
            <h2 className="section-title">All of My Works</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">3D Works, Video Editing, Animations and more.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`filter-btn ${active === cat ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="portfolio-card group" onClick={() => setSelected(item)}>
                <div className="relative w-full bg-black/50" style={{ aspectRatio: '4/3' }}>
                  <Image src={item.image} alt={item.title} fill
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="badge-orange text-xs mb-1 block w-fit">{item.category}</span>
                  <h4 className="text-white font-bold text-sm leading-tight line-clamp-1">{item.title}</h4>
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 glass-orange rounded-full flex items-center justify-center">
                    <i className="fas fa-expand text-orange-400 text-lg" />
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
