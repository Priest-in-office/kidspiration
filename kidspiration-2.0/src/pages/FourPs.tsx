import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bannerImg from "../assets/HSLHS_MARCH_2026.jpg";

interface FourPCardProps {
  title: string;
  icon: string;
  colorClass: string;
  children: React.ReactNode;
  learnMoreLink: string;
}

function FourPCard({
  title,
  icon,
  colorClass,
  children,
  learnMoreLink,
}: FourPCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div
        className={`size-16 rounded-2xl flex items-center justify-center mb-6 text-white text-3xl shadow-lg ${colorClass}`}
      >
        <span className="material-symbols-outlined text-[32px]!">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold font-display text-text-main dark:text-white mb-4">
        {title}
      </h3>
      <div className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-1">
        {children}
      </div>
      <Link
        to={learnMoreLink}
        className="inline-flex items-center gap-2 font-bold transition-colors mt-auto w-fit"
        style={{ color: "var(--color-primary-dark)" }}
      >
        Learn More
        <span className="material-symbols-outlined text-[20px]! transition-transform group-hover:translate-x-1">
          arrow_forward
        </span>
      </Link>
    </div>
  );
}

export default function FourPs() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img
              src={bannerImg}
              alt="Healing Streams Live Healing Services"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-10 py-24 md:py-32 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md ring-1 ring-primary/30">
              <span className="material-symbols-outlined text-[18px]!">
                verified
              </span>
              Preparation Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black font-display text-white leading-tight mb-6 max-w-4xl drop-shadow-lg">
              The 4Ps of Preparation
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-md">
              Get ready for the Healing Streams Live Healing Services by
              engaging in Publicity, Prayer, Preparing Places, and Partnership.
            </p>
          </div>
        </section>

        {/* 4Ps Grid Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 1. Prayer */}
            <FourPCard
              title="1. Prayer"
              icon="volunteer_activism"
              colorClass="bg-linear-to-br from-accent-sky to-blue-600"
              learnMoreLink="" // TODO: navigate to /4ps/prayer
            >
              <p>
                Prayer is the foundation of our preparation. By praying, we make
                tremendous power available, dynamic in its working. We pray for
                the sick around the world, that their hearts be open to receive
                their healing.
              </p>
              <p className="mt-4">
                Join the ongoing prayer clouds and mobilize your friends,
                family, and networks to pray specifically for the upcoming
                healing services.
              </p>
            </FourPCard>

            {/* 2. Publicity */}
            <FourPCard
              title="2. Publicity"
              icon="campaign"
              colorClass="bg-linear-to-br from-primary to-orange-500"
              learnMoreLink="" // TODO: navigate to /4ps/publicity
            >
              <p>
                We have a mandate to take healing to the nations. Publicity
                involves spreading the word about the Healing Streams
                everywhere—online and offline.
              </p>
              <p className="mt-4">
                Share the registration link on all your social media platforms,
                distribute magazines and flyers in your neighborhood, and
                personally invite people to register and participate.
              </p>
            </FourPCard>

            {/* 3. Preparing Places */}
            <FourPCard
              title="3. Preparing Places"
              icon="home_work"
              colorClass="bg-linear-to-br from-accent-green to-emerald-600"
              learnMoreLink="" // TODO: navigate to /4ps/preparing-places
            >
              <p>
                A healing center is an extension of the Healing School
                configured to heal the sick in your world. By preparing places,
                you set up physical or virtual healing centers where others can
                join you to participate in the live services.
              </p>
              <p className="mt-4">
                You can host a center in your home, office, hospital, or
                community hall. Ensure the environment is conducive for the
                miraculous.
              </p>
            </FourPCard>

            {/* 4. Partnership */}
            <FourPCard
              title="4. Partnership"
              icon="handshake"
              colorClass="bg-linear-to-br from-accent-purple to-purple-600"
              learnMoreLink="" // TODO: navigate to /4ps/partnership
            >
              <p>
                Partnership is your commitment to ensuring the program reaches
                the ends of the earth. Your financial seeds help secure airtime
                on TV and radio stations globally, translate the program into
                multiple languages, and provide internet access for remote
                healing centers.
              </p>
              <p className="mt-4">
                Sponsor healing, sponsor a nation, and be a vital part of the
                greatest crusade the world has ever seen.
              </p>
            </FourPCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
