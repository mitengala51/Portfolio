import Hero from "../Components/Sections/Hero";
import About from "../Components/Sections/About";
import Projects from "../Components/Sections/Projects";
import Experience from "../Components/Sections/Experience";
import Skills from "../Components/Sections/Skills";
import Contact from "../Components/Sections/Contact";
import usePageMeta from "../hooks/usePageMeta";

export default function HomePage() {
  usePageMeta({
    title: "Freelance Web Developer in Mumbai | Websites & E-commerce Stores",
    description: "Fast, mobile-first websites, online stores and web apps built with React and Node.js. Get a free quote.",
  });

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}