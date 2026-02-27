'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Field, Input, Textarea, SectionCard, SaveBar, ImageUpload } from '@/components/admin/AdminUI';

// ── Types ────────────────────────────────────────────────────────────────────
interface SiteConfig {
  name: string; title: string; tagline: string;
  email: string; phone: string; address: string; logo: string;
  socials: { instagram: string; linkedin: string; youtube: string; whatsapp: string };
}
interface AboutData {
  portrait: string; bio: string[]; birthdate: string; highlights: string[];
}
interface TimelineEntry { year: string; items: string[] }
interface Skill { name: string; percentage: number }
interface PortfolioItem {
  id: string; category: string; title: string;
  image: string; href: string; timeSpent: string; description: string;
}
interface ContentData {
  siteConfig: SiteConfig;
  aboutData: AboutData;
  experienceData: TimelineEntry[];
  educationData: TimelineEntry[];
  skillsData: Skill[];
  portfolioItems: PortfolioItem[];
}

const TABS = [
  { id: 'site',      label: 'Site Info',   icon: 'fas fa-globe' },
  { id: 'about',     label: 'About',       icon: 'fas fa-user' },
  { id: 'experience',label: 'Experience',  icon: 'fas fa-briefcase' },
  { id: 'skills',    label: 'Skills',      icon: 'fas fa-chart-bar' },
  { id: 'portfolio', label: 'Portfolio',   icon: 'fas fa-images' },
];

const CATEGORIES = ['3D Art', 'Animations', 'Videos'];

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState('site');
  const [data, setData] = useState<ContentData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── Auth check ───────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/admin/check').then(r => r.json()).then(j => {
      if (!j.ok) router.push('/admin');
    });
  }, [router]);

  // ── Load content ─────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  // ── Save ─────────────────────────────────────────────────────────────────
  const save = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [data]);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-orange-400 text-3xl" />
      </div>
    );
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  const set = (path: string, value: unknown) => {
    setData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  return (
    <div className="min-h-screen">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/5 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] flex-shrink-0" />
          <span className="text-white font-bold text-sm sm:text-base truncate">Admin</span>
          <span className="badge-silver hidden sm:inline">Harold Portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" className="btn-outline text-xs py-1.5 px-3 sm:py-2 sm:px-4">
            <i className="fas fa-external-link-alt" />
            <span className="hidden sm:inline ml-1">View Site</span>
          </a>
          <button onClick={logout} className="text-gray-500 hover:text-red-400 text-sm transition-colors p-1.5 sm:px-2">
            <i className="fas fa-sign-out-alt" />
            <span className="hidden sm:inline ml-1">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)]">
        {/* ── Sidebar (desktop only) ── */}
        <aside className="w-52 flex-shrink-0 border-r border-white/5 bg-black/30 backdrop-blur py-6 px-3 hidden md:block">
          <nav className="space-y-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}>
                <i className={`${t.icon} w-4 text-center`} />
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Mobile bottom tab bar ── */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-black/95 backdrop-blur-xl border-t border-white/5 flex safe-area-pb">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-colors ${
                tab === t.id ? 'text-orange-400' : 'text-gray-600 active:text-gray-300'
              }`}>
              <i className={`${t.icon} text-base`} />
              <span className="text-[10px] leading-none mt-0.5">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 md:p-8 overflow-y-auto pb-24 md:pb-8">

          {/* ══ SITE INFO ══ */}
          {tab === 'site' && (
            <>
              <h2 className="section-title text-2xl mb-6">Site Information</h2>

              <SectionCard title="Identity" icon="fas fa-id-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name">
                    <Input value={data.siteConfig.name} onChange={v => set('siteConfig.name', v)} placeholder="Your name" />
                  </Field>
                  <Field label="Tagline">
                    <Input value={data.siteConfig.tagline} onChange={v => set('siteConfig.tagline', v)} placeholder="Your tagline" />
                  </Field>
                  <Field label="Email">
                    <Input value={data.siteConfig.email} onChange={v => set('siteConfig.email', v)} type="email" placeholder="email@example.com" />
                  </Field>
                  <Field label="Phone">
                    <Input value={data.siteConfig.phone} onChange={v => set('siteConfig.phone', v)} placeholder="+62 ..." />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Address">
                    <Input value={data.siteConfig.address} onChange={v => set('siteConfig.address', v)} placeholder="Your address" />
                  </Field>
                </div>
                <div className="mt-4">
                  <ImageUpload current={data.siteConfig.logo} onUploaded={url => set('siteConfig.logo', url)} label="Logo Image" />
                </div>
              </SectionCard>

              <SectionCard title="Social Links" icon="fas fa-share-alt">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'instagram', icon: 'fab fa-instagram', label: 'Instagram URL' },
                    { key: 'linkedin',  icon: 'fab fa-linkedin',  label: 'LinkedIn URL' },
                    { key: 'youtube',   icon: 'fab fa-youtube',   label: 'YouTube URL' },
                    { key: 'whatsapp',  icon: 'fab fa-whatsapp',  label: 'WhatsApp Number' },
                  ].map(({ key, icon, label }) => (
                    <Field key={key} label={label}>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 text-sm w-5"><i className={icon} /></span>
                        <Input
                          value={(data.siteConfig.socials as Record<string, string>)[key]}
                          onChange={v => set(`siteConfig.socials.${key}`, v)}
                          placeholder={label}
                        />
                      </div>
                    </Field>
                  ))}
                </div>
              </SectionCard>
              <SaveBar saving={saving} saved={saved} onSave={save} />
            </>
          )}

          {/* ══ ABOUT ══ */}
          {tab === 'about' && (
            <>
              <h2 className="section-title text-2xl mb-6">About Section</h2>

              <SectionCard title="Portrait & Bio" icon="fas fa-user-circle">
                <div className="mb-4">
                  <ImageUpload current={data.aboutData.portrait} onUploaded={url => set('aboutData.portrait', url)} label="Portrait Photo" />
                </div>
                <div className="mb-4">
                  <Field label="Birthdate">
                    <Input value={data.aboutData.birthdate} onChange={v => set('aboutData.birthdate', v)} placeholder="19th of August 2002, Jakarta" />
                  </Field>
                </div>
                <Field label="Bio Paragraphs">
                  {data.aboutData.bio.map((para, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Textarea
                        value={para}
                        onChange={v => {
                          const bio = [...data.aboutData.bio];
                          bio[i] = v;
                          set('aboutData.bio', bio);
                        }}
                        placeholder={`Bio paragraph ${i + 1}`}
                        rows={2}
                      />
                      <button onClick={() => {
                        const bio = data.aboutData.bio.filter((_, j) => j !== i);
                        set('aboutData.bio', bio);
                      }} className="text-red-500 hover:text-red-400 px-2 flex-shrink-0">
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => set('aboutData.bio', [...data.aboutData.bio, ''])}
                    className="btn-outline text-xs py-2 px-4 mt-1">
                    <i className="fas fa-plus" /> Add Paragraph
                  </button>
                </Field>
              </SectionCard>

              <SectionCard title="Highlight Badges" icon="fas fa-tags">
                <div className="flex flex-wrap gap-2 mb-3">
                  {data.aboutData.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1 glass-orange rounded-full pl-3 pr-2 py-1">
                      <span className="text-orange-400 text-sm">{h}</span>
                      <button onClick={() => set('aboutData.highlights', data.aboutData.highlights.filter((_, j) => j !== i))}
                        className="text-red-500 hover:text-red-400 text-xs ml-1">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  ))}
                </div>
                <AddItemInline
                  placeholder="Add highlight (e.g. 3D Artist)"
                  onAdd={v => set('aboutData.highlights', [...data.aboutData.highlights, v])}
                />
              </SectionCard>
              <SaveBar saving={saving} saved={saved} onSave={save} />
            </>
          )}

          {/* ══ EXPERIENCE ══ */}
          {tab === 'experience' && (
            <>
              <h2 className="section-title text-2xl mb-6">Experience & Education</h2>
              <TimelineEditor
                title="Experience" icon="fas fa-briefcase"
                entries={data.experienceData}
                onChange={v => set('experienceData', v)}
              />
              <TimelineEditor
                title="Education" icon="fas fa-graduation-cap"
                entries={data.educationData}
                onChange={v => set('educationData', v)}
              />
              <SectionCard title="Skills" icon="fas fa-chart-bar">
                {data.skillsData.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <Input value={skill.name} onChange={v => {
                        const s = [...data.skillsData];
                        s[i] = { ...s[i], name: v };
                        set('skillsData', s);
                      }} placeholder="Skill name" />
                    </div>
                    <div className="flex items-center gap-2 w-32">
                      <input suppressHydrationWarning type="range" min={0} max={100}
                        value={skill.percentage}
                        onChange={e => {
                          const s = [...data.skillsData];
                          s[i] = { ...s[i], percentage: Number(e.target.value) };
                          set('skillsData', s);
                        }}
                        className="flex-1 accent-orange-500"
                      />
                      <span className="text-orange-400 text-sm font-bold w-8">{skill.percentage}%</span>
                    </div>
                    <button onClick={() => set('skillsData', data.skillsData.filter((_, j) => j !== i))}
                      className="text-red-500 hover:text-red-400">
                      <i className="fas fa-trash text-sm" />
                    </button>
                  </div>
                ))}
                <button onClick={() => set('skillsData', [...data.skillsData, { name: '', percentage: 75 }])}
                  className="btn-outline text-xs py-2 px-4 mt-2">
                  <i className="fas fa-plus" /> Add Skill
                </button>
              </SectionCard>
              <SaveBar saving={saving} saved={saved} onSave={save} />
            </>
          )}

          {/* ══ SKILLS standalone ══ */}
          {tab === 'skills' && (
            <>
              <h2 className="section-title text-2xl mb-6">Skills</h2>

              {/* Live preview strip */}
              <div className="glass rounded-2xl p-5 mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Logo Preview</p>
                <div className="flex flex-wrap gap-4">
                  {data.skillsData.map((skill) => {
                    const COLORS: Record<string,string> = {
                      'Blender':'#EA7600','Adobe Photoshop':'#31A8FF',
                      'Adobe Illustrator':'#FF9A00','Adobe Premiere Pro':'#9999FF','Adobe After Effects':'#9999FF',
                    };
                    const color = COLORS[skill.name] ?? '#f97316';
                    const LOGOS: Record<string,string> = {
                      'Blender':'B','Adobe Photoshop':'Ps','Adobe Illustrator':'Ai',
                      'Adobe Premiere Pro':'Pr','Adobe After Effects':'Ae',
                    };
                    const abbr = LOGOS[skill.name] ?? skill.name.slice(0,2).toUpperCase();
                    return (
                      <div key={skill.name} className="flex flex-col items-center gap-1.5" title={skill.name}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black"
                          style={{ background:`${color}18`, border:`1.5px solid ${color}40`, color }}>
                          {abbr}
                        </div>
                        <span className="text-gray-600 text-xs">{skill.name.replace('Adobe ','')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <SectionCard title="Skill Bars" icon="fas fa-chart-bar">
                {data.skillsData.map((skill, i) => {
                  const COLORS: Record<string,string> = {
                    'Blender':'#EA7600','Adobe Photoshop':'#31A8FF',
                    'Adobe Illustrator':'#FF9A00','Adobe Premiere Pro':'#9999FF','Adobe After Effects':'#9999FF',
                  };
                  const color = COLORS[skill.name] ?? '#f97316';
                  return (
                    <div key={i} className="flex items-center gap-3 mb-4 glass rounded-xl px-4 py-3"
                      style={{ borderColor: `${color}25` }}>
                      {/* Color dot */}
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                      <div className="flex-1">
                        <Input value={skill.name} onChange={v => {
                          const s = [...data.skillsData];
                          s[i] = { ...s[i], name: v };
                          set('skillsData', s);
                        }} placeholder="Skill name (e.g. Blender)" />
                      </div>
                      <div className="flex items-center gap-3 w-48">
                        <input suppressHydrationWarning type="range" min={0} max={100}
                          value={skill.percentage}
                          onChange={e => {
                            const s = [...data.skillsData];
                            s[i] = { ...s[i], percentage: Number(e.target.value) };
                            set('skillsData', s);
                          }}
                          className="flex-1 h-2"
                          style={{ accentColor: color }}
                        />
                        <span className="font-black text-sm w-10 text-right" style={{ color }}>{skill.percentage}%</span>
                      </div>
                      <button onClick={() => set('skillsData', data.skillsData.filter((_, j) => j !== i))}
                        className="text-red-500 hover:text-red-400 transition-colors">
                        <i className="fas fa-trash text-sm" />
                      </button>
                    </div>
                  );
                })}
                <button onClick={() => set('skillsData', [...data.skillsData, { name: '', percentage: 75 }])}
                  className="btn-outline text-xs py-2 px-4 mt-2">
                  <i className="fas fa-plus" /> Add Skill
                </button>
              </SectionCard>
              <SaveBar saving={saving} saved={saved} onSave={save} />
            </>
          )}

          {/* ══ PORTFOLIO ══ */}
          {tab === 'portfolio' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="section-title text-2xl">Portfolio</h2>
                <button
                  onClick={() => {
                    const newItem: PortfolioItem = {
                      id: Date.now().toString(),
                      category: '3D Art',
                      title: 'New Work',
                      image: '',
                      href: '',
                      timeSpent: '',
                      description: '',
                    };
                    set('portfolioItems', [...data.portfolioItems, newItem]);
                    // scroll to bottom after add
                    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
                  }}
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  <i className="fas fa-plus" /> Add Work
                </button>
              </div>

              {data.portfolioItems.map((item, i) => (
                <PortfolioItemEditor
                  key={item.id}
                  item={item}
                  index={i}
                  total={data.portfolioItems.length}
                  onChange={updated => {
                    const items = [...data.portfolioItems];
                    items[i] = updated;
                    set('portfolioItems', items);
                  }}
                  onDelete={() => set('portfolioItems', data.portfolioItems.filter((_, j) => j !== i))}
                  onMoveUp={() => {
                    if (i === 0) return;
                    const items = [...data.portfolioItems];
                    [items[i - 1], items[i]] = [items[i], items[i - 1]];
                    set('portfolioItems', items);
                  }}
                  onMoveDown={() => {
                    if (i === data.portfolioItems.length - 1) return;
                    const items = [...data.portfolioItems];
                    [items[i], items[i + 1]] = [items[i + 1], items[i]];
                    set('portfolioItems', items);
                  }}
                />
              ))}

              <SaveBar saving={saving} saved={saved} onSave={save} />
            </>
          )}

        </main>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AddItemInline({ placeholder, onAdd }: { placeholder: string; onAdd: (v: string) => void }) {
  const [val, setVal] = useState('');
  return (
    <div className="flex gap-2 mt-2">
      <input suppressHydrationWarning
        type="text" value={val} onChange={e => setVal(e.target.value)}
        placeholder={placeholder} className="glass-input flex-1"
        onKeyDown={e => { if (e.key === 'Enter' && val.trim()) { onAdd(val.trim()); setVal(''); } }}
      />
      <button onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(''); } }}
        className="btn-primary text-sm py-2 px-4">
        <i className="fas fa-plus" />
      </button>
    </div>
  );
}

function TimelineEditor({
  title, icon, entries, onChange,
}: {
  title: string; icon: string;
  entries: TimelineEntry[];
  onChange: (v: TimelineEntry[]) => void;
}) {
  return (
    <SectionCard title={title} icon={icon}>
      {entries.map((entry, i) => (
        <div key={i} className="glass rounded-xl p-4 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1">
              <Input value={entry.year} onChange={v => {
                const e = [...entries];
                e[i] = { ...e[i], year: v };
                onChange(e);
              }} placeholder="Year (e.g. 2022)" />
            </div>
            <button onClick={() => onChange(entries.filter((_, j) => j !== i))}
              className="text-red-500 hover:text-red-400 px-2">
              <i className="fas fa-trash text-sm" />
            </button>
          </div>
          {entry.items.map((item, j) => (
            <div key={j} className="flex gap-2 mb-2 pl-4">
              <Input value={item} onChange={v => {
                const e = JSON.parse(JSON.stringify(entries));
                e[i].items[j] = v;
                onChange(e);
              }} placeholder="Entry description" />
              <button onClick={() => {
                const e = JSON.parse(JSON.stringify(entries));
                e[i].items = e[i].items.filter((_: string, k: number) => k !== j);
                onChange(e);
              }} className="text-red-500 hover:text-red-400 flex-shrink-0">
                <i className="fas fa-times text-sm" />
              </button>
            </div>
          ))}
          <button onClick={() => {
            const e = JSON.parse(JSON.stringify(entries));
            e[i].items.push('');
            onChange(e);
          }} className="text-orange-400 hover:text-orange-300 text-xs pl-4 flex items-center gap-1 mt-1">
            <i className="fas fa-plus" /> Add entry
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...entries, { year: '', items: [''] }])}
        className="btn-outline text-xs py-2 px-4 mt-1">
        <i className="fas fa-plus" /> Add {title} Period
      </button>
    </SectionCard>
  );
}

function PortfolioItemEditor({
  item, index, total, onChange, onDelete, onMoveUp, onMoveDown,
}: {
  item: PortfolioItem; index: number; total: number;
  onChange: (v: PortfolioItem) => void;
  onDelete: () => void; onMoveUp: () => void; onMoveDown: () => void;
}) {
  const [open, setOpen] = useState(index >= total - 1); // open latest by default

  return (
    <div className="glass rounded-2xl mb-4 overflow-hidden orange-border">
      {/* Header row */}
      <div className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-white/3 transition-colors"
        onClick={() => setOpen(o => !o)}>
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg border border-white/10 flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 glass-orange rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-image text-orange-400" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{item.title || 'Untitled'}</p>
          <span className="badge-orange text-xs">{item.category}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); onMoveUp(); }}
            disabled={index === 0}
            className="w-7 h-7 glass rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-400 disabled:opacity-30 transition-colors">
            <i className="fas fa-chevron-up text-xs" />
          </button>
          <button onClick={e => { e.stopPropagation(); onMoveDown(); }}
            disabled={index === total - 1}
            className="w-7 h-7 glass rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-400 disabled:opacity-30 transition-colors">
            <i className="fas fa-chevron-down text-xs" />
          </button>
          <button onClick={e => { e.stopPropagation(); onDelete(); }}
            className="w-7 h-7 glass rounded-lg flex items-center justify-center text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <i className="fas fa-trash text-xs" />
          </button>
          <i className={`fas fa-chevron-${open ? 'up' : 'down'} text-gray-600 text-xs ml-1`} />
        </div>
      </div>

      {/* Expanded fields */}
      {open && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-white/5 pt-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Title">
              <Input value={item.title} onChange={v => onChange({ ...item, title: v })} placeholder="Work title" />
            </Field>
            <Field label="Category">
              <select
                value={item.category}
                onChange={e => onChange({ ...item, category: e.target.value })}
                className="glass-input"
              >
                {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
              </select>
            </Field>
            <Field label="Time Spent">
              <Input value={item.timeSpent} onChange={v => onChange({ ...item, timeSpent: v })} placeholder="e.g. 2 Hours" />
            </Field>
            <Field label="Link / href (optional)">
              <Input value={item.href || ''} onChange={v => onChange({ ...item, href: v })} placeholder="URL or /uploads/file.mp4" />
            </Field>
          </div>
          <Field label="Description">
            <Textarea value={item.description} onChange={v => onChange({ ...item, description: v })} placeholder="Describe this work..." rows={2} />
          </Field>
          <ImageUpload
            current={item.image}
            onUploaded={url => onChange({ ...item, image: url })}
            label="Thumbnail Image / GIF"
          />
        </div>
      )}
    </div>
  );
}

