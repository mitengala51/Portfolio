import Header from "../Common/Header";
import Reveal from "../Common/Reveal";
import { process as steps } from "../../data/process";

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="container-page">
        <Header eyebrow="How it works" title="A simple, clear process" id="process-title" />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="border-t-2 border-accent pt-4">
                <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}