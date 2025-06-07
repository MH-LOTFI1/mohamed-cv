import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsSection from "@/components/SkillsSection";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <SkillsSection />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
