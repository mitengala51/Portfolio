import Header from "../Common/Header";
import Reveal from "../Common/Reveal";
import { skills } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="container-page py-20 sm:py-24">
      <Header eyebrow="What I work with" title="Skills & tools" id="skills-title" />

      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map(({ group, items }, i) => (
          <Reveal key={group} delay={i * 0.08} className="card p-6">
            <h3 className="font-display text-lg font-semibold">{group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="chip transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}