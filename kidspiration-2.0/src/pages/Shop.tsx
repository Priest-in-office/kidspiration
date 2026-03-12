import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopHero from "../components/ShopHero";
import ProductCard from "../components/ProductCard";
import CategoryGrid from "../components/CategoryGrid";
import type { Product, Category } from "../types/shop";

// ─── Placeholder data — replace with API calls ───────────────────────────────

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Super Star Tee",
    slug: "super-star-tee",
    price: 1800,
    currency: "USD",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXTUawme-LNSOUc-6Sv3Gzv4x6FSg2iYzekGGRF-jLwupA-yW001s46QnIpk2pcj_BCs5tqi29h66jwjxernkNGfuK9UaFU_V5jaEinTy_w_xhheEeFcOI4jDmgl_mOACx0NCmmAYfWbO18OHDuEbKt6g4HiB781NahtM8mFK2Keuaff6GstjvnXGEsOTN_zswYZfWNgz_MFCNNZ0kOQy12zW8nqxN9T-65Vb6JZ2FsV66lBYvsU23HI9ix27EU2tEzkPngVA48z5S",
    ],
    category: "tees",
    rating: 4.5,
    reviewCount: 42,
    badge: "best-seller",
    inStock: true,
  },
  {
    id: "prod_2",
    name: "Sunny Days Cap",
    slug: "sunny-days-cap",
    price: 1200,
    currency: "USD",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHKhF5POlx39FfXOnhHbn7iqImNEwjrNlIJBgzZoPKwtpWTvPDwK8FDcb_qhgrq1GaHxYQ9lxzt0EEsz_guAkaRzO9OVr7rLcEHz_ePoiUGkfR5r6ZNcMyZKsd2YugBa4G65i62W-qSeJaodecG2QG3wSvnlOtL2F18pY8KQgPOXl2UUHHt1KbH_KqQd23yA8V3Q6Zc5p95h3lEOsWuJMcLec4UugyzIFSgcBGBbPhorxtw06cca7BrBPNAGiVBN2sAXTDPhONj2zI",
    ],
    category: "hats",
    rating: 4,
    reviewCount: 15,
    inStock: true,
  },
  {
    id: "prod_3",
    name: "Cozy Doodle Hoodie",
    slug: "cozy-doodle-hoodie",
    price: 2800,
    compareAtPrice: 3500,
    currency: "USD",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBuVnh2g51nf-KLN2eGqmvmbKtckhpuNu_AS2BFZ6DfnUEq1Jb9Mi2MRVpM3CJ1BZTW29Upr6lxhX_c4XwXldy39EABwaFdWHUwMn5ZmVJP8lSeunT_BjNEO5Rj_9Cw0N4SaWAqNP1A3QSbl7MrKKSgfBMirOWQu8zG9PtLGvnbFWBa-tQryDdr7lj3eDKYBASCluffFbDvP_4cBO92KoxnToJJ4r-ZlstYQlpKj2Kf0k9dEaNn4jpyFOqZHP2oufxDDA2RFamolmEL",
    ],
    category: "hoodies",
    rating: 5,
    reviewCount: 89,
    badge: "sale",
    inStock: true,
  },
  {
    id: "prod_4",
    name: "Explorer Backpack",
    slug: "explorer-backpack",
    price: 4500,
    currency: "USD",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQd3l0lk9hku2FdfM5ZpjGiMwkR1T_WMOCuzFnf4hkzMBN8UWYWh-qt1z_QySjbQPcFsVExd2zzfvuO4lfcPYitBkHaMheBMH9huX4cJU8w5-sFUe3yu_QX3fMB4xdod164DPKeIXUwCFs2TNme1iP9BHA5abdPcx7XRO_GBy1Fd0JjxBU7ygp51J24bKdS_onpf8ECAJWIKzHkZADOJ-7ov0ooIBBx5cE1u1Ql-1e86WxmSABs19yy_pbqwXFNoP70XOIg65e6FcI",
    ],
    category: "accessories",
    rating: 5,
    reviewCount: 24,
    inStock: true,
  },
];

const PLACEHOLDER_CATEGORIES: Category[] = [
  {
    id: "cat_1",
    name: "Tees",
    slug: "tees",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAA_uy_7gL01WYNUQXnz5iZAfHVSbEyBkSb7-et5D049_-OlFkAIDac9YNt2NR4XK5rC5jl9oHIIG_C7GGyvSvLRK3bidlUBnl69_b3b9JbiLCke3gMVnRBrPi3gZW7LUtufvWozX_UBj8FodiGAgSdYqRhtazJI2e55wVI0tIo87GY9LgpK1Rmt5eAHxWFgZZMI7al_dkSqGP9jbMPVhmWhFLbUoXpI0DJjDM483S06V5573iZyS5vZDodXdSMAp5IYuyKAm17D1VO",
  },
  {
    id: "cat_2",
    name: "Hoodies",
    slug: "hoodies",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFYM-CA5hPdbXVbbcqlofu7-99A-aUEPjHSVEV19-_PHDl3sLlfOIgIl4Anwzhnto6umGZBxiv_nnpbULDZry0Q78NSOCt0YPZxfdQXcILuELs1xm3vfXRuDFHgO8YaTVWHd8ttNI1fuQwE_0oGPetN71nw4kwqKaY6_Q3DrYOjVEOBn3kJoBQ6a0W4LdHcaM_rtzw5oaplhv3xac1GQRouAue3Jj5q76QKevzt1YxZYfSzmpNK-APqC7-7pezmkuBBsPpeCgZwP8-",
  },
  {
    id: "cat_3",
    name: "Hats",
    slug: "hats",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxPC7EQk9GhskWJAqomZLsDpC1EIa4jaNh75AmetpjpoFdOZ2XpRU-SnGWGK1MVfUXn-6knHlgkMfqudM1C8HqddPypvBrUEZMb4XlMe_WeOJL8XDS5VHOBZu9J94yfMeUPiHxoy0_6WiiNKCXLdEQ050QD38vmCk-vQFM87h17AUWhhTggIT-dAmtTO9sB_Bgg2rzYY8FMw-l-Lo3RMY40NjvNojUPZuk7Y9ct6Sp_ni-U8gHrSiFMo9_02562jX70fJn2rdHtfeY",
  },
  {
    id: "cat_4",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeg0q2WaM3XEK8ZuitLxUCpJj8NIxFfKbzYB5jEGMjw9nJBP4Giz6nSbuDRVzjLA54kGgTRrFrbDpWtzBuKU7VrI9FhHX7z8XQozYvyvv_VlnfnoV58QPdLI_YUV-30-BrUAJfgcXDUjyO0DfcLG28SlH2eC4D4yQO_4pTIUQdR8VmQreg-u9041ALs9ZWtptNDOs2Qle4JUNpI93gvyXXYyn1maONA-mpQnoy2oLWNDM7GO_JZrrWIbELWoVE91rTeLDJ6SSukmXZ",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Shop() {
  // TODO: Replace with real API calls:
  //   const { data: products } = useFetch<Product[]>("/api/products?trending=true");
  //   const { data: categories } = useFetch<Category[]>("/api/categories");
  const [products] = useState<Product[]>(PLACEHOLDER_PRODUCTS);
  const [categories] = useState<Category[]>(PLACEHOLDER_CATEGORIES);

  const handleAddToCart = (product: Product) => {
    // TODO: Integrate with your cart context / backend
    // Example: addToCart({ productId: product.id, quantity: 1 });
    console.log("Add to cart:", product.id, product.name);
  };

  const handleToggleFavorite = (product: Product) => {
    // TODO: Integrate with your wishlist / backend
    console.log("Toggle favorite:", product.id, product.name);
  };

  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        <ShopHero />

        {/* Trending Products */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Trending Now
            </h2>
            <div className="flex gap-2">
              <button className="size-12 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:border-primary hover:text-slate-900 transition-all">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="size-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-all shadow-lg">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <CategoryGrid categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
