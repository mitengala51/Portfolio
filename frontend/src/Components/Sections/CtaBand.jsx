import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../Common/Reveal";

export default function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-accent text-ink">
      <Reveal className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 id="cta-title" className="font-display text-3xl font-bold leading-tight sm:text-4xl">Ready to get more customers online?</h2>
          <p className="mt-2 text-ink/80">Tell me about your project. You'll get a clear quote and next steps.</p>
        </div>
        <Link to="/#contact" className="btn btn-dark w-full md:w-auto">Start your project <ArrowRight className="arrow h-5 w-5" /></Link>
      </Reveal>
    </section>
  );
}