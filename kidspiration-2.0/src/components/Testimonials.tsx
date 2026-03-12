import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const TESTIMONIALS = [
  {
    name: "Sarah (Mom of 2)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8VzFw-gwfpsYlwDGixo8l09hIqHnD2rAsfy2Rpo0ReuYLpk5ZHyBEkEHgrXmBc_w04F48XJzSoJde5js-RtwD2803iJ4lYlzzbrZyVyhhxxJkl3qGvCNCR9T32gpnlraL2ectOrZ787_15VeURVAclQRVhBya34P5IACiLD8Z4sus5an580f_As2tpOrsMj7vX1QzHGT-iiEuoP3CaDCoVp0W83HEyJwvy22uVWl__vbfEzfE29TKfdG0dAU8Lxojw2xzki8hQVkX",
    date: "2 days ago",
    rating: 5,
    testimonial:
      "Kidspiration has been a blessing for our family. My kids love the activities and I love knowing they are in a safe environment online.",
    likes: 12,
    bubbleColor: "bg-primary/10 dark:bg-primary/15",
  },
  {
    name: "Rev. Mike",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCb6dgQsilP6o2bb3vijlcqdiKLaKysXDzsD2Q5VAFBEaP7xdflixZWiamcN8hfv1OmWpS-PUidSmvbjhz6KP_e2JkFzOYLImhsHh36vAcHcHgZ3vfPARlHp5yUwtHNdXj--qU9wSRgqqLuTBh-cU68YDVHpfiqkGA6b8uEF8ND9A195RYRm7rAum_a9X76ekCyjkqiDqu1Do8NW1g9F_WKUuzIHWvhtE1nyi2gYwwix9DeF20ZxVNzFAsxtLu5sI1oV8S3UixCPBZ",
    date: "1 week ago",
    rating: 5,
    testimonial:
      "A wonderful resource for connecting with our youth group online. The discussion guides are fantastic for leaders.",
    likes: 8,
    bubbleColor: "bg-accent-blue/10 dark:bg-accent-blue/15",
  },
  {
    name: "Timmy (Age 8)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBe9281C2NPfaBnKJ9glLbBXQ77fDmSsIYdaZomj-BU6HfPrFpenLhV8yLiP06GCnlYy7Qm82a1yp6smiWg0wkU1G1u1mBkZ3m21cFxF7aL5Llz6jQrIRyFPaoeBc65gdcl23aHxDcg1hv63gTAdefBOQaBMxw_WIOOv15Cw8PD6AtQu725D3YjLlnJ1od_jagZkf1HSlGI13QOeMyc1YAlt0-uJXM51zMTl4eVoKQpER-qs09haiNupTDmBQFFCQdPh7DRWofDF8N1",
    date: "3 days ago",
    rating: 5,
    testimonial:
      "I love the activities and the way they are designed to engage kids in learning. The resources are so helpful for parents and teachers.",
    likes: 15,
    bubbleColor: "bg-accent-red/10 dark:bg-accent-red/15",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="flex flex-col gap-8 overflow-hidden bg-white px-4 py-16 lg:py-24 dark:bg-slate-900">
      <motion.div
        ref={ref}
        className="text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-lg">format_quote</span>
          <span>Testimonials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-main dark:text-white">
          What People Are Saying
        </h2>
        <p className="text-text-muted dark:text-stone-400 text-lg mt-3 max-w-xl mx-auto">
          Hear from families and leaders around the world.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <TestimonialCard {...t} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
