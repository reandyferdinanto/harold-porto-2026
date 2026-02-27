'use client';
import { useEffect, useRef, useState } from 'react';

interface Skill { name: string; percentage: number }

// ── Real SVG logos ─────────────────────────────────────────────────────────
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
    <section id="skills" className="section-pad section-bg">
      <div className="container-max mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label">What I can do</div>
          <h2 className="section-title">Skills</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Left panel: icon grid card ── */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="glass rounded-2xl p-6 orange-border sticky top-24">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-orange-500/50 inline-block" />
                Tools &amp; Software
              </p>

              {/* Icon grid */}
              <div className="grid grid-cols-3 gap-4">
                {skillsData.map((skill) => {
                  const color = getColor(skill.name);
                  return (
                    <div key={skill.name}
                      className="flex flex-col items-center gap-2 group cursor-default select-none"
                      title={skill.name}>
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${color}15`,
                          border: `1.5px solid ${color}30`,
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}55`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${color}80`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                          (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
                        }}
                      >
                        {getIcon(skill.name)}
                      </div>
                      <span className="text-gray-500 text-xs text-center leading-tight group-hover:text-gray-200 transition-colors">
                        {skill.name.replace('Adobe ', '')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Proficiency legend */}
              <div className="mt-7 pt-5 border-t border-white/5 space-y-2.5">
                {([
                  { label: 'Expert',       color: '#f97316', test: (p: number) => p >= 85 },
                  { label: 'Advanced',     color: '#9ca3af', test: (p: number) => p >= 70 && p < 85 },
                  { label: 'Intermediate', color: '#4b5563', test: (p: number) => p < 70 },
                ] as { label: string; color: string; test: (p: number) => boolean }[]).map(({ label, color, test }) => {
                  const count = skillsData.filter(s => test(s.percentage)).length;
                  if (!count) return null;
                  return (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <span className="text-gray-500 text-xs">{label}</span>
                      </div>
                      <span className="text-gray-300 text-xs font-bold">{count} skill{count > 1 ? 's' : ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right panel: animated bars ── */}
          <div ref={ref} className="flex-1 w-full space-y-3">
            {skillsData.map((skill, i) => {
              const color = getColor(skill.name);
              return (
                <div key={skill.name}
                  className="glass rounded-2xl px-5 py-4 transition-all duration-200 hover:border-white/15"
                  style={{ borderColor: `${color}20` }}>
                  {/* Row: icon + name + % */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 p-2"
                      style={{ background: `${color}15`, border: `1.5px solid ${color}35` }}
                    >
                      {getIcon(skill.name)}
                    </div>
                    <span className="text-white font-semibold text-sm flex-1">{skill.name}</span>
                    <span className="font-black text-sm tabular-nums" style={{ color }}>
                      {skill.percentage}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: animated ? `${skill.percentage}%` : '0%',
                        transition: `width 1.3s cubic-bezier(0.4,0,0.2,1) ${i * 130}ms`,
                        background: `linear-gradient(90deg, ${color}dd, ${color}88)`,
                        boxShadow: animated ? `0 0 12px ${color}60` : 'none',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
