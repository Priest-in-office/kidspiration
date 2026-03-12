interface TestimonialCardProps {
  name: string;
  image: string;
  date: string;
  rating: number;
  testimonial: string;
  likes: number;
  bubbleColor?: string;
}

export default function TestimonialCard({
  name,
  image,
  date,
  rating,
  testimonial,
  likes,
  bubbleColor = "bg-primary/10 dark:bg-primary/15",
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Speech bubble */}
      <div
        className={`relative w-full rounded-2xl p-6 ${bubbleColor} border border-stone-100 dark:border-slate-700 shadow-sm`}
      >
        {/* Star rating */}
        <div className="flex gap-0.5 text-primary mb-3">
          {Array.from({ length: rating }, (_, i) => (
            <span
              key={i}
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-stone-700 text-base font-normal leading-relaxed dark:text-stone-300">
          "{testimonial}"
        </p>

        {/* Like button */}
        <div className="flex gap-6 text-text-muted pt-4 mt-4 border-t border-stone-200/50 dark:border-slate-600/50 dark:text-stone-500">
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">favorite</span>
            <span className="text-sm font-medium">{likes}</span>
          </button>
        </div>

        {/* Speech bubble tail */}
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 ${bubbleColor} border-r border-b border-stone-100 dark:border-slate-700`}
        />
      </div>

      {/* Avatar + name (below the bubble, chat-style) */}
      <div className="flex items-center gap-3 mt-1">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-primary/30 shadow-sm"
          style={{ backgroundImage: `url(${image})` }}
          aria-label={`Portrait of ${name}`}
        />
        <div>
          <p className="text-text-main dark:text-white text-sm font-bold">
            {name}
          </p>
          <p className="text-text-muted dark:text-stone-500 text-xs">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
}