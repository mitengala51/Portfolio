import { useEffect } from "react";
const site = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

function upsert(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, value);
}

export default function usePageMeta({ title, description, path = "/" }) {
  useEffect(() => {
    document.title = title;
    const meta = (key, val, a = "name") =>
      upsert(`meta[${a}="${key}"]`, () => Object.assign(document.createElement("meta"), { }), "content", val) ||
      document.head.querySelector(`meta[${a}="${key}"]`)?.setAttribute(a, key);
    meta("description", description);
    meta("og:title", title, "property");
    meta("og:description", description, "property");
    upsert('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", `${site}${path}`);
  }, [title, description, path]);
}