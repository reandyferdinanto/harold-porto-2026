'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const AboutScene = dynamic(() => import('./AboutScene'), { ssr: false });

interface AboutData { portrait: string; bio: string[]; birthdate: string; highlights: string[] }

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="about-section">
      {/* 3D Background — full size, clearly visible */}
      <AboutScene />

      {/* Gradient overlays to ensure text readability */}
      <div className="about-gradient-overlay" />

      {/* Content */}
      <div className="about-content container-max mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Portrait with 3D tilt */}
          <ScrollReveal direction="left" delay={100}>
            <TiltCard className="portrait-tilt-card" maxTilt={15}>
              <div className="portrait-container">
                {/* Corner accents */}
                <div className="portrait-corner portrait-corner-tl" />
                <div className="portrait-corner portrait-corner-br" />

                <div className="portrait-frame">
                  <Image src={data.portrait} alt="Portrait" fill className="object-cover" unoptimized />
                  <div className="portrait-overlay" />
                  {/* Scan line effect */}
                  <div className="portrait-scanline" />
                </div>

                {/* Status badge */}
                <div className="portrait-status">
                  <span className="portrait-status-dot" />
                  <span>Creative Mind</span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <ScrollReveal direction="right" delay={200}>
              <div className="section-label-3d">
                <span className="section-label-line" />
                <span>Get to know me</span>
              </div>
              <h2 className="section-title-3d mb-5">
                About <span className="gradient-text-gold">Me</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <div className="flex flex-wrap gap-2 mb-5 justify-center lg:justify-start">
                {data.highlights.map((h, i) => (
                  <span key={h} className="highlight-badge-3d" style={{ animationDelay: `${i * 0.2}s` }}>
                    <i className="fas fa-star text-[8px]" />
                    {h}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              {data.bio.map((para, i) => (
                <p key={i} className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3">{para}</p>
              ))}
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <div className="info-card-3d mt-5">
                <div className="info-card-icon">
                  <i className="fas fa-birthday-cake text-orange-400 text-sm" />
                </div>
                <span className="text-gray-300 text-sm">
                  Born <span className="text-white font-semibold">{data.birthdate}</span>
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={600}>
              <div className="mt-6 flex justify-center lg:justify-start">
                <a href="#portfolio" className="hero-btn-primary">
                  <i className="fas fa-images text-xs" />
                  <span>See My Work</span>
                  <span className="hero-btn-glow" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
