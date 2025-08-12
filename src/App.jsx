import React, { Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Cocktails = lazy(() => import("./components/Cocktails"));
const About = lazy(() => import("./components/About"));
const Art = lazy(() => import("./components/Art"));
const Menu = lazy(() => import("./components/Menu"));
const Contact = lazy(() => import("./components/Contact"));
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Cocktails />
        <About />
        <Art/>
        <Menu/>
        <Contact/>
      </Suspense>
    </main>
  );
};

export default App;
