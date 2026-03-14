'use client';

import dynamic from 'next/dynamic';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const SectionParticles = dynamic(() => import('./SectionParticles'), { ssr: false });

interface TimelineEntry { year: string; items: string[] }

function Timeline({ title, icon, data, delay }: { title: string; icon: string; data: TimelineEntry[]; delay: number }) {
  // Sort data descending by extracted year (newest first)
  const sortedData = [...data].sort((a, b) => {
    const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || '0', 10);
    const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || '0', 10);
    return yearB - yearA;
  });

  return (
    <ScrollReveal direction="up" delay={delay}>
      <TiltCard className="timeline-card-3d" maxTilt={6} glareOpacity={0.08}>
        <div className="timeline-card-inner">
          <div className="flex items-center gap-3 mb-6">
            <div className="timeline-icon-3d">
              <i className={`${icon} text-orange-400 text-sm`} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
          </div>
          <div className="relative pl-6">
            {/* Animated timeline line */}
            <div className="timeline-line-3d" />
            {sortedData.map((entry, i) => (
              <ScrollReveal key={i} direction="left" delay={delay + i * 150} className="mb-5 last:mb-0">
                <div className="relative">
                  <div className="timeline-dot-3d" />
                  <span className="timeline-year-badge">{entry.year}</span>
                  <ul className="space-y-1 mt-1.5">
                    {entry.items.map((item, j) => (
                      <li key={j} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-orange-500/40 mt-1.5 text-[6px]">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

export default function Experience({
  experienceData,
  educationData,
}: {
  experienceData: TimelineEntry[];
  educationData: TimelineEntry[];
  skillsData: unknown[];
}) {
  return (
    <section id="experience" className="section-3d section-pad">
      <SectionParticles variant="cool" />
      <div className="section-3d-content container-max mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <div className="section-label-3d justify-center">
              <span className="section-label-line" />
              <span>My Journey</span>
              <span className="section-label-line" />
            </div>
            <h2 className="section-title-3d">
              Experience & <span className="gradient-text-gold">Education</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <Timeline title="Experience" icon="fas fa-briefcase" data={experienceData} delay={200} />
          <Timeline title="Education" icon="fas fa-graduation-cap" data={educationData} delay={400} />
        </div>
      </div>
    </section>
  );
}
