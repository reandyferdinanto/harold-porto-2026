import { experienceData, educationData } from '@/data/portfolio';

interface TimelineEntry {
  year: string;
  items: string[];
}

function Timeline({
  title,
  icon,
  data,
}: {
  title: string;
  icon: string;
  data: TimelineEntry[];
}) {
  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 glass-orange rounded-xl flex items-center justify-center">
          <i className={`${icon} text-orange-400`} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-6 relative pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-orange-500/20">
        {data.map((entry, i) => (
          <div key={i} className="relative">
            <div className="timeline-dot absolute -left-6 top-1" />
            <span className="badge-orange mb-2 inline-block">{entry.year}</span>
            <ul className="space-y-1 mt-1">
              {entry.items.map((item, j) => (
                <li key={j} className="text-gray-400 text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience({
  experienceData,
  educationData,
}: {
  experienceData: TimelineEntry[];
  educationData: TimelineEntry[];
  skillsData: unknown[];
}) {
  return (
    <section id="experience" className="section-pad section-bg-alt">
      <div className="container-max mx-auto">
        <div className="text-center mb-14">
          <div className="section-label">My Journey</div>
          <h2 className="section-title">Experience & Education</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Timeline
            title="Experience"
            icon="fas fa-briefcase"
            data={experienceData}
          />
          <Timeline
            title="Education"
            icon="fas fa-graduation-cap"
            data={educationData}
          />
        </div>
      </div>
    </section>
  );
}
