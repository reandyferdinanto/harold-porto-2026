'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

interface SiteConfig {
  name: string;
  tagline: string;
  logo: string;
  socials: { instagram: string; linkedin: string; youtube: string };
}

/* ─── Typewriter Effect ──────────────────────────────── */
function useTypewriter(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

/* ─── Animated Counter ───────────────────────────────── */
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const interval = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(interval);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref}>
      <span>{count}{suffix}</span>
    </div>
  );
}

/* ─── Hero Component ─────────────────────────────────── */
export default function Hero({ data }: { data: SiteConfig }) {
  const nameParts = data.name.split(' ');
  const roles = data.tagline.split(' | ');
  const typedText = useTypewriter(roles, 80, 1800);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* 3D Background */}
      <ThreeScene />

      {/* Gradient overlays */}
      <div className="hero-gradient-left" />
      <div className="hero-gradient-bottom" />

      {/* Main content */}
      <div className="hero-content container-max mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full">

          {/* ── Left: Text ── */}
          <div
            className={`flex-1 max-w-2xl w-full text-center lg:text-left hero-text-enter ${isVisible ? 'hero-text-visible' : ''}`}
          >
            {/* Tag */}
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              <span>Available for freelance</span>
            </div>

            {/* Name */}
            <h2 className="hero-name-first">{nameParts[0]}</h2>
            <h2 className="hero-name-last">{nameParts.slice(1).join(' ')}</h2>

            {/* Big title */}
            <h1 className="hero-title">Portfolio</h1>

            {/* Typewriter */}
            <div className="hero-typewriter">
              <span className="hero-typewriter-text">{typedText}</span>
              <span className="hero-cursor">|</span>
            </div>

            {/* Description */}
            <p className="hero-description">{data.tagline}</p>

            {/* CTA Buttons */}
            <div className="hero-cta">
              <a href="#portfolio" className="hero-btn-primary">
                <i className="fas fa-rocket" />
                <span>Explore Work</span>
                <span className="hero-btn-glow" />
              </a>
              <a href="#contact" className="hero-btn-outline">
                <i className="fas fa-paper-plane" />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {[
                { end: 14, suffix: '+', label: 'Projects Completed' },
                { end: 5, suffix: '+', label: 'Creative Skills' },
                { end: 2, suffix: '+', label: 'Years Experience' },
              ].map(({ end, suffix, label }) => (
                <div key={label} className="hero-stat">
                  <div className="hero-stat-value">
                    <AnimatedCounter end={end} suffix={suffix} />
                  </div>
                  <p className="hero-stat-label">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Logo with 3D feel ── */}
          <div
            className={`flex-shrink-0 relative hero-logo-enter ${isVisible ? 'hero-logo-visible' : ''}`}
          >
            {/* Outer glow rings */}
            <div className="hero-logo-ring hero-logo-ring-1" />
            <div className="hero-logo-ring hero-logo-ring-2" />
            <div className="hero-logo-ring hero-logo-ring-3" />

            {/* Logo circle */}
            <div className="hero-logo-circle">
              <div className="hero-logo-inner">
                <Image
                  src={data.logo}
                  alt={`${data.name} logo`}
                  fill
                  className="object-contain p-6 sm:p-8 drop-shadow-2xl"
                  unoptimized
                />
              </div>
              {/* Rotating border */}
              <div className="hero-logo-rotating-border" />
            </div>

            {/* Floating badge */}
            <div className="hero-badge hero-badge-top">
              <i className="fas fa-cube" />
              <span>3D Artist</span>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <i className="fas fa-palette" />
              <span>Designer</span>
            </div>
          </div>
        </div>

        {/* Socials row */}
        <div
          className={`hero-socials hero-text-enter ${isVisible ? 'hero-text-visible' : ''}`}
          style={{ transitionDelay: '0.8s' }}
        >
          <span className="hero-socials-label hidden sm:block">Follow</span>
          <div className="hero-socials-line hidden sm:block" />
          {[
            { href: data.socials.instagram, icon: 'fab fa-instagram', label: 'Instagram' },
            { href: data.socials.linkedin, icon: 'fab fa-linkedin', label: 'LinkedIn' },
            { href: data.socials.youtube, icon: 'fab fa-youtube', label: 'YouTube' },
          ].map(({ href, icon, label }) => (
            <a
              key={icon}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              aria-label={label}
            >
              <i className={icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="hero-scroll-indicator" aria-label="Scroll down">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span className="hero-scroll-text">Scroll</span>
      </a>
    </section>
  );
}
