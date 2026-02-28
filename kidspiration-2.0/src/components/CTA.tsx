import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();
  return (
    <div className="@container">
      <div className="flex flex-col justify-center items-center gap-8 px-4 py-20 lg:py-32 bg-rainbow-gradient relative overflow-hidden">
        {/* Decorative Background Elements */}
        {/* Top Left Cluster */}
        <div className="absolute top-10 left-10 text-primary opacity-30 hidden md:block animate-spin-slow">
          <span className="material-symbols-outlined !text-[80px] font-bold">
            star
          </span>
        </div>
        <div
          className="absolute top-32 left-24 text-accent-coral opacity-20 hidden md:block animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <span className="material-symbols-outlined !text-[60px] font-bold">
            favorite
          </span>
        </div>

        {/* Top Right Cluster */}
        <div
          className="absolute top-16 right-20 text-accent-sky opacity-40 hidden md:block animate-wiggle"
          style={{ animationDuration: "4s" }}
        >
          <span className="material-symbols-outlined !text-[100px] font-bold">
            cloud
          </span>
        </div>
        <div
          className="absolute top-8 right-40 text-primary opacity-20 hidden lg:block animate-pulse-glow"
          style={{ animationDuration: "3s", borderRadius: "50%" }}
        >
          <span className="material-symbols-outlined !text-[50px] font-bold">
            star
          </span>
        </div>

        {/* Bottom Left Cluster */}
        <div className="absolute bottom-20 left-20 text-accent-green opacity-30 hidden md:block animate-gentle-bounce">
          <span className="material-symbols-outlined !text-[90px] font-bold">
            eco
          </span>
        </div>
        <div
          className="absolute bottom-10 left-48 text-accent-purple opacity-20 hidden lg:block animate-spin-slow"
          style={{ animationDuration: "15s" }}
        >
          <span className="material-symbols-outlined !text-[70px] font-bold">
            kid_star
          </span>
        </div>

        {/* Bottom Right Cluster */}
        <div
          className="absolute bottom-14 right-14 text-accent-sky opacity-30 hidden md:block animate-bounce shadow-primary/20"
          style={{ animationDuration: "6s", animationDelay: "0.5s" }}
        >
          <span className="material-symbols-outlined !text-[110px] font-bold">
            rocket_launch
          </span>
        </div>
        <div
          className="absolute bottom-40 right-32 text-primary opacity-40 hidden lg:block animate-wiggle"
          style={{ animationDuration: "5s" }}
        >
          <span className="material-symbols-outlined !text-[60px] font-bold">
            wb_sunny
          </span>
        </div>
        <div className="flex flex-col gap-4 text-center max-w-2xl z-10">
          <h1 className="text-text-main tracking-tight text-3xl font-black leading-tight sm:text-5xl dark:text-white">
            Ready to Start Your <br /> Adventure?
          </h1>
          <p className="text-text-muted text-lg font-normal leading-relaxed dark:text-stone-300">
            Join thousands of other families and leaders in the Kidspiration
            community today. It's safe, fun, and free to explore!
          </p>
        </div>
        <div className="flex w-full justify-center z-10">
          <button
            onClick={() => navigate("/signup")}
            className="btn-sparkle flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-stone-900 text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="mr-2">Get Started for Free</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
