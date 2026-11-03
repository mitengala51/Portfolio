import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "../Common/Header";
import Reveal from "../Common/Reveal";
import { projects } from "../../data/projects";

function ProjectCard({ project }) {
  const cover = project.images[0];

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
        {cover ? (
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="grid h-full place-items-center font-display text-6xl font-bold text-line">
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold">
          {/* Stretched link: makes the whole card clickable */}
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-muted">{project.summary}</p>

        {/* {project.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech} className="chip">{tech}</li>
            ))}
          </ul>
        )} */}

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            View project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>

          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${project.title} live site`}
              className="relative z-10 grid h-11 w-11 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="container-page py-20 sm:py-24">
      <Header eyebrow="Work" title="Selected projects" id="projects-title" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}