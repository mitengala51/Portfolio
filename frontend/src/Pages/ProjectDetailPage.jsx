import { Link, useParams } from "react-router-dom";
import { getProject } from "../data/projects";
import usePageMeta from "../hooks/usePageMeta";
import NotFoundPage from "./NotFoundPage";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  usePageMeta({
    title: project ? `${project.title} | Miten Gala` : "Project not found",
    description: project?.summary ?? "",
    path: `/projects/${slug}`,
  });

  if (!project) return <NotFoundPage />;

  return (
    <article className="container-page pb-24 pt-28">
      <Link to="/#projects" className="text-sm text-muted hover:text-white">← All projects</Link>
      <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{project.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      <div className="mt-6 flex gap-3">
        {project.links.live && <a className="btn btn-primary" href={project.links.live} target="_blank" rel="noreferrer">Live site</a>}
        {project.links.repo && <a className="btn btn-ghost" href={project.links.repo} target="_blank" rel="noreferrer">Source code</a>}
      </div>
      <ul className="mt-10 list-disc space-y-2 pl-5 text-muted">{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
      <div className="mt-10 grid gap-4">
        {project.images.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="w-full rounded-xl border border-line" />
        ))}
      </div>
    </article>
  );
}