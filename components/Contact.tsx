'use client';
import { useState } from 'react';

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
    <section id="contact" className="section-pad section-bg">
      <div className="container-max mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="section-label">Get in touch</div>
          <h2 className="section-title">Contact Me</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <div className="glass rounded-2xl p-5 sm:p-8 orange-border">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 glass-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-orange-400 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-5 text-sm">I&apos;ll get back to you soon.</p>
                <button onClick={() => setSent(false)} className="btn-primary text-sm px-5 py-2.5">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text', required: true },
                    { name: 'email', label: 'Email', placeholder: 'you@email.com', type: 'email', required: true },
                    { name: 'phone', label: 'Phone', placeholder: '+62 ...', type: 'text', required: false },
                    { name: 'website', label: 'Website', placeholder: 'https://...', type: 'text', required: false },
                  ].map(({ name, label, placeholder, type, required }) => (
                    <div key={name}>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</label>
                      <input suppressHydrationWarning name={name} type={type} required={required}
                        value={(form as Record<string, string>)[name]} onChange={handle}
                        placeholder={placeholder} className="glass-input text-sm" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Message *</label>
                  <textarea suppressHydrationWarning required name="message" value={form.message} onChange={handle}
                    rows={4} placeholder="Tell me about your project..." className="glass-input resize-none text-sm" />
                </div>
                <button suppressHydrationWarning type="submit" className="btn-primary w-full justify-center text-sm">
                  Send Message <i className="fas fa-paper-plane text-xs" />
                </button>
              </form>
            )}
          </div>
          {/* Info */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-5">Looking Forward to Working With You!</h3>
              <div className="space-y-3">
                {[
                  { icon: 'fas fa-map-marker-alt', value: siteConfig.address },
                  { icon: 'fas fa-phone', value: siteConfig.phone },
                  { icon: 'fas fa-envelope', value: siteConfig.email },
                ].map(({ icon, value }) => (
                  <div key={value} className="flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 glass-orange rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className={`${icon} text-orange-400 text-xs sm:text-sm`} />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed break-all">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-5 sm:p-6">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Find Me On</h4>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { href: siteConfig.socials.instagram, icon: 'fab fa-instagram', label: 'Instagram' },
                  { href: siteConfig.socials.linkedin, icon: 'fab fa-linkedin', label: 'LinkedIn' },
                  { href: siteConfig.socials.youtube, icon: 'fab fa-youtube', label: 'YouTube' },
                  { href: `https://wa.me/${siteConfig.socials.whatsapp}`, icon: 'fab fa-whatsapp', label: 'WhatsApp' },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="glass-orange rounded-xl py-3 flex flex-col items-center gap-1.5 hover:scale-105 transition-transform" aria-label={label}>
                    <i className={`${icon} text-orange-400 text-base sm:text-lg`} />
                    <span className="text-xs text-gray-400 hidden xs:block">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
