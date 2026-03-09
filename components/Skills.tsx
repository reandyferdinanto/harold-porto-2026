'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const SectionParticles = dynamic(() => import('./SectionParticles'), { ssr: false });

interface Skill { name: string; percentage: number }

// ── Real SVG logos ──
const SKILL_ICONS: Record<string, React.ReactElement> = {
  'Blender': (
    <svg viewBox="0 0 128 128" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M52.1 32.2H24.4c-.9 0-1.4 1-.8 1.7L36.2 49c.3.4.9.5 1.3.2l18-12.8c.8-.6.4-1.8-.6-1.8l-2.8-.4z" fill="#265787"/>
      <path d="M64 48.5c-8.6 0-15.5 6.9-15.5 15.5S55.4 79.5 64 79.5 79.5 72.6 79.5 64 72.6 48.5 64 48.5z" fill="#EA7600"/>
      <path d="M64 18C39.1 18 19 38.1 19 63s20.1 45 45 45 45-20.1 45-45S88.9 18 64 18zm0 77c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z" fill="#265787"/>
      <path d="M64 53c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11z" fill="#EA7600"/>
      <path d="M37.2 46.5L19.8 59.8c-.5.4-.5 1.1 0 1.4l6.1 4.3c.4.3 1 .2 1.3-.2l14.4-18.8z" fill="#265787"/>
    </svg>
  ),
  'Adobe Photoshop': (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2h15A2.5 2.5 0 0122 4.5v15a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 19.5v-15A2.5 2.5 0 014.5 2z" fill="#001E36"/>
      <path d="M7.5 7.2h3.1c1.8 0 3 .4 3.8 1.2.6.6 1 1.5 1 2.6 0 1.1-.4 2-1.1 2.7-.8.7-2 1.1-3.7 1.1H9.2v3.7H7.5V7.2zm1.7 6.2h1.3c1 0 1.7-.2 2.1-.6.4-.4.6-1 .6-1.7 0-.7-.2-1.2-.6-1.6-.4-.3-1.1-.5-2.1-.5H9.2v4.4z" fill="#31A8FF"/>
    </svg>
  ),
  'Adobe Illustrator': (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2h15A2.5 2.5 0 0122 4.5v15a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 19.5v-15A2.5 2.5 0 014.5 2z" fill="#310000"/>
      <path d="M14 15.7l-.8-2.5H9.8l-.8 2.5H7.2L10.6 6h2.7l3.5 9.7H14zm-2.4-7.5L10.2 12h2.7l-1.3-3.8zM17.5 7.7c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1zm.2 2h1.8v6.1h-1.8V9.7z" fill="#FF9A00"/>
    </svg>
  ),
  'Adobe Premiere Pro': (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2h15A2.5 2.5 0 0122 4.5v15a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 19.5v-15A2.5 2.5 0 014.5 2z" fill="#00005B"/>
      <path d="M4.8 7.2h3c1.8 0 3 .4 3.7 1.2.6.6.9 1.5.9 2.5 0 1-.3 1.9-1 2.6-.8.7-2 1.1-3.7 1.1H6.5v3.9H4.8V7.2zm1.7 6h1.3c1 0 1.6-.2 2-.6.4-.4.6-1 .6-1.6 0-.7-.2-1.2-.6-1.5-.4-.3-1-.5-2-.5H6.5v4.2zm7.4-6h3c1.4 0 2.4.3 3 1 .5.5.8 1.3.8 2.2 0 .9-.3 1.7-.8 2.2-.5.5-1.1.8-2 1l3 4H19l-2.7-3.8h-.6v3.8h-1.8V7.2zm1.8 5.3h1.2c.7 0 1.2-.1 1.5-.4.3-.3.5-.7.5-1.1 0-.5-.1-.9-.4-1.2-.3-.3-.8-.4-1.6-.4h-1.2v3.1z" fill="#9999FF"/>
    </svg>
  ),
  'Adobe After Effects': (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2h15A2.5 2.5 0 0122 4.5v15a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 19.5v-15A2.5 2.5 0 014.5 2z" fill="#00005B"/>
      <path d="M11.2 15.7l-.8-2.5H6.8l-.8 2.5H4.2L7.6 6h2.7l3.5 9.7h-2.6zm-2.4-7.5L7.4 12h2.7L8.8 8.2zM13.5 7h4.7v1.6H15.3v2.2h2.7v1.6h-2.7v2.5h2.9v1.6h-4.7V7z" fill="#9999FF"/>
    </svg>
  ),
};

const SKILL_COLORS: Record<string, string> = {
  'Blender':             '#EA7600',
  'Adobe Photoshop':     '#31A8FF',
  'Adobe Illustrator':   '#FF9A00',
  'Adobe Premiere Pro':  '#9999FF',
  'Adobe After Effects': '#9999FF',
};

function getIcon(name: string): React.ReactElement {
  if (SKILL_ICONS[name]) return SKILL_ICONS[name];
  const key = Object.keys(SKILL_ICONS).find(k =>
    name.toLowerCase().includes(k.toLowerCase().replace('adobe ', ''))
  );
  if (key) return SKILL_ICONS[key];
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
      <rect width="24" height="24" rx="5" fill="#f97316" fillOpacity="0.2"/>
      <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="800" fill="#f97316">
        {name.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
}

function getColor(name: string) {
  return SKILL_COLORS[name] ?? '#f97316';
}

/* ── Circular Progress Ring ── */
function SkillRing({ skill, animated, delay }: { skill: Skill; animated: boolean; delay: number }) {
  const color = getColor(skill.name);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = animated ? circumference * (1 - skill.percentage / 100) : circumference;

  return (
    <ScrollReveal direction="scale" delay={delay}>
      <TiltCard className="skill-ring-card" maxTilt={15} glareOpacity={0.1}>
        <div className="skill-ring-inner">
          {/* SVG Ring */}
          <div className="skill-ring-svg-wrap">
            <svg viewBox="0 0 100 100" className="skill-ring-svg">
              {/* Background ring */}
              <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              {/* Animated ring */}
              <circle
                cx="50" cy="50" r={radius} fill="none"
                stroke={color} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="skill-ring-progress"
                style={{
                  transition: `stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                  filter: `drop-shadow(0 0 6px ${color}80)`,
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                }}
              />
            </svg>
            {/* Icon in center */}
            <div className="skill-ring-icon">
              {getIcon(skill.name)}
            </div>
          </div>

          {/* Name & % */}
          <h4 className="skill-ring-name">{skill.name.replace('Adobe ', '')}</h4>
          <div className="skill-ring-percent" style={{ color }}>
            {animated ? skill.percentage : 0}%
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

export default function Skills({ skillsData }: { skillsData: Skill[] }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-3d section-pad">
      <SectionParticles variant="mixed" />
      <div className="section-3d-content container-max mx-auto" ref={ref}>
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <div className="section-label-3d justify-center">
              <span className="section-label-line" />
              <span>What I can do</span>
              <span className="section-label-line" />
            </div>
            <h2 className="section-title-3d">
              My <span className="gradient-text-gold">Skills</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              Proficiency in industry-leading creative tools and software
            </p>
          </div>
        </ScrollReveal>

        {/* Skill rings grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {skillsData.map((skill, i) => (
            <SkillRing key={skill.name} skill={skill} animated={animated} delay={i * 150} />
          ))}
        </div>

        {/* Proficiency legend */}
        <ScrollReveal direction="up" delay={800}>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {([
              { label: 'Expert', color: '#f97316', min: 85 },
              { label: 'Advanced', color: '#fbbf24', min: 70 },
              { label: 'Intermediate', color: '#6b7280', min: 0 },
            ] as const).map(({ label, color, min }) => {
              const count = skillsData.filter(s => s.percentage >= min && (min === 0 ? s.percentage < 70 : min === 70 ? s.percentage < 85 : true)).length;
              if (!count) return null;
              return (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}60` }} />
                  <span className="text-gray-500 text-xs">{label}</span>
                  <span className="text-gray-300 text-xs font-bold">({count})</span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
