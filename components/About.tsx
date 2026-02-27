import Image from 'next/image';

interface AboutData { portrait: string; bio: string[]; birthdate: string; highlights: string[] }

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="section-pad section-bg">
      <div className="container-max mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Portrait */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 rounded-2xl orange-glow opacity-40 blur-xl" />
            <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden orange-border">
              <Image src={data.portrait} alt="Portrait" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Corner accent */}
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-l-2 border-b-2 border-orange-500/50 rounded-bl-xl" />
            <div className="absolute -top-3 -right-3 w-16 h-16 border-r-2 border-t-2 border-orange-500/50 rounded-tr-xl" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <div className="section-label">Get to know me</div>
            <h2 className="section-title mb-6">About Me</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {data.highlights.map((h) => (
                <span key={h} className="badge-orange">{h}</span>
              ))}
            </div>

            {data.bio.map((para, i) => (
              <p key={i} className="text-gray-400 text-base leading-relaxed mb-4">{para}</p>
            ))}

            <div className="glass rounded-xl px-5 py-4 mt-6 inline-flex items-center gap-3">
              <i className="fas fa-birthday-cake text-orange-400" />
              <span className="text-gray-300 text-sm">Born <span className="text-white font-semibold">{data.birthdate}</span></span>
            </div>

            <div className="mt-8">
              <a href="#portfolio" className="btn-primary">
                <i className="fas fa-images text-sm" /> See My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
