import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import familyImg from "../../assets/real-images/live-6.jpg"; // Using mentor image as placeholder

export default function FamilyDashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-20 lg:py-32 bg-white dark:bg-[#0f172a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 text-blue-500 font-bold text-sm uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
              Family & Group Management
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Your Central Hub for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                Spiritual Growth
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Easily manage your family roster or Sunday school class from one intuitive dashboard. Generate secure kid-safe login codes, track active sessions, and oversee your entire group effortlessly.
            </p>
            
            <ul className="space-y-4 mt-4">
              {[
                { icon: "group_add", text: "Add & manage multiple sibling accounts" },
                { icon: "vpn_key", text: "Generate secure, ad-free login codes" },
                { icon: "supervised_user_circle", text: "Classroom mode for Mentors & Pastors" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                  </div>
                  <span className="font-medium text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual/Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative BG Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[80px] -z-10" />
            
            {/* Mock Dashboard Card */}
            <div className="bg-slate-50 dark:bg-[#1a2235] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
                    <img src={familyImg} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">The Smith Family</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">3 Active Explorers</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">more_horiz</span>
                </button>
              </div>

              {/* Kids List Mockup */}
              <div className="space-y-4">
                {[
                  { name: "Leo", age: 8, activity: "Completed Daily Challenge", color: "bg-orange-500", icon: "emoji_events" },
                  { name: "Mia", age: 6, activity: "Reading March HTTN", color: "bg-rose-500", icon: "auto_stories" },
                  { name: "Sam", age: 10, activity: "Earned Faith Badge", color: "bg-blue-500", icon: "local_police" }
                ].map((kid, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${kid.color} rounded-xl text-white flex items-center justify-center font-bold font-display shadow-inner transform -rotate-2`}>
                        {kid.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{kid.name} • {kid.age}y</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[14px] text-slate-400">{kid.icon}</span>
                          {kid.activity}
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
                  </div>
                ))}
              </div>

              {/* Add New Button Mockup */}
              <button className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 tracking-wide">
                <span className="material-symbols-outlined">person_add</span>
                Add New Child Profile
              </button>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
