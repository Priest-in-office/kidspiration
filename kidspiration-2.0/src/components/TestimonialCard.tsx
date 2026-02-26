interface TestimonialCardProps {
  name: string;
  image: string;
  date: string;
  rating: number;
  testimonial: string;
  likes: number;
}

export default function TestimonialCard({ name, image, date, rating, testimonial, likes }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-stone-100 dark:bg-stone-800/50 dark:border-stone-800">
      <div className="flex items-center gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-primary/20"
          data-alt="Portrait of Sarah smiling"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="flex-1">
          <p className="text-text-main text-base font-bold leading-normal dark:text-white">
            {name}
          </p>
          <p className="text-text-muted text-xs font-normal leading-normal dark:text-stone-500">
            {date}
          </p>
        </div>
      </div>
      <div className="flex gap-0.5 text-primary">
        {Array.from({ length: rating }, (_, i) => (
          <span
            key={i}
            className="material-symbols-outlined text-sm fill-current"
          >
            star
          </span>
        ))}
      </div>
      <p className="text-stone-700 text-base font-normal leading-relaxed dark:text-stone-300 flex-grow">
        {testimonial}
      </p>
      <div className="flex gap-6 text-text-muted pt-4 border-t border-stone-100 dark:border-stone-800 dark:text-stone-500">
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">thumb_up</span>
          <span className="text-sm font-medium">{likes}</span>
        </button>
      </div>
    </div>
  );
}