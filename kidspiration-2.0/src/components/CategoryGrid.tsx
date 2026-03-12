import { Link } from "react-router-dom";
import type { Category } from "../types/shop";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="py-16 bg-background-light dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <h2 className="text-2xl font-bold text-center mb-10 text-slate-900 dark:text-white">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-video md:aspect-3/4"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={cat.name}
                src={cat.image}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-bold tracking-wide group-hover:scale-110 transition-transform">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
