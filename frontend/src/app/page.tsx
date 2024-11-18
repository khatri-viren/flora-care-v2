import React from "react";
import HeroSection from "./_components/hero-section";
import ProblemSection from "./_components/problem-section";
import SolutionsSection from "./_components/solutions-section";
import CTA from "./_components/CTA";
import ContactSection from "./_components/contact";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionsSection />
      <CTA />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
