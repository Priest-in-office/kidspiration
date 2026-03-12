import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import HealingStreams from "../components/HealingStreams";
import GalleryStrip from "../components/GalleryStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HealingStreams />
      <Features />
      <GalleryStrip />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
