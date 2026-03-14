'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home', icon: 'fas fa-home' },
  { label: 'About', href: '#about', icon: 'fas fa-user' },
  { label: 'Experience', href: '#experience', icon: 'fas fa-briefcase' },
  { label: 'Skills', href: '#skills', icon: 'fas fa-tools' },
  { label: 'Portfolio', href: '#portfolio', icon: 'fas fa-images' },
  { label: 'Contact', href: '#contact', icon: 'fas fa-envelope' },
];

interface SiteConfig {
  name: string;
  address: string;
  phone: string;
  email: string;
  socials: { instagram: string; linkedin: string; youtube: string };
}

export default function Navbar({ data }: { data: SiteConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Progress bar
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      // Active section
      for (const { href } of [...navLinks].reverse()) {
        const el = document.getElementById(href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(href.slice(1));
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || sideOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, sideOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`overlay ${sideOpen || mobileOpen ? 'open' : ''}`}
        onClick={() => { setSideOpen(false); setMobileOpen(false); }}
      />

      {/* ── Side info drawer ── */}
      <aside className={`sidenav flex flex-col ${sideOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-500/20">
          <span className="text-orange-400 font-bold tracking-widest text-xs uppercase">Info</span>
          <button suppressHydrationWarning onClick={() => setSideOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-orange-400 text-xl nav-close-btn">
            &times;
          </button>
        </div>
        <div className="px-5 py-6 space-y-5 flex-1 overflow-y-auto">
          {[
            { label: 'Address', value: data.address, cls: 'text-gray-300 text-sm leading-relaxed' },
            { label: 'Phone', value: data.phone, cls: 'text-orange-400 font-semibold text-sm' },
            { label: 'Email', value: data.email, cls: 'text-gray-300 text-sm break-all' },
          ].map(({ label, value, cls }) => (
            <div key={label} className="side-info-item">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</p>
              <p className={cls}>{value}</p>
            </div>
          ))}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Social</p>
            <div className="flex gap-3">
              {[
                { href: data.socials.instagram, icon: 'fab fa-instagram' },
                { href: data.socials.linkedin, icon: 'fab fa-linkedin' },
                { href: data.socials.youtube, icon: 'fab fa-youtube' },
              ].map(({ href, icon }) => (
                <a key={icon} href={href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/40 transition-all nav-social-link">
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 pb-6">
          <a href="/admin" className="btn-outline w-full justify-center text-xs py-2.5">
            <i className="fas fa-lock" /> Admin Panel
          </a>
        </div>
      </aside>

      {/* ── Navbar ── */}
      <nav className={`nav-3d ${scrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
        {/* Scroll progress bar */}
        <div className="nav-progress-bar" style={{ width: `${scrollProgress}%` }} />

        <div className="container-max flex items-center justify-between px-4 sm:px-6 mx-auto">
          {/* Brand */}
          <a href="#home" className="nav-brand group flex-shrink-0">
            <div className="nav-brand-dot" />
            <span className="font-bold text-white tracking-tight text-sm sm:text-base truncate max-w-[160px]">
              {data.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}
                  className={`nav-link-3d ${activeSection === href.slice(1) ? 'nav-link-active' : ''}`}>
                  <span className="nav-link-text">{label}</span>
                  {activeSection === href.slice(1) && <span className="nav-link-indicator" />}
                </a>
              </li>
            ))}
            <li>
              <button suppressHydrationWarning onClick={() => setSideOpen(true)}
                className="nav-info-btn">
                <i className="fas fa-ellipsis-v text-xs" />
              </button>
            </li>
          </ul>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button suppressHydrationWarning onClick={() => setSideOpen(true)}
              className="nav-mobile-btn">
              <i className="fas fa-info text-xs" />
            </button>
            <button suppressHydrationWarning onClick={() => setMobileOpen(!mobileOpen)}
              className="nav-mobile-btn">
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-sm`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden mx-3 mt-2 nav-mobile-dropdown" style={{ maxHeight: 'calc(100vh - 5rem)', overflowY: 'auto' }}>
            {navLinks.map(({ label, href, icon }) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)}
                className={`nav-mobile-link ${activeSection === href.slice(1) ? 'nav-mobile-active' : ''}`}>
                <i className={`${icon} text-xs w-5 text-center`} />
                <span>{label}</span>
                {activeSection === href.slice(1) && <span className="nav-mobile-indicator" />}
              </a>
            ))}

            {/* ── Contact Info ── */}
            <div className="px-5 py-4 border-t border-white/5 space-y-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Contact Info</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <i className="fas fa-map-marker-alt text-orange-400/60 text-xs mt-0.5 w-4 text-center" />
                  <p className="text-gray-400 text-xs leading-relaxed">{data.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-phone-alt text-orange-400/60 text-xs w-4 text-center" />
                  <p className="text-orange-400 text-xs font-semibold">{data.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-envelope text-orange-400/60 text-xs w-4 text-center" />
                  <p className="text-gray-400 text-xs break-all">{data.email}</p>
                </div>
              </div>
            </div>

            {/* ── Social Links ── */}
            <div className="px-5 py-3 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-2">Social</p>
              <div className="flex gap-2">
                {[
                  { href: data.socials.instagram, icon: 'fab fa-instagram' },
                  { href: data.socials.linkedin, icon: 'fab fa-linkedin' },
                  { href: data.socials.youtube, icon: 'fab fa-youtube' },
                ].map(({ href, icon }) => (
                  <a key={icon} href={href} target="_blank" rel="noreferrer"
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/40 transition-all text-sm">
                    <i className={icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Admin Panel ── */}
            <div className="px-5 py-3 border-t border-white/5">
              <a href="/admin" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-orange-400 transition-colors py-1">
                <i className="fas fa-lock" />
                <span>Admin Panel</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
