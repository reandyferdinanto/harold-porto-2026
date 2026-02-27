import Image from 'next/image';

interface AboutData { portrait: string; bio: string[]; birthdate: string; highlights: string[] }

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="section-pad section-bg">
      <div className="container-max mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Portrait — centred on mobile */}
          <div className="flex-shrink-0 relative mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-2xl orange-glow opacity-40 blur-xl" />
            <div className="relative w-52 h-64 sm:w-64 sm:h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden orange-border">
              <Image src={data.portrait} alt="Portrait" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-b-2 border-orange-500/50 rounded-bl-xl" />
            <div className="absolute -top-3 -right-3 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-t-2 border-orange-500/50 rounded-tr-xl" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="section-label">Get to know me</div>
            <h2 className="section-title mb-5">About Me</h2>

            <div className="flex flex-wrap gap-2 mb-5 justify-center lg:justify-start">
              {data.highlights.map((h) => (
                <span key={h} className="badge-orange">{h}</span>
              ))}
            </div>

            {data.bio.map((para, i) => (
              <p key={i} className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3">{para}</p>
            ))}

            <div className="glass rounded-xl px-4 py-3 mt-5 inline-flex items-center gap-3">
              <i className="fas fa-birthday-cake text-orange-400 text-sm" />
              <span className="text-gray-300 text-sm">Born <span className="text-white font-semibold">{data.birthdate}</span></span>
            </div>

            <div className="mt-6 flex justify-center lg:justify-start">
              <a href="#portfolio" className="btn-primary text-sm px-5 py-2.5">
                <i className="fas fa-images text-xs" /> See My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
