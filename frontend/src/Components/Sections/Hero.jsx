import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import Socials from "../Common/Socials";
import { profile } from "../../data/profile";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const word = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Hero() {
  const reduce = useReducedMotion();
  const nameWords = profile.name.split(" ");

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* Decorative 2D shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-7rem] top-28 opacity-40 sm:right-[-3rem] sm:opacity-100 lg:right-8 lg:top-1/2 lg:-translate-y-1/2"
      >
        <div className="relative h-72 w-72 lg:h-[28rem] lg:w-[28rem]">
          <div className="turn absolute inset-0 rounded-full border border-line" />
          <div className="turn absolute inset-[22%] rounded-full border-2 border-accent" />
          <div className="drift absolute left-[8%] top-[18%] hidden h-14 w-14 rounded-xl bg-accent sm:block" />
          <div className="drift absolute bottom-[14%] right-[18%] h-4 w-4 rounded-full bg-accent" style={{ animationDelay: "-2s" }} />
        </div>
      </div>

      <div className="container-page relative z-10 py-16">
        <m.p
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={fade}
          className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-muted"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          {profile.role}
        </m.p>

        <m.h1
          id="hero-title"
          variants={list}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="font-display text-[3.4rem] font-bold leading-[0.95] tracking-tight sm:text-8xl lg:text-[8rem]"
        >
          {nameWords.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.12em]">
              <m.span variants={word} className="inline-block">
                {w}
                {i === nameWords.length - 1 && <span className="text-accent">.</span>}
              </m.span>
            </span>
          ))}
        </m.h1>

        <m.div
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
          className="max-w-xl"
        >
          <m.p variants={fade} className="mt-8 text-lg leading-relaxed text-muted sm:text-xl">
            {profile.heroDescription}
          </m.p>

          <m.div variants={fade} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/#projects" className="btn btn-primary w-full sm:w-auto">
              View projects <ArrowRight className="arrow h-5 w-5" />
            </Link>
            <Link to="/#contact" className="btn btn-ghost w-full sm:w-auto">Contact me</Link>
          </m.div>

          <m.div variants={fade} className="mt-8">
            <Socials />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}