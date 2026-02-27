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
      <div className="container-max mx-auto">
        <div className="text-center mb-14">
          <div className="section-label">Get in touch</div>
          <h2 className="section-title">Contact Me</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="glass rounded-2xl p-8 orange-border">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 glass-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-orange-400 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">I&apos;ll get back to you soon.</p>
                <button onClick={() => setSent(false)} className="btn-primary">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text', required: true },
                    { name: 'email', label: 'Email', placeholder: 'you@email.com', type: 'email', required: true },
                    { name: 'phone', label: 'Phone', placeholder: '+62 ...', type: 'text', required: false },
                    { name: 'website', label: 'Website', placeholder: 'https://...', type: 'text', required: false },
                  ].map(({ name, label, placeholder, type, required }) => (
                    <div key={name}>
                      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
                      <input suppressHydrationWarning name={name} type={type} required={required}
                        value={(form as Record<string, string>)[name]} onChange={handle}
                        placeholder={placeholder} className="glass-input" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Message *</label>
                  <textarea suppressHydrationWarning required name="message" value={form.message} onChange={handle}
                    rows={5} placeholder="Tell me about your project..." className="glass-input resize-none" />
                </div>
                <button suppressHydrationWarning type="submit" className="btn-primary w-full justify-center">
                  Send Message <i className="fas fa-paper-plane text-sm" />
                </button>
              </form>
            )}
          </div>
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Looking Forward to Working With You!</h3>
              <div className="space-y-4">
                {[
                  { icon: 'fas fa-map-marker-alt', value: siteConfig.address },
                  { icon: 'fas fa-phone', value: siteConfig.phone },
                  { icon: 'fas fa-envelope', value: siteConfig.email },
                ].map(({ icon, value }) => (
                  <div key={value} className="flex items-start gap-4">
                    <div className="w-9 h-9 glass-orange rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className={`${icon} text-orange-400 text-sm`} />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Find Me On</h4>
              <div className="flex gap-3">
                {[
                  { href: siteConfig.socials.instagram, icon: 'fab fa-instagram', label: 'Instagram' },
                  { href: siteConfig.socials.linkedin, icon: 'fab fa-linkedin', label: 'LinkedIn' },
                  { href: siteConfig.socials.youtube, icon: 'fab fa-youtube', label: 'YouTube' },
                  { href: `https://wa.me/${siteConfig.socials.whatsapp}`, icon: 'fab fa-whatsapp', label: 'WhatsApp' },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="flex-1 glass-orange rounded-xl py-3 flex flex-col items-center gap-1.5 hover:scale-105 transition-transform" aria-label={label}>
                    <i className={`${icon} text-orange-400 text-lg`} />
                    <span className="text-xs text-gray-400">{label}</span>
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
