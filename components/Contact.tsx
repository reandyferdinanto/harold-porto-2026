'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const SectionParticles = dynamic(() => import('./SectionParticles'), { ssr: false });

interface SiteConfig {
  address: string; phone: string; email: string;
  socials: { instagram: string; linkedin: string; youtube: string; whatsapp: string };
}

export default function Contact({ siteConfig }: { siteConfig: SiteConfig }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', phone: '', website: '', message: '' });
  };

  return (
    <section id="contact" className="section-3d section-pad">
      <SectionParticles variant="warm" />
      <div className="section-3d-content container-max mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <div className="section-label-3d justify-center">
              <span className="section-label-line" />
              <span>Get in touch</span>
              <span className="section-label-line" />
            </div>
            <h2 className="section-title-3d">
              Contact <span className="gradient-text-gold">Me</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <ScrollReveal direction="left" delay={200}>
            <TiltCard className="contact-form-card" maxTilt={4} glareOpacity={0.06}>
              <div className="contact-form-inner">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="contact-success-icon">
                      <i className="fas fa-check text-orange-400 text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-5 text-sm">I&apos;ll get back to you soon.</p>
                    <button onClick={() => setSent(false)} className="hero-btn-primary text-sm px-5 py-2.5">
                      <span>Send Another</span>
                      <span className="hero-btn-glow" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text', icon: 'fas fa-user', required: true },
                        { name: 'email', label: 'Email', placeholder: 'you@email.com', type: 'email', icon: 'fas fa-envelope', required: true },
                        { name: 'phone', label: 'Phone', placeholder: '+62 ...', type: 'text', icon: 'fas fa-phone', required: false },
                        { name: 'website', label: 'Website', placeholder: 'https://...', type: 'text', icon: 'fas fa-globe', required: false },
                      ].map(({ name, label, placeholder, type, icon, required }) => (
                        <div key={name} className="input-group-3d">
                          <label className="input-label-3d">
                            <i className={`${icon} text-orange-500/50`} />
                            <span>{label}</span>
                          </label>
                          <input suppressHydrationWarning name={name} type={type} required={required}
                            value={(form as Record<string, string>)[name]} onChange={handle}
                            placeholder={placeholder} className="glass-input-3d" />
                        </div>
                      ))}
                    </div>
                    <div className="input-group-3d">
                      <label className="input-label-3d">
                        <i className="fas fa-comment text-orange-500/50" />
                        <span>Message *</span>
                      </label>
                      <textarea suppressHydrationWarning required name="message" value={form.message} onChange={handle}
                        rows={4} placeholder="Tell me about your project..." className="glass-input-3d resize-none" />
                    </div>
                    <button suppressHydrationWarning type="submit" className="hero-btn-primary w-full justify-center text-sm">
                      <i className="fas fa-paper-plane" />
                      <span>Send Message</span>
                      <span className="hero-btn-glow" />
                    </button>
                  </form>
                )}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Info */}
          <div className="space-y-4">
            <ScrollReveal direction="right" delay={300}>
              <TiltCard className="contact-info-card" maxTilt={5}>
                <div className="contact-info-inner">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <span className="contact-info-emoji">🚀</span>
                    Looking Forward to Working With You!
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: 'fas fa-map-marker-alt', value: siteConfig.address, label: 'Location' },
                      { icon: 'fas fa-phone', value: siteConfig.phone, label: 'Phone' },
                      { icon: 'fas fa-envelope', value: siteConfig.email, label: 'Email' },
                    ].map(({ icon, value, label }) => (
                      <div key={value} className="contact-info-row">
                        <div className="contact-info-icon-box">
                          <i className={`${icon} text-orange-400 text-xs sm:text-sm`} />
                        </div>
                        <div>
                          <p className="text-gray-600 text-[10px] uppercase tracking-widest">{label}</p>
                          <p className="text-gray-300 text-sm leading-relaxed break-all">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={450}>
              <TiltCard className="contact-social-card" maxTilt={5}>
                <div className="contact-social-inner">
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-orange-500/50" />
                    Find Me On
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { href: siteConfig.socials.instagram, icon: 'fab fa-instagram', label: 'Instagram', color: '#E4405F' },
                      { href: siteConfig.socials.linkedin, icon: 'fab fa-linkedin', label: 'LinkedIn', color: '#0A66C2' },
                      { href: siteConfig.socials.youtube, icon: 'fab fa-youtube', label: 'YouTube', color: '#FF0000' },
                      { href: `https://wa.me/${siteConfig.socials.whatsapp}`, icon: 'fab fa-whatsapp', label: 'WhatsApp', color: '#25D366' },
                    ].map(({ href, icon, label, color }) => (
                      <a key={label} href={href} target="_blank" rel="noreferrer"
                        className="social-card-3d" aria-label={label}
                        style={{ '--social-color': color } as React.CSSProperties}>
                        <i className={`${icon} text-base sm:text-lg`} />
                        <span className="text-xs text-gray-500 group-hover:text-white">{label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
