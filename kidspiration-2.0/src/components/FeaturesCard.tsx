import { useNavigate } from "react-router-dom";

interface FeaturesCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
  link?: string;
}

export default function FeaturesCard({
  title,
  description,
  imageUrl,
  icon,
  link,
}: FeaturesCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if(!link) return;
    if(link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      navigate(link)
    }
  };

  return (
    <div
      onClick={handleClick}
      className={link ? "cursor-pointer" : ""}
      role={link ? "link" : undefined}
    >
      <div className="group flex flex-col gap-4 p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-300">
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
          <div
            className="w-full h-full bg-contain bg-center transform group-hover:scale-105 transition-transform duration-500"
            data-alt={title}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">
              {icon}
            </span>
            <h3 className="text-text-main dark:text-white text-xl font-bold leading-normal">
              {title}
            </h3>
          </div>
          <p className="text-text-muted dark:text-stone-400 text-base font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
