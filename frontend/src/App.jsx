import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "motion/react";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import ScrollProgress from "./Components/Layout/ScrollProgress";

const HomePage = lazy(() => import("./Pages/HomePage"));
const ProjectDetailPage = lazy(() => import("./Pages/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <ScrollManager />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster position="bottom-right" toastOptions={{ style: { background: "#151524", color: "#ececf4" } }} />
    </LazyMotion>
  );
}