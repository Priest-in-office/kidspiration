import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Stats from "../components/Stats"
import Testimonials from "../components/Testimonials"
import CTA from "../components/CTA"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}