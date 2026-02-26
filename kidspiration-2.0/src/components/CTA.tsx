import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();
  return (
    <div className="@container">
      <div className="flex flex-col justify-center items-center gap-8 px-4 py-20 lg:py-32 bg-background-light dark:bg-slate-800/50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-10 text-primary opacity-30 hidden md:block animate-spin-slow">
          <span className="material-symbols-outlined !text-[120px] font-bold">
            star
          </span>
        </div>
        <div className="absolute bottom-10 right-10 text-blue-400 opacity-30 hidden md:block animate-bounce">
          <span className="material-symbols-outlined !text-[120px] font-bold">
            cloud
          </span>
        </div>
        <div className="flex flex-col gap-4 text-center max-w-2xl z-10">
          <h1 className="text-text-main tracking-tight text-3xl font-black leading-tight sm:text-5xl dark:text-white">
            Ready to Start Your <br /> Adventure?
          </h1>
          <p className="text-text-muted text-lg font-normal leading-relaxed dark:text-stone-300">
            Join thousands of other families and leaders in the Kidspiration community
            today. It's safe, fun, and free to explore!
          </p>
        </div>
        <div className="flex w-full justify-center z-10">
          <button 
          onClick={() => navigate("/signup")}
          className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-stone-900 text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
            <span className="mr-2">Get Started for Free</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
