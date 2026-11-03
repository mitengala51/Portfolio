import { Briefcase, GraduationCap } from "lucide-react";
import Header from "../Common/Header";
import Reveal from "../Common/Reveal";
import { experience } from "../../data/experience";

const icons = { work: Briefcase, education: GraduationCap };

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="container-page">
        {/* <Header eyebrow="Background" title="Experience & education" id="experience-title" /> */}
        <Header eyebrow="Background" title="Experience" id="experience-title" />

        <ol className="ml-3 border-l border-line sm:ml-4">
          {experience.map((item, i) => {
            const Icon = icons[item.type];
            return (
              <li key={`${item.org}-${item.title}`} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
                <span className="absolute -left-[17px] top-0 grid h-8 w-8 place-items-center rounded-full border border-line bg-ink text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>

                <Reveal delay={i * 0.08}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl font-bold">{item.title}</h3>
                    {item.period && <span className="text-sm text-muted">{item.period}</span>}
                  </div>
                  <p className="mt-1 font-medium text-accent">{item.org}</p>
                  {item.summary && <p className="mt-3 text-muted">{item.summary}</p>}

                  {item.highlights.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.stack.map((t) => <li key={t} className="chip">{t}</li>)}
                    </ul>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}