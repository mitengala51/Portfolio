export default function Header({ eyebrow, title, id, center = false }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
      <h2 id={id} className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
    </div>
  );
}