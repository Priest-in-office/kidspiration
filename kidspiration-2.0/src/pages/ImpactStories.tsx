import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoModal from "../components/VideoModal";

// Import images
import imgHero from "../assets/real-images/live-4.jpg";
import imgCuba from "../assets/real-images/live-9.jpg";
import imgUS from "../assets/real-images/live-4.jpg";
import imgRead from "../assets/real-images/live-5.jpg";
import imgCommunity from "../assets/real-images/live-6.jpg";
import imgCamp from "../assets/real-images/live-7.jpg";
import imgOutreach from "../assets/real-images/live-8.jpg";

const impactStories = [
  {
    id: 1,
    title: "Hope in Havana",
    location: "Cuba",
    image: imgCuba,
    date: "February 2026",
    content:
      "Bringing smiles and essential supplies to children in Havana, fostering hope and learning in the heart of the community.",
    tags: ["Outreach", "Education"],
  },
  {
    id: 2,
    title: "Inner-City Mentorship",
    location: "United States",
    image: imgUS,
    date: "January 2026",
    content:
      "Empowering youth through our after-school programs and weekend activities in urban neighborhoods.",
    tags: ["Mentorship", "Community"],
  },
  {
    id: 3,
    title: "Global Reading Initiative",
    location: "Worldwide",
    image: imgRead,
    date: "Ongoing",
    content:
      "Distributing HTTN magazines to thousands of children, sparking a love for reading and building a strong foundation of faith.",
    tags: ["Literacy", "Faith"],
  },
  {
    id: 4,
    title: "Community Builders",
    location: "South America",
    image: imgCommunity,
    date: "November 2025",
    content:
      "Partnering with local leaders to create safe, vibrant spaces for children to play, learn, and grow together.",
    tags: ["Infrastructure", "Partnership"],
  },
  {
    id: 5,
    title: "Summer Camps of Joy",
    location: "Europe",
    image: imgCamp,
    date: "August 2025",
    content:
      "Hosting interactive summer camps that combine sports, arts, and spiritual growth for children of all backgrounds.",
    tags: ["Camp", "Youth"],
  },
  {
    id: 6,
    title: "Reaching the Unreached",
    location: "Asia",
    image: imgOutreach,
    date: "July 2025",
    content:
      "Delivering educational resources, nutritional support, and the message of love to remote and underserved villages.",
    tags: ["Relief", "Missions"],
  },
];

interface TestimonyVideo {
  id: number;
  title: string;
  child: string;
  location: string;
  image: string;
  date: string;
  duration: string;
  quote: string;
  videoId?: string;
  videoUrl?: string;
}

const testimonyVideos: TestimonyVideo[] = [
  {
    id: 1,
    title: "A New Beginning",
    child: "Mia, Age 10",
    location: "Cuba",
    image: imgCuba,
    date: "February 2026",
    duration: "12:04",
    quote:
      "I learned to read better and now I share stories with my little brother every night.",
  },
  {
    id: 2,
    title: "Weekend Joy Club",
    child: "Jayden, Age 12",
    location: "United States",
    image: imgUS,
    date: "January 2026",
    duration: "08:30",
    quote:
      "The mentorship program helped me stay focused in school and believe in myself.",
  },
  {
    id: 3,
    title: "Reading Changed My World",
    child: "Amara, Age 9",
    location: "Worldwide",
    image: imgRead,
    date: "Ongoing",
    duration: "10:15",
    quote:
      "HTTN stories made me feel brave, and now I read one page every day before bed.",
  },
];

export default function ImpactStories() {
  const [activeTestimony, setActiveTestimony] = useState<TestimonyVideo | null>(
    null,
  );

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={imgHero}
              alt="Children smiling together"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background-light dark:to-slate-950"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg font-display"
            >
              Voices of Impact
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-stone-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            >
              Discover the incredible stories of transformation, hope, and joy
              from children and communities around the globe.
            </motion.p>
          </div>
        </section>

        {/* Stories Grid Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 dark:bg-stone-800 dark:text-primary mb-4">
                <span className="material-symbols-outlined text-sm">
                  public
                </span>
                <span>Global Reach</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white">
                Latest Reports
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary-dark">
                      location_on
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {story.location}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <div className="flex gap-2 mb-4">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-widest text-primary-dark dark:text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {story.content}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-500">
                      {story.date}
                    </span>
                    <button className="text-primary-dark dark:text-primary hover:underline text-sm font-bold flex items-center gap-1">
                      Read more
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Testimony Videos Section */}
        <section className="w-full max-w-7xl mx-auto px-4 pb-16 md:pb-24">
          <div className="rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/10 dark:bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-primary-dark">
                    play_circle
                  </span>
                </span>
                <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  Kids Testimonies
                </h2>
              </div>

              <span className="inline-flex items-center gap-1 text-primary dark:text-primary-dark font-bold text-sm">
                View All
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </span>
            </div>
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:snap-none md:pb-0 md:mb-0">
              {testimonyVideos.map((video, index) => {
                const hasVideo = Boolean(video.videoId || video.videoUrl);

                return (
                  <motion.article
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="group shrink-0 snap-start w-[80vw] max-w-[340px] md:w-auto md:max-w-none"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (hasVideo) setActiveTestimony(video);
                      }}
                      disabled={!hasVideo}
                      className="w-full text-left"
                    >
                      <div className="relative overflow-hidden rounded-3xl aspect-[16/10] mb-4">
                        <img
                          src={video.image}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />

                        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                          <span className="material-symbols-outlined text-[14px]">
                            play_arrow
                          </span>
                          Testimony
                        </div>

                        <div className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                          {video.duration}
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-primary dark:group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1.5 text-sm font-medium">
                        {video.child} • {video.date}
                      </p>
                      {!hasVideo && (
                        <p className="mt-2 text-xs font-semibold text-stone-300 dark:text-slate-400">
                          Video coming soon
                        </p>
                      )}
                    </button>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-5xl mx-auto px-4 py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden"
          >
            {/* Background decorative shapes */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Be a Part of the Story
              </h2>
              <p className="text-lg text-slate-800 mb-8 max-w-2xl mx-auto font-medium">
                Your partnership helps us reach more children and create lasting
                impact worldwide. Join the movement today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="" // TODO: navigate to /partner
                  className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  Partner With Us
                </a>
                <a
                  href="/about"
                  className="bg-white/50 hover:bg-white/70 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <VideoModal
        isOpen={Boolean(activeTestimony)}
        onClose={() => setActiveTestimony(null)}
        title={activeTestimony?.title}
        videoId={activeTestimony?.videoId}
        videoUrl={activeTestimony?.videoUrl}
      />

      <Footer />
    </div>
  );
}
