import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FloatingShapes from "../components/FloatingShapes";

const SIGNUP_OPTIONS = [
  {
    route: "/signup/adult?role=parent_or_mentor",
    icon: "family_star",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    title: "I'm a Parent or Mentor",
    description:
      "Parents, and mentors — sign up to guide children on their spiritual journey.",
    features: [
      "Track your child's progress",
      "Access mentorship tools",
      "Join the community",
    ],
  },
  {
    route: "/signup/adult?role=pastor_or_leader",
    icon: "family_star",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    title: "I'm a Pastor or Leader",
    description:
      "Pastors, and leaders — sign up to guide children on their spiritual journey.",
    features: [
      "Manage your group",
      "Access mentorship tools",
      "Join the community",
    ],
  },
  {
    route: "/signup/kid",
    icon: "rocket_launch",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "I'm a Kid",
    description:
      "Ready for an adventure? Create your hero profile, earn badges, and learn amazing things!",
    features: ["Pick your avatar", "Play fun games", "Earn cool badges"],
  },
];

export default function SignupChooser() {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-clip min-h-screen flex flex-col relative bg-hero-pattern">
      {/* Floating background SVG shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingShapes />
      </div>
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
            Get Started
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Who's signing up{" "}
            <span className="text-primary relative inline-block">
              today?
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Choose how you'd like to join Kidspiration.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {SIGNUP_OPTIONS.map((option, index) => (
            <motion.button
              key={option.route}
              onClick={() => navigate(option.route)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.15,
                ease: "easeOut",
              }}
              className="group text-left bg-card-bg dark:bg-[#1a170d] rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border-2 border-[#e8e2ce] dark:border-[#3a3525] hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${option.iconBg} ${option.iconColor} flex items-center justify-center mb-5`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {option.icon}
                  </span>
                </div>

                {/* Title & Description */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {option.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  {option.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="material-symbols-outlined text-primary text-base">
                        check_circle
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                  Get Started
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Login link */}
        <p className="mt-10 text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors"
          >
            Log In
          </button>
        </p>
      </main>
    </div>
  );
}
