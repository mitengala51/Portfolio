import { Quote } from "lucide-react";
import Header from "../Common/Header";
import Reveal from "../Common/Reveal";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="proof-title" className="container-page py-20 sm:py-24">
      <Header eyebrow="Client feedback" title="What clients say" id="proof-title" />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="card p-6">
              <Quote className="mb-3 h-6 w-6 text-accent" aria-hidden="true" />
              <blockquote className="text-lg">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-muted"><strong className="text-text">{t.name}</strong>, {t.role}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}