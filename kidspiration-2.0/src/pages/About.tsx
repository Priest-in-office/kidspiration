import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutBanner from "../assets/kidspiration-about.png";

const VISION_MISSION = [
  {
    icon: "visibility",
    label: "Our Vision",
    text: "Reach 3 Billion Children Worldwide with the Gospel.",
    accent: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: "rocket_launch",
    label: "Our Mission",
    text: "Raising young evangelists — a generation shining with the light of God!",
    accent: "bg-primary/20 text-primary-dark dark:text-primary",
  },
];

const ROLES = [
  {
    icon: "family_star",
    title: "Kidspiration Heroes",
    who: "Parents, Teachers & Guardians",
    description:
      "Organize events, mentor kids, and track impact in your community.",
  },
  {
    icon: "child_care",
    title: "Kidspiration Champions",
    who: "Children ages 0–12",
    description: "Play games, earn points, and share the Gospel with friends.",
  },
  {
    icon: "church",
    title: "Pastors & Leaders",
    who: "Ministry leaders & sponsors",
    description:
      "Manage ministry, view reports, and sponsor missions worldwide.",
  },
];

const AGE_GROUPS = [
  {
    name: "Treasures",
    ages: "0–2 years",
    icon: "crib",
    color: "bg-pink-500",
    description: "Parents read, kids watch videos, share the Gospel!",
  },
  {
    name: "Sparks",
    ages: "3–5 years",
    icon: "star",
    color: "bg-orange-500",
    description: "Learn through stories, play, and sharing!",
  },
  {
    name: "Stars",
    ages: "6–9 years",
    icon: "auto_awesome",
    color: "bg-blue-500",
    description: "Begin sharing HTTN with peers, earning points!",
  },
  {
    name: "Trailblazers",
    ages: "10–12 years",
    icon: "hiking",
    color: "bg-green-600",
    description: "Lead fundraising activities, organize outreaches!",
  },
];

const PROGRAMS = [
  {
    icon: "public",
    title: "ER100 Campaign",
    description:
      '"Each One Reach 100." Every Hero and Champion is inspired to reach at least 100 children with the Gospel.',
    link: "/er100",
  },
  {
    icon: "celebration",
    title: "Kidspiration Party Initiative",
    description:
      "Bringing joy through birthday celebrations for children who may have never celebrated one, using it as an opportunity to share God's love.",
  },
  {
    icon: "auto_stories",
    title: "HTTN Magazine for Kids",
    description:
      "Bringing the Word to life for children through interactive digital and physical pages.",
    link: "https://httnmagazine.org/magazine/order?type=kids",
  },
  {
    icon: "storefront",
    title: "Kidspiration Marketplace",
    description:
      "Featuring customized items that inspire faith, love, and joy.",
    link: "/shop",
  },
];

const CORE_VALUES = [
  { icon: "accessibility_new", label: "Growth" },
  { icon: "interests", label: "Engagement" },
  { icon: "eco", label: "Sustainability" },
  { icon: "trending_up", label: "Impact" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-clip bg-background-light dark:bg-slate-950">
      <Navbar />
      <main>
        {/* ───── Hero Banner ───── */}
        <section className="relative w-full">
          <img
            src={aboutBanner}
            alt="Diverse group of happy children holding balloon letters spelling Kidspiration"
            className="w-full h-[280px] sm:h-[360px] md:h-[440px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-10 pb-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/90 text-slate-900 font-bold text-sm uppercase tracking-wider mb-3">
                About Us
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                Welcome to Kidspiration!
              </h1>
            </div>
          </div>
        </section>

        {/* ───── Intro ───── */}
        <section className="max-w-4xl mx-auto px-4 md:px-10 py-16 text-center bg-background-light dark:bg-slate-950">
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
            A{" "}
            <strong className="text-slate-900 dark:text-white">
              global movement
            </strong>{" "}
            inspired by the healing ministry of Pastor Chris Oyakhilome. At
            Kidspiration, our vision is clear — to reach three billion children
            around the world with the Gospel of our Lord Jesus Christ. We're
            raising a generation of children, ages zero to twelve, filled with
            the Word and the Spirit — children who experience and share the
            Gospel, becoming conduits of God's grace and power.
          </p>
        </section>

        {/* ───── Vision & Mission ───── */}
        <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {VISION_MISSION.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
              >
                <div
                  className={`size-16 rounded-full flex items-center justify-center ${item.accent}`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.label}
                </h3>
                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Who Is Eligible? ───── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 bg-background-light dark:bg-slate-950">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Who Is Eligible?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Everyone who loves and cares for children — parents, pastors,
              guardians, teachers, youths, teens, and children.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROLES.map((role) => (
              <div
                key={role.title}
                className="group flex flex-col items-center text-center gap-4 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    {role.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {role.title}
                </h3>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  {role.who}
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-base">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Age Groups ───── */}
        <section className="bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-12">
              Kidspiration Champions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {AGE_GROUPS.map((group) => (
                <div
                  key={group.name}
                  className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Accent top bar */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${group.color}`}
                  />
                  <div
                    className={`size-14 rounded-xl ${group.color} text-white flex items-center justify-center mb-4`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {group.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {group.name}
                  </h3>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-3">
                    {group.ages}
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Our Programs ───── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 bg-white rounded-t-lg dark:bg-slate-950">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-12">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.title}
                onClick={() => {
                  if (!prog.link) return;
                  if (prog.link.startsWith("http"))
                    window.open(prog.link, "_blank", "noopener,noreferrer");
                  else navigate(prog.link);
                }}
                className={`flex gap-5 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:shadow-lg transition-all duration-300 ${prog.link ? "cursor-pointer" : ""}`}
              >
                <div className="size-14 min-w-[3.5rem] rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    {prog.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    {prog.title}
                    {prog.link && (
                      <span className="material-symbols-outlined text-sm text-slate-400">
                        arrow_outward
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {prog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───── Core Values ───── */}
        <section className="bg-slate-900 dark:bg-slate-950">
          <div className="max-w-5xl mx-auto px-4 md:px-10 py-16">
            <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-12">
              What We Stand For
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CORE_VALUES.map((v) => (
                <div
                  key={v.label}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-primary/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-4xl">
                    {v.icon}
                  </span>
                  <span className="text-white font-bold text-base">
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── CTA / Gratitude ───── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-blue-100/20 to-primary/5 dark:from-primary/5 dark:via-slate-900 dark:to-slate-900" />
          <div className="relative max-w-4xl mx-auto px-4 md:px-10 py-20 text-center">
            <span className="material-symbols-outlined text-primary text-5xl mb-4 block">
              favorite
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
              Thank You!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              We appreciate all our partners and supporters whose partnership
              helps reach millions of children. Together, we're empowering
              children worldwide to inspire hearts and change lives through
              faith, love, and action.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="bg-primary text-slate-900 px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/30"
            >
              Join Our Mission
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
