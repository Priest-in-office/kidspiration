import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FeaturesCard from "./FeaturesCard";
import kidspiration2 from "../assets/kidspiration-2.png";
import kidspiration3 from "../assets/kidspiration-3.png";
import kidspiration4 from "../assets/kidspiration-4.png";
import kidspiration6 from "../assets/kidspiration-6.png";
import kidspiration7 from "../assets/kidspiration-7.png";

const CARDS_PER_ROW = 3;
const STAGGER = 0.15;
const ROW_GAP = 0.3;

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => {
    const row = Math.floor(i / CARDS_PER_ROW);
    const delay = i * STAGGER + row * ROW_GAP;
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    };
  },
};

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentMonth = () => {
    const date = new Date();
    const month = date.getMonth();
    return months[month];
  };

  const cards = [
    {
      title: "The Last Child Challenge",
      description:
        "Enlist to join the Last Child challenge. We are on the race to reach the last child with the Healing to the Nations Magazine for Kids.",
      imageUrl: kidspiration2,
      icon: "emoji_events",
      iconAnimation: "spin" as const,
      link: "/signup",
    },
    {
      title: "Read Healing To The Nations Magazine",
      description:
        "Interactive Digital Magazine for Kids. Stories, games, and miracles made just for you!",
      imageUrl: kidspiration3,
      icon: "auto_stories",
      iconAnimation: "flip" as const,
      link: "/read-httn4kids",
    },
    {
      title: "Order HTTN Magazine for Kids",
      description: `Get the ${getCurrentMonth()} Edition of the HTTN FOR KIDS. Order the new Healing to the Nations Magazine for Kids.`,
      imageUrl: kidspiration4,
      icon: "shopping_bag",
      iconAnimation: "bounce" as const,
      link: "https://httnmagazine.org/magazine/order?type=kids",
    },
    // {
    //   title: "Kidspiration Marketplace",
    //   description:
    //     "Shop with Purpose. Get official merchandise and support children worldwide!",
    //   imageUrl: kidspiration5,
    //   icon: "storefront",
    //   iconAnimation: "swing" as const,
    //   link: "/shop",
    // },
    {
      title: "Kidspiration Party Initiative",
      description:
        "Celebrate Every Child. Bring joy to children who may have never had a birthday party.",
      imageUrl: kidspiration6,
      icon: "celebration",
      iconAnimation: "shake" as const,
    },
    {
      title: "ER100 Initiative",
      description:
        "This is a campaign to reach 3 Billion Children with the message of faith,healing and hope through the C.O.M.P.L.E.T.E Mandate while distributing the instrument of faith - the Healing to the Nations Magazine for kids.",
      imageUrl: kidspiration7,
      icon: "public",
      iconAnimation: "spin" as const,
      link: "/er100",
    },
  ];

  return (
    <div className="flex flex-col gap-10 px-4 py-16 lg:px-20 lg:py-24 bg-background-light dark:bg-slate-800 @container">
      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-text-main dark:text-white text-3xl font-black leading-tight sm:text-4xl lg:text-5xl max-w-2xl">
          Get Involved Today
        </h2>
        <p className="text-text-muted dark:text-stone-400 text-lg font-normal leading-normal max-w-2xl">
          Join our mission to reach every child with the message of hope.
          Explore our interactive resources, participate in global challenges,
          and discover how you can make a difference today.
        </p>
      </div>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full"
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <FeaturesCard {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
