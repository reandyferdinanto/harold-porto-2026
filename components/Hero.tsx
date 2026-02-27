import Image from 'next/image';

interface SiteConfig {
  name: string; tagline: string; logo: string;
  socials: { instagram: string; linkedin: string; youtube: string };
}

export default function Hero({ data }: { data: SiteConfig }) {
  const nameParts = data.name.split(' ');
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="container-max mx-auto px-4 sm:px-6 w-full py-12 sm:py-20">
        {/* Stack on mobile, side-by-side on lg */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* Text */}
          <div className="flex-1 max-w-xl w-full text-center lg:text-left">
            <div className="section-label mb-3">Welcome to my</div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-white/90 leading-none mb-1">
              {nameParts[0]}
              <span className="block font-black text-white">{nameParts.slice(1).join(' ')}</span>
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-9xl font-black gradient-text leading-none mb-6 mt-2">Portfolio</h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">{data.tagline}</p>
            <div className="flex gap-3 flex-wrap justify-center lg:justify-start mb-8">
              <a href="#portfolio" className="btn-primary text-sm px-5 py-2.5"><i className="fas fa-eye text-xs" /> View My Work</a>
              <a href="#contact"   className="btn-outline text-sm px-5 py-2.5"><i className="fas fa-envelope text-xs" /> Contact Me</a>
            </div>
            <div className="flex gap-6 justify-center lg:justify-start">
              {[{ value: '14+', label: 'Projects' }, { value: '5+', label: 'Skills' }, { value: '2+', label: 'Years Exp.' }].map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-black text-orange-400">{value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logo circle */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 rounded-full orange-glow opacity-60 scale-110" />
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 glass rounded-full orange-border flex items-center justify-center">
              <Image src={data.logo} alt={`${data.name} logo`} fill className="object-contain p-8" unoptimized />
            </div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 glass-orange px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">Graphic Designer</span>
            </div>
          </div>
        </div>

        {/* Socials row */}
        <div className="flex items-center gap-4 sm:gap-6 mt-10 sm:mt-16 justify-center lg:justify-start">
          <span className="text-xs text-gray-600 uppercase tracking-widest hidden sm:block">Follow</span>
          <div className="w-8 sm:w-12 h-px bg-gray-700 hidden sm:block" />
          {[
            { href: data.socials.instagram, icon: 'fab fa-instagram' },
            { href: data.socials.linkedin,  icon: 'fab fa-linkedin' },
            { href: data.socials.youtube,   icon: 'fab fa-youtube' },
          ].map(({ href, icon }) => (
            <a key={icon} href={href} target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-orange-400 text-lg transition-all hover:scale-110">
              <i className={icon} />
            </a>
          ))}
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600 hover:text-orange-400 transition-colors">
        <span className="text-xs uppercase tracking-widest hidden sm:block">Scroll</span>
        <i className="fas fa-chevron-down animate-bounce text-sm" />
      </a>
    </section>
  );
}
