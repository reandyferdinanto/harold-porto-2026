'use client';

import ScrollReveal from './ScrollReveal';

interface SiteConfig {
  name: string;
  tagline: string;
  socials: { instagram: string; linkedin: string; youtube: string };
}

export default function Footer({ data }: { data: SiteConfig }) {
  return (
    <footer className="footer-3d">
      {/* Top accent line */}
      <div className="footer-accent-line" />

      <div className="container-max mx-auto px-6">
        <ScrollReveal direction="up" delay={100}>
          <div className="footer-content">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-brand-dot" />
              <div>
                <p className="text-white font-bold text-lg">{data.name}</p>
                <p className="text-gray-600 text-xs mt-0.5">{data.tagline}</p>
              </div>
            </div>

            {/* Back to top */}
            <a href="#home" className="footer-top-btn" aria-label="Back to top">
              <i className="fas fa-arrow-up text-xs" />
              <span>Top</span>
            </a>

            {/* Copyright */}
            <p className="text-gray-600 text-xs text-center order-3 md:order-2">
              &copy; {new Date().getFullYear()} <span className="text-orange-500/70">Harolds Designs</span>. All rights reserved.
            </p>

            {/* Social */}
            <div className="flex gap-3 order-2 md:order-3">
              {[
                { href: data.socials.instagram, icon: 'fab fa-instagram' },
                { href: data.socials.linkedin, icon: 'fab fa-linkedin' },
                { href: data.socials.youtube, icon: 'fab fa-youtube' },
              ].map(({ href, icon }) => (
                <a key={icon} href={href} target="_blank" rel="noreferrer"
                  className="footer-social-link">
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
