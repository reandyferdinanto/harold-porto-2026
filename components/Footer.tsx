interface SiteConfig { name: string; tagline: string; socials: { instagram: string; linkedin: string; youtube: string } }

export default function Footer({ data }: { data: SiteConfig }) {
  return (
    <footer className="section-bg-alt border-t border-white/5 py-10 px-6">
      <div className="container-max mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <div>
              <p className="text-white font-bold">{data.name}</p>
              <p className="text-gray-600 text-xs mt-0.5">{data.tagline}</p>
            </div>
          </div>

          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} <span className="text-orange-500/70">Harolds Designs</span>. All rights reserved.
          </p>

          <div className="flex gap-3">
            {[
              { href: data.socials.instagram, icon: 'fab fa-instagram' },
              { href: data.socials.linkedin, icon: 'fab fa-linkedin' },
              { href: data.socials.youtube, icon: 'fab fa-youtube' },
            ].map(({ href, icon }) => (
              <a key={icon} href={href} target="_blank" rel="noreferrer"
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-gray-500 hover:text-orange-400 transition-all text-sm">
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
