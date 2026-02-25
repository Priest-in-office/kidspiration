import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnerHero from "../components/PartnerHero";
import ActionPath from "../components/ActionPath";
import InvolvementCards from "../components/InvolvementCards";

export default function Partner() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-40">
        <div className="flex flex-col max-w-[960px] flex-1">
          <PartnerHero />
          <ActionPath />
          <InvolvementCards />
        </div>
      </main>
      <Footer />
    </div>
  );
}
