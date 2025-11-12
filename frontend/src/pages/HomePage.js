import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import MaterialSpec from "../components/MaterialSpec";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Contact />
      <MaterialSpec />
    </>
  );
};

export default HomePage;
