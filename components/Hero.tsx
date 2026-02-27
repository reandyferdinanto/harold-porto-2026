import Image from 'next/image';

interface SiteConfig {
  name: string; tagline: string; logo: string;
  socials: { instagram: string; linkedin: string; youtube: string };
}

export default function Hero({ data }: { data: SiteConfig }) {
  const nameParts = data.name.split(' ');
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full" style={{background:'rgba(249,115,22,0.05)'}} />

      <div className="container-max mx-auto px-6 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 max-w-xl">
            <div className="section-label mb-4">Welcome to my</div>
            <h2 className="text-5xl md:text-7xl font-light text-white/90 leading-none mb-1">
              {nameParts[0]}
              <span className="block font-black text-white">{nameParts.slice(1).join(' ')}</span>
            </h2>
            <h1 className="text-6xl md:text-9xl font-black gradient-text leading-none mb-8 mt-2">Portfolio</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">{data.tagline}</p>
            <div className="flex gap-4 flex-wrap mb-12">
              <a href="#portfolio" className="btn-primary"><i className="fas fa-eye text-sm" /> View My Work</a>
              <a href="#contact" className="btn-outline"><i className="fas fa-envelope text-sm" /> Contact Me</a>
            </div>
            <div className="flex gap-8">
              {[{ value: '14+', label: 'Projects' }, { value: '3+', label: 'Skills' }, { value: '2+', label: 'Years Exp.' }].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-orange-400">{value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 rounded-full orange-glow opacity-60 scale-110" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 glass rounded-full orange-border flex items-center justify-center">
              <Image src={data.logo} alt={`${data.name} logo`} fill className="object-contain p-8" unoptimized />
            </div>
            <div className="absolute -bottom-4 -right-4 glass-orange px-4 py-2 rounded-full">
              <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">Graphic Designer</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-16">
          <span className="text-xs text-gray-600 uppercase tracking-widest">Follow</span>
          <div className="w-12 h-px bg-gray-700" />
          {[
            { href: data.socials.instagram, icon: 'fab fa-instagram' },
            { href: data.socials.linkedin, icon: 'fab fa-linkedin' },
            { href: data.socials.youtube, icon: 'fab fa-youtube' },
          ].map(({ href, icon }) => (
            <a key={icon} href={href} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-orange-400 text-lg transition-all hover:scale-110">
              <i className={icon} />
            </a>
          ))}
        </div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 hover:text-orange-400 transition-colors">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <i className="fas fa-chevron-down animate-bounce text-sm" />
      </a>
    </section>
  );
}
