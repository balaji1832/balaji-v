import About from "@/components/about";
import ContactCTA from "@/components/contactcta";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/herosection";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030b13]">
      <Header />

      <HeroSection />

     
      <About />
      
      <Skills />

      <Experience />

      <Projects />

      {/* Add Contact section later */}
      <ContactCTA />

      <Footer />
    </main>

    
  );
}