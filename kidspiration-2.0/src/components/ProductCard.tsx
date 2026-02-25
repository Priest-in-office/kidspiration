import { type Product, formatPrice } from "../types/shop";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1 mb-3">
      {Array.from({ length: full }).map((_, i) => (
        <span
          key={`f${i}`}
          className="material-symbols-outlined text-primary text-sm"
        >
          star
        </span>
      ))}
      {half && (
        <span className="material-symbols-outlined text-primary text-sm">
          star_half
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span
          key={`e${i}`}
          className="material-symbols-outlined text-slate-300 text-sm"
        >
          star
        </span>
      ))}
      <span className="text-xs text-slate-500 ml-1">({count})</span>
    </div>
  );
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  const badgeConfig: Record<string, { text: string; bg: string }> = {
    "best-seller": { text: "Best Seller", bg: "bg-blue-500" },
    new: { text: "New", bg: "bg-green-500" },
    sale: {
      text: `-${product.discountPercent || Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%`,
      bg: "bg-red-500",
    },
  };

  const badge = product.badge ? badgeConfig[product.badge] : null;

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 mb-4">
        {badge && (
          <span
            className={`absolute top-3 left-3 ${badge.bg} text-white text-xs font-bold px-2 py-1 rounded-lg z-10`}
          >
            {badge.text}
          </span>
        )}
        <button
          onClick={() => onToggleFavorite?.(product)}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full text-slate-400 hover:text-red-500 transition-colors z-10 backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={product.name}
          src={product.images[0]}
        />
      </div>

      {/* Details */}
      <div className="px-2 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="mt-auto flex items-center justify-between">
          {hasDiscount ? (
            <div className="flex flex-col leading-none">
              <span className="text-xs text-slate-400 line-through decoration-red-500">
                {formatPrice(product.compareAtPrice!, product.currency)}
              </span>
              <span className="text-xl font-black text-red-500">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {formatPrice(product.price, product.currency)}
            </span>
          )}

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`p-2 rounded-xl transition-colors shadow-md ${
              product.inStock
                ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-primary hover:text-slate-900"
                : "bg-slate-200 dark:bg-slate-600 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span className="material-symbols-outlined">
              {product.inStock ? "add_shopping_cart" : "remove_shopping_cart"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
