import { MapPin, Mail, BadgeCheck } from "lucide-react";
import Header from "../Common/Header";
import Reveal from "../Common/Reveal";
import { profile } from "../../data/profile";

export default function About() {
  const facts = [
    { icon: MapPin, text: profile.location },
    { icon: BadgeCheck, text: profile.availability },
    { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-20 sm:py-24">
      <Header eyebrow="Who I am" title="About me" id="about-title" />

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          {profile.about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="card h-fit p-6 lg:col-span-2 lg:hover:!translate-y-0">
          <h3 className="mb-4 font-display text-lg font-semibold">Quick facts</h3>
          <ul className="space-y-4">
            {facts.map(({ icon: Icon, text, href }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {href ? <a href={href} className="break-all hover:text-accent">{text}</a> : <span>{text}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}