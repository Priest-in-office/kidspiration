import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdultsHero from "../components/adults-page/AdultsHero";
import FamilyDashboardPreview from "../components/adults-page/FamilyDashboardPreview";
import ProgressTrackerPreview from "../components/adults-page/ProgressTrackerPreview";
import ResourceLibraryPreview from "../components/adults-page/ResourceLibraryPreview";
import SafeEnvironmentGuarantee from "../components/adults-page/SafeEnvironmentGuarantee";
import AdultsCTA from "../components/adults-page/AdultsCTA";

export default function AdultsLanding() {
  return (
    <div className="overflow-x-clip min-h-screen flex flex-col bg-background-light dark:bg-slate-950">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col items-center">
        <AdultsHero />
        <FamilyDashboardPreview />
        <ProgressTrackerPreview />
        <ResourceLibraryPreview />
        <SafeEnvironmentGuarantee />
        {/* Skipping Testimonial/Community for now as it relies heavily on routing to /stories */}
        <AdultsCTA />
      </main>

      <Footer />
    </div>
  );
}
